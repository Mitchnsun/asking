import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CelebrationIcon from '@mui/icons-material/Celebration'
import CropOriginalIcon from '@mui/icons-material/CropOriginal'
import EmojiNatureIcon from '@mui/icons-material/EmojiNature'
import ExploreIcon from '@mui/icons-material/Explore'
import LocalMoviesIcon from '@mui/icons-material/LocalMovies'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import MoodIcon from '@mui/icons-material/Mood'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import PeopleIcon from '@mui/icons-material/People'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import ScienceIcon from '@mui/icons-material/Science'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'
import TravelExploreIcon from '@mui/icons-material/TravelExplore'
import WorkIcon from '@mui/icons-material/Work'

export const TAG: Record<string, { label: string; icon: JSX.Element }> = {
  AMI: {
    label: 'Amitié',
    icon: <PeopleIcon />,
  },
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
  LIF: {
    label: 'Vie personnelle',
    icon: <AccountCircleIcon />,
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
  VOY: {
    label: 'Voyage',
    icon: <TravelExploreIcon />,
  },
}
