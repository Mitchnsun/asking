import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CelebrationIcon from '@mui/icons-material/Celebration'
import CheckroomIcon from '@mui/icons-material/Checkroom'
import CommuteIcon from '@mui/icons-material/Commute'
import CropOriginalIcon from '@mui/icons-material/CropOriginal'
import EmojiNatureIcon from '@mui/icons-material/EmojiNature'
import ExploreIcon from '@mui/icons-material/Explore'
import FavoriteIcon from '@mui/icons-material/Favorite'
import LocalMoviesIcon from '@mui/icons-material/LocalMovies'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import MoodIcon from '@mui/icons-material/Mood'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import PeopleIcon from '@mui/icons-material/People'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import ScienceIcon from '@mui/icons-material/Science'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'
import TranslateIcon from '@mui/icons-material/Translate'
import TravelExploreIcon from '@mui/icons-material/TravelExplore'
import WorkIcon from '@mui/icons-material/Work'

export const TAG: Record<string, { label: string; icon: JSX.Element }> = {
  ACT: {
    label: 'Actualité',
    icon: <NewspaperIcon />,
  },
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
  COM: {
    label: 'Transport',
    icon: <CommuteIcon />,
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
  LAN: {
    label: 'Langues étrangères',
    icon: <TranslateIcon />,
  },
  LIF: {
    label: 'Vie personnelle',
    icon: <AccountCircleIcon />,
  },
  LIT: {
    label: 'Littérature',
    icon: <MenuBookIcon />,
  },
  LOV: {
    label: 'Amour',
    icon: <FavoriteIcon />,
  },
  NAT: {
    label: 'Nature',
    icon: <EmojiNatureIcon />,
  },
  MOD: {
    label: 'Mode',
    icon: <CheckroomIcon />,
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
