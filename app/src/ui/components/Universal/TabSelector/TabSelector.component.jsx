import React from 'react'
import types from 'prop-types'
import tabData from 'src/ui/utils/tabData'
import translations from 'src/config/translations'
import * as S from 'src/ui/assets/style'

const TabSelector = ({ lang, location }) => {
  const { pathname } = location
  const { Icon, text } = tabData(pathname)
  const title = translations(lang)[text]
  return (
    <S.Box>
      <S.FlexGrid limitWidth={false}>
        <S.Row>
          <S.Tab>
            <S.FlexGrid limitWidth={false}>
              <S.Row>
                <S.Icon>
                  <Icon />
                </S.Icon>
                <S.Text data-test={`selected-tab-${title}`}>{title}</S.Text>
              </S.Row>
            </S.FlexGrid>
          </S.Tab>
        </S.Row>
      </S.FlexGrid>
    </S.Box>
  )
}

TabSelector.propTypes = {
  location: types.shape({
    pathname: types.string.isRequired
  }).isRequired,
  lang: types.string.isRequired
}

export default TabSelector
