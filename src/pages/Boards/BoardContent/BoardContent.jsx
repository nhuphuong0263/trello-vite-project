import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'

import ListColumns from './ListColumns/ListColumns'
import Card from './ListColumns/Column/ListCards/Card/Card'
import Column from './ListColumns/Column/Column'

import { mapOrder } from '~/utils/sort'

import { DndContext, PointerSensor, useSensor, useSensors, MouseSensor, TouchSensor, DragOverlay, defaultDropAnimationSideEffects, closestCorners } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

import { cloneDeep } from 'lodash'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {
  // yeu cau chuot di chuyen 10px moi kich hoat event, fix case click bi goi event
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 0, tolerance: 500 } })

  const mySensors = useSensors(mouseSensor, touchSensor)
  const [orderedColumns, setOrderedColumns] = useState([])
  // cung 1 thoi diem chi co 1 phan tu dang duoc keo(column or card)
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)
  
  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const findColumnByCardId = (cardId) => {
    return orderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }

  const moveCardBetweenDifferentColumns = (overColumn, overCardId, active, over, activeColumn, activeDraggingCardId, activeDraggingCardData) => {
    setOrderedColumns(prevColumn => {
      // tim vi tri cua overCard trong column dich: noi ma active card sap duoc tha
      const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)
      // console.log({ 'overCardIndex': overCardIndex })

      let newCardIndex
      const isBelowOverItem = active.rect.current.translated && 
        active.rect.current.translated.top > over.rect.top + over.rect.height 
      const modifier = isBelowOverItem ? 1 : 0
      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

      // console.log({ 'isBelowOverItem': isBelowOverItem })
      // console.log({ 'modifier': modifier })
      // console.log({ 'newCardIndex': newCardIndex })

      const nextColumns = cloneDeep(prevColumn)
      const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

      if (nextActiveColumn) {
        // xoa card o column active(column cu, luc keo card ra khoi no de sang column khac)
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
        // updated lai data cho mang cardOrderIds 
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      }

      if (nextOverColumn) {
        // check card dang keo co ton tai o overColumn k, neu co thi can xoa no truoc
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id
        }
        // them card dang keo vao over column theo vi tri index moi
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)
        // cap nhat lai cardOrderIds
        nextOverColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      }

      return nextColumns
    })
  }

  // trigger khi user bat dau keo 1 phan tu
  const handleDragStart = (event) => {
    // console.log({'handleDragStart': event})
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
    setOldColumnWhenDraggingCard(event?.active?.data?.current.columnId ? findColumnByCardId(event?.active?.id) : null)
  }

  // trigger trong qua trinh user keo: se cap nhat lai state lai 1 lan
  const handleDragOver = (event) => {
    // console.log({ 'handleDragOver': event })

    // khong lam gi neu user keo column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    const { active, over } = event

    // can dam bao neu khong ton tai active or over(khi keo ra khoi container) thi khong lam gi de tranh crash trang
    if (!active || !over) return

    // la card dang duoc keo
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    // overCrd: la card dang tuong tac tren or duoi so voi card duoc keo o tren
    const { id: overCardId } = over

    // tim 2 columns theo cardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    // tranh crash trang
    if (!activeColumn || !overColumn) return 

    if (activeColumn._id !== overColumn._id) {
      // console.log('code chay vao day==')
      moveCardBetweenDifferentColumns(overColumn, overCardId, active, over, activeColumn, activeDraggingCardId, activeDraggingCardData)
    }

  }

  // trigger khi user bat dau tha 1 phan tu: muon dung du lieu column goc thi lay tu state
  const handleDragEnd = (event) => {
    // console.log({ 'handleDragEnd': event })
    const { active, over } = event

    // check neu khong ton tai over, keo linh tinh ra ngoai thi return luon tranh loi
    if (!active || !over) return

    // action keo tha Card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const { active, over } = event
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      // overCard: la card dang tuong tac tren or duoi so voi card duoc keo o tren
      const { id: overCardId } = over
  
      // tim 2 columns theo cardId
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      // tranh crash trang
      if (!activeColumn || !overColumn) return 

      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        // console.log('action THA card giua 2 column khac nhau')
        moveCardBetweenDifferentColumns(overColumn, overCardId, active, over, activeColumn, activeDraggingCardId, activeDraggingCardData)
      } else {
        // console.log('action THA card giua trong cung 1 column')
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c._id === activeDragItemId)
        const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId)

        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)

        setOrderedColumns(prevColumns => {
          const nextColumns = cloneDeep(prevColumns)
          // tim den Column dang tha
          const targetColumn = nextColumns.find(column => column._id === overColumn._id)
          // Updated lai card va cardOrderIds trong targetColumn
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)

          return nextColumns
        })
      }
  
    }
   
    // action keo tha Column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        const oldColumnIndex = orderedColumns.findIndex(c => c._id === active.id)
        const newColumnIndex = orderedColumns.findIndex(c => c._id === over.id)
        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
        // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
        // console.log({dndOrderedColumns})
        // console.log({dndOrderedColumnsIds})
  
        setOrderedColumns(dndOrderedColumns)
      }
    }

    // sau khi keo tha thi tra ve gia tri ban dau
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
  }

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: { active: { opacity: '0.5' } }
    })
  }

  return (
    <DndContext 
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd} 
      sensors={mySensors}
      collisionDetection={closestCorners}
    >
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        p: '10px 10px 0 0'
      }}>
        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType&& null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN ) && <Column column={activeDragItemData} />}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD ) && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent