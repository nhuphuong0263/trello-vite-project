import React from 'react'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { Group, ModeComment, Attachment } from '@mui/icons-material'

function Card({ temporaryHidenMedia }) {
  if (temporaryHidenMedia) {
    return (
      <MuiCard sx={{ 
        cursor: 'pointer', 
        boxShadow: '0 1px 1px rgba(0, 0 , 0 , 0.2)', 
        overflow: 'visible' 
      }}>
        <CardContent sx={{ p: 2, '&:last-child': { p: 2 } }}>
          <Typography>Card test 01</Typography>
        </CardContent>
      </MuiCard>
    ) 
  }

  return (
    <MuiCard sx={{ 
      cursor: 'pointer', 
      boxShadow: '0 1px 1px rgba(0, 0 , 0 , 0.2)', 
      overflow: 'visible' 
    }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://picsum.photos/200"
        title="green iguana"
      />
      <CardContent sx={{ p: 2, '&:last-child': { p: 2 } }}>
        <Typography>BarleyDev Frontend</Typography>
      </CardContent>
      <CardActions sx={{ p: '0 4px 6px 4px' }}>
        <Button size="small" startIcon={<Group />}>20</Button>
        <Button size="small" startIcon={<ModeComment />}>15</Button>
        <Button size="small" startIcon={<Attachment />}>10</Button>
      </CardActions>
    </MuiCard>
  )
}

export default Card