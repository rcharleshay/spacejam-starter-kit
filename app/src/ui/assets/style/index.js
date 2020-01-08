import styled from 'styled-components'
import TdsBox from '@tds/core-box'
import TdsFlexGrid from '@tds/core-flex-grid'
import TdsChevronLink from '@tds/core-chevron-link'
import TdsHairlineDivider from '@tds/core-hairline-divider'
import TdsHeading from '@tds/core-heading'
import TdsText from '@tds/core-text'
import TdsSpinner from '@tds/core-spinner'
import TdsInput from '@tds/core-input'
import TdsCoreLink from '@tds/core-link'
import TdsTooltip from '@tds/core-tooltip'
import { colorTelusPurple, colorAccessibleGreen, colorShuttleGrey, colorWhite, colorShark } from '@tds/core-colours'
import { media } from '@tds/core-responsive'

/* Shared */
export const Box = styled(TdsBox)({})
export const FlexGrid = styled(TdsFlexGrid)({})
export const Col = styled(TdsFlexGrid.Col)({})
export const Row = styled(TdsFlexGrid.Row)({
  margin: '1rem'
})

export const Tooltip = styled(TdsTooltip)({})
export const Link = styled('div')({ color: 'orange' })
export const ChevronLink = styled(TdsChevronLink)({})
export const HairlineDivider = styled(TdsHairlineDivider)({})
export const Heading = styled(TdsHeading)({ textAlign: 'center' })
export const Text = styled(TdsText)({})
export const Spinner = styled(TdsSpinner)({})
export const CoreLink = styled(TdsCoreLink)({})

export { colorAccessibleGreen, colorTelusPurple }

export const Input = styled(TdsInput)({})

export const errorBoxStyle = {
  marginBottom: '0.5rem',
  backgroundColor: 'rgb(255, 246, 248)',
  borderRadius: '4px',
  paddingTop: '1rem',
  paddingBottom: '1rem',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  display: 'block',
  flexDirection: 'column'
}

/* src/ui/pages/App */
export const AppContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'stretch',
  ...media.until('md').css({
    minHeight: 'calc(100vh - (60px + 64px))'
  }),
  ...media
    .from('md')
    .until('lg')
    .css({
      minHeight: 'calc(100vh - (60px + 96px))'
    }),
  ...media.from('lg').css({
    minHeight: 'calc(100vh - (125px + 96px))'
  })
})

/* src/ui/components/Universal/TabSelector */
export const Tab = styled(TdsBox)({
  marginTop: '.5rem',
  padding: '1rem',
  borderBottom: `5px solid ${colorTelusPurple}`
})

export const Icon = styled(TdsBox)({
  marginRight: '.5rem'
})

/* src/ui/components/PageSpinner */
export const SpinnerContainer = styled(TdsBox)({
  position: 'fixed',
  top: 'calc(50vh - 50px)',
  left: 'calc(50vw - 50px)'
})

export const ClearSearch = styled.button({
  padding: 0,
  border: 'none',
  background: 'none',
  textAlign: 'left',
  textDecoration: 'underline',
  alignSelf: 'flex-start',
  '&:hover': {
    textDecoration: 'none',
    cursor: 'pointer'
  }
})

export const SearchForm = styled.form({
  position: 'relative',
  marginTop: '2rem',
  input: {
    paddingRight: '4rem'
  },
  'input::-ms-clear': {
    display: 'none'
  },
  'label[for="account-search"] > span > span': {
    // Override TDS Input label
    fontSize: '1.25rem'
  },
  // IE fixes
  '-ms-flex-negative': 0,
  '> div > div': {
    // Override TDS Input wrapper
    '-ms-flex-negative': 0
  }
})

export const SearchContainer = styled.div`
  position: relative;
  input::-ms-clear {
    display: none;
  }
`

const SearchIconContainer = styled.button`
  position: absolute;
  border-radius: 0rem 0.2rem 0.2rem 0rem;
  bottom: 0;
  right: 0;
  padding: 0.45rem 1.2rem;
  margin: 0;
  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    bottom: 0.35rem;
  }
  @media screen and (min-color-index: 0) and(-webkit-min-device-pixel-ratio:0) {
    @media {
      bottom: -0.1rem;
      right: -0.1rem;
    }
  }
  @media not all and (min-resolution: 0.001dpcm) {
    @media {
      bottom: 0rem;
      right: -0.15rem;
    }
  }
`

export const SearchIconContainerEnabled = styled(SearchIconContainer)`
  border: 1px solid ${colorAccessibleGreen};
  background-color: ${colorAccessibleGreen};
  cursor: pointer;
`

export const SearchIconContainerDisabled = styled(SearchIconContainer)`
  border: 1px solid ${colorShuttleGrey};
  background-color: ${colorWhite};
`
export const ChangeAccountLink = styled.button({
  border: 0,
  background: `transparent`,
  cursor: 'pointer',
  color: colorShark,
  textDecoration: 'underline',
  '&:hover': {
    textDecoration: 'none',
    cursor: 'pointer'
  }
})

export const ChangeAccountChevronLink = styled.a({
  fontWeight: 500,
  fontSize: 16,
  cursor: 'pointer',
  color: colorTelusPurple,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'none',
    cursor: 'pointer'
  }
})

export const StyledChevron = styled.span(({ direction }) => ({
  display: 'inline-block',
  transition: 'transform 300ms',
  [`${ChangeAccountChevronLink}:hover &`]: {
    transform: `translateX(${direction === 'right' ? '0.25rem' : '-0.25rem'})`
  }
}))
