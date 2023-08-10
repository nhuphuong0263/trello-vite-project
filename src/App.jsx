import Button from '@mui/material/Button'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import Icon from '@mui/material/Icon'
import IconButton from '@mui/material/IconButton'
import SvgIcon from '@mui/material/SvgIcon'
import { green } from '@mui/material/colors'

function App() {

  return (
    <>
      <div>LePhuongDev</div>
      <Button variant="text">text</Button>
      <Button variant="contained">contained</Button>
      <Button variant="outlined">outlined</Button>
      <AccessAlarmIcon />
      <Icon>star</Icon>

      <IconButton aria-label="delete">
        <SvgIcon>
          <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
        </SvgIcon>
      </IconButton>

      <Icon sx={{ color: green[500] }}>add_circle</Icon>
    </>
  )
}

export default App
