import React from 'react'
import Chip from '@mui/material/Chip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

import { TAG } from './CategoryTag.constants'

const CategoryTag = ({ cat }: { cat: string }): JSX.Element | null => {
  const { label, icon = <HelpOutlineIcon /> } = TAG[cat] || {}

  return label ? <Chip icon={icon} label={label} color="primary" /> : null
}

export default CategoryTag
