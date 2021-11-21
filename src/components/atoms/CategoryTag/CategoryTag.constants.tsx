import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import LocalMoviesIcon from '@mui/icons-material/LocalMovies'
import ExploreIcon from '@mui/icons-material/Explore'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import EmojiNatureIcon from '@mui/icons-material/EmojiNature'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import ScienceIcon from '@mui/icons-material/Science'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'
import CropOriginalIcon from '@mui/icons-material/CropOriginal'
import MoodIcon from '@mui/icons-material/Mood'

export const TAG: Record<string, { label: string; icon: JSX.Element }> = {
  ART: {
    label: 'Arts',
    icon: <CropOriginalIcon />,
  },
  CIN: {
    label: 'Cinéma',
    icon: <LocalMoviesIcon />,
  },
  DIV: {
    label: 'Divertissement',
    icon: <MoodIcon />,
  },
  GEO: {
    label: 'Geographie',
    icon: <ExploreIcon />,
  },
  HIS: {
    label: 'Histoire',
    icon: <AccountBalanceIcon />,
  },
  LIT: {
    label: 'Littérature',
    icon: <MenuBookIcon />,
  },
  NAT: {
    label: 'Nature',
    icon: <EmojiNatureIcon />,
  },
  MUS: {
    label: 'Musique',
    icon: <MusicNoteIcon />,
  },
  SCI: {
    label: 'Science',
    icon: <ScienceIcon />,
  },
  SPO: {
    label: 'Sport',
    icon: <SportsSoccerIcon />,
  },
}
