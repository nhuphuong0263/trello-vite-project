import React from 'react'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { Group, ModeComment, Attachment } from '@mui/icons-material'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function Card({ card }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ 
    id: card._id, 
    data: { ...card } 
  })
  const dndKitCardStyles = {
    touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    border: isDragging ? '1px solid #2ecc72' : 0
  }

  const shouldShowCardAction = () => {
    return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
  }
  return (
    <MuiCard 
      ref={setNodeRef}
      style={dndKitCardStyles}
      {...attributes}
      {...listeners}
      sx={{ 
        cursor: 'pointer', 
        boxShadow: '0 1px 1px rgba(0, 0 , 0 , 0.2)', 
        overflow: 'visible' 
      }}>
      {card?.cover && <CardMedia sx={{ height: 140 }} image={card?.cover} title={card?.title}
      />}
      <CardContent sx={{ p: 2, '&:last-child': { p: 2 } }}>
        <Typography>{card?.title}</Typography>
      </CardContent>
      {shouldShowCardAction() && <CardActions sx={{ p: '0 4px 6px 4px' }}>
        {!!card?.memberIds?.length && <Button size="small" startIcon={<Group />}>{card?.memberIds?.length}</Button>}
        {!!card?.comments?.length && <Button size="small" startIcon={<ModeComment />}>{card?.comments?.length}</Button>}
        {!!card?.attachments?.length && <Button size="small" startIcon={<Attachment />}>{card?.attachments?.length}</Button>}
      </CardActions>}
    </MuiCard>
  )
}

export default Card