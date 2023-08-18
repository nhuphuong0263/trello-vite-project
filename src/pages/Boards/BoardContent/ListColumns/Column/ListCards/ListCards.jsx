import Box from '@mui/material/Box'
import Card from './Card/Card'

function ListCards() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      p: '0 5px',
      m: '0 5px',
      overflowX: 'hidden',
      overflowY: 'auto',
      height: '100%',
      maxHeight: (theme) => `calc(
        ${theme.trello.boardContentHeight} - 
        ${theme.spacing(10)} - 
        ${theme.trello.columnHeaderHeight} - 
        ${theme.trello.columnFooterHeight})`,
      '&::-webkit-scrollbar-thumb': { backgroundColor: '#ced0da', borderRadius: '8px' },
      '*::-webkit-scrollbar-thumb:hover': { backgroundColor: '#dfc2df', borderRadius: '8px' }
    }}>
      <Card />
      <Card temporaryHidenMedia />
    </Box>
  )
}

export default ListCards