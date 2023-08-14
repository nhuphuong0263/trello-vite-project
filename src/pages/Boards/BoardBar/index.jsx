import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Button from '@mui/material/Button'

import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { Tooltip } from '@mui/material'

const MENU_STYLES = {
  color: '#fff', 
  bgcolor: 'transparent', 
  border: 'none', 
  px: 5, 
  borderRadius: 4,
  '& .MuiSvgIcon-root': {
    color: '#fff'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

function BoardBar() {
  return (
    <Box px={2} sx={{
      backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#34495e' : '#4faae6',
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      // paddingX: 2,
      // px: 2,
      overflowX: 'auto',
      borderBottom: '1px solid #ff5721'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip 
          sx={MENU_STYLES} 
          icon={<DashboardIcon />} 
          label="BarleyDev Mern stack" 
          clickable 
        />
        <Chip 
          sx={MENU_STYLES} 
          icon={<VpnLockIcon />} 
          label="Public/Private workspace" 
          clickable 
        />
        <Chip 
          sx={MENU_STYLES} 
          icon={<AddToDriveIcon />} 
          label="Add google driver" 
          clickable 
        />
        <Chip 
          sx={MENU_STYLES} 
          icon={<BoltIcon />} 
          label="Automation" 
          clickable 
        />
        <Chip 
          sx={MENU_STYLES} 
          icon={<FilterListIcon />} 
          label="Filter" 
          clickable 
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button 
          variant='outlined' 
          startIcon={<PersonAddIcon />}
          sx={{ color: '#fff', borderColor: '#fff', '&:hover': { borderColor: '#fff' } }}
        >
          Invite
        </Button>
        <AvatarGroup max={5} total={24} sx={{ gap: '10px', '& .MuiAvatar-root': { width: 32, height: 32, fontSize: 16, border: 'none', backgroundColor: '#fff', } }}>
          <Tooltip title='barleydev'>
            <Avatar alt="barleydev" src="/static/images/avatar/1.jpg" />
          </Tooltip>
          <Tooltip title='barleydev'>
            <Avatar alt="barleydev" src="/static/images/avatar/1.jpg" />
          </Tooltip>
          <Tooltip title='barleydev'>
            <Avatar alt="barleydev" src="/static/images/avatar/1.jpg" />
          </Tooltip>
          <Tooltip title='barleydev'>
            <Avatar alt="barleydev" src="/static/images/avatar/1.jpg" />
          </Tooltip>
          <Tooltip title='barleydev'>
            <Avatar alt="barleydev" src="/static/images/avatar/1.jpg" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar