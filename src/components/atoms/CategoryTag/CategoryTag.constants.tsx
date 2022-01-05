import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import CelebrationIcon from '@mui/icons-material/Celebration'
import CropOriginalIcon from '@mui/icons-material/CropOriginal'
import EmojiNatureIcon from '@mui/icons-material/EmojiNature'
import ExploreIcon from '@mui/icons-material/Explore'
import LocalMoviesIcon from '@mui/icons-material/LocalMovies'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import MoodIcon from '@mui/icons-material/Mood'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import ScienceIcon from '@mui/icons-material/Science'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'
import WorkIcon from '@mui/icons-material/Work'

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
    icon: <CelebrationIcon />,
  },
  GAS: {
    label: 'Gastronomie',
    icon: <RestaurantIcon />,
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
  PER: {
    label: 'Personnalité',
    icon: <MoodIcon />,
  },
  SCI: {
    label: 'Science',
    icon: <ScienceIcon />,
  },
  SPO: {
    label: 'Sport',
    icon: <SportsSoccerIcon />,
  },
  TRA: {
    label: 'Travail',
    icon: <WorkIcon />,
  },
}
