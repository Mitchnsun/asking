/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import CategoryTag from './CategoryTag'
import { TAG } from './CategoryTag.constants'

describe('atoms/CategoryTag', () => {
  test('it should not display component if tag does not exist', () => {
    const { container } = render(<CategoryTag cat="Toto" />)
    expect(container.firstChild).toBeNull()
  })

  test('it should display an icon and a label', () => {
    const { rerender } = render(<CategoryTag cat="ART" />)
    expect(screen.getByText(TAG.ART.label)).toBeInTheDocument()
    expect(screen.getByTestId('CropOriginalIcon')).toBeInTheDocument()

    rerender(<CategoryTag cat="CIN" />)
    expect(screen.getByText(TAG.CIN.label)).toBeInTheDocument()
    expect(screen.getByTestId('LocalMoviesIcon')).toBeInTheDocument()

    rerender(<CategoryTag cat="DIV" />)
    expect(screen.getByText(TAG.DIV.label)).toBeInTheDocument()
    expect(screen.getByTestId('CelebrationIcon')).toBeInTheDocument()

    rerender(<CategoryTag cat="GAS" />)
    expect(screen.getByText(TAG.GAS.label)).toBeInTheDocument()
    expect(screen.getByTestId('RestaurantIcon')).toBeInTheDocument()

    rerender(<CategoryTag cat="GEO" />)
    expect(screen.getByText(TAG.GEO.label)).toBeInTheDocument()
    expect(screen.getByTestId('ExploreIcon')).toBeInTheDocument()

    rerender(<CategoryTag cat="HIS" />)
    expect(screen.getByText(TAG.HIS.label)).toBeInTheDocument()
    expect(screen.getByTestId('AccountBalanceIcon')).toBeInTheDocument()

    rerender(<CategoryTag cat="LIT" />)
    expect(screen.getByText(TAG.LIT.label)).toBeInTheDocument()
    expect(screen.getByTestId('MenuBookIcon')).toBeInTheDocument()

    rerender(<CategoryTag cat="NAT" />)
    expect(screen.getByText(TAG.NAT.label)).toBeInTheDocument()
    expect(screen.getByTestId('EmojiNatureIcon')).toBeInTheDocument()

    rerender(<CategoryTag cat="MUS" />)
    expect(screen.getByText(TAG.MUS.label)).toBeInTheDocument()
    expect(screen.getByTestId('MusicNoteIcon')).toBeInTheDocument()

    rerender(<CategoryTag cat="PER" />)
    expect(screen.getByText(TAG.PER.label)).toBeInTheDocument()
    expect(screen.getByTestId('MoodIcon')).toBeInTheDocument()

    rerender(<CategoryTag cat="SCI" />)
    expect(screen.getByText(TAG.SCI.label)).toBeInTheDocument()
    expect(screen.getByTestId('ScienceIcon')).toBeInTheDocument()

    rerender(<CategoryTag cat="SPO" />)
    expect(screen.getByText(TAG.SPO.label)).toBeInTheDocument()
    expect(screen.getByTestId('SportsSoccerIcon')).toBeInTheDocument()

    rerender(<CategoryTag cat="TRA" />)
    expect(screen.getByText(TAG.TRA.label)).toBeInTheDocument()
    expect(screen.getByTestId('WorkIcon')).toBeInTheDocument()
  })
})
