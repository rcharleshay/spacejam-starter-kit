import styled from 'styled-components'
import TdsText from '@tds/core-text'
import { media } from '@tds/core-responsive'
import { colorShuttleGrey } from '@tds/core-colours'
import TdsBox from '@tds/core-box'
import TdsFlexGrid from '@tds/core-flex-grid'

export const Text = styled(TdsText)({})
export const CardBox = styled(TdsBox)({ display: 'flex', flexDirection: 'column'})
export const Col = styled(TdsFlexGrid.Col)({})
export const Row = styled(TdsFlexGrid.Row)({})
export const FlexGrid = styled(TdsFlexGrid)({})

export const PaddedDiv = styled.div(({ rightPad, topPad, leftPad }) => {
  let padding = {}

  if (rightPad) {
    padding = {
      ...padding,
      ...media.from('md').css({
        paddingRight: '0rem'
      })
    }
  }

  if (leftPad) {
    padding = {
      ...padding,
      ...media.from('md').css({
        marginLeft: '2rem',
        marginRight: '-1rem'
      })
    }
  }

  if (topPad) {
    padding = {
      ...padding,
      ...media.until('md').css({
        paddingTop: '1rem'
      })
    }
  }

  return {
    paddingBottom: '1rem',
    ...padding
  }
})

export const CardSelectorContainer = styled.button`
  padding: 0 1rem;
  padding-right: 4rem;
  position: relative;
  height: 5rem;
  border: 1px solid ${colorShuttleGrey};
  border-radius: 5px;
  textdecoration: none;
  text-align: left;
  cursor: pointer;
  background: transparent;
  width: 100%;
  span: {
    display: inline-block;
    line-height: 5rem;
    margin-bottom: 0rem;
  }
`

export const CardSelectorIconContainer = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1rem;
  transform: translateY(-50%)'
`
