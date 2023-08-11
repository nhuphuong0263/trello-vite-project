import Container from '@mui/material/Container'
import useMediaQuery from '@mui/material/useMediaQuery'
import AppBar from '../../components/AppBar'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent'

export default function Board() {
  useMediaQuery('(prefers-color-scheme: dark)')
  return (
    <Container disableGutters maxWidth={false} sx={{ heihgt: '100vh', backgroundColor: 'primary.main'}}>
      <AppBar />
      <BoardBar />
      <BoardContent />
    </Container>
  )
}

