import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'

import { NoteAdd } from '@mui/icons-material'

import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

function ListColumns({ columns }) {
  /** Thang sortableContext yeu cau items la 1 array dang ['id-1', 'id-2] chu khong phai la [{id: 'id-1'}, ...]
   * neu keo tha thi van duoc nhung k co amination
   */
  return (
    <SortableContext items={columns.map(c => c._id)} strategy={horizontalListSortingStrategy}>
      <Box sx={{
        bgcolor: 'inherit',
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar-track': { m: 2 }
      }}>
        {columns?.map(column => <Column key={column._id} column={column} />)}

        <Box sx={{
          minWidth: '200px',
          maxWidth: '200px',
          mx: 2,
          borderRadius: '6px',
          height: 'fit-content',
          bgcolor: '#ffffff3d'
        }}>
          <Button startIcon={<NoteAdd />} sx={{ color: 'white', width: '100%', justifyContent: 'flex-start', pl: 4, py: 1 }}>Add new column</Button>
        </Box>
      </Box>
    </SortableContext>
  )
}

export default ListColumns