import React, { useEffect } from 'react'
import types from 'prop-types'
import { Head } from '@telus/isomorphic-core'
import CSSReset, { GlobalFlexMain } from '@tds/core-css-reset'
import changeLocale from 'src/ui/utils/changeLocale'
import * as S from './App.style'

const App = ({ children }) => {
  useEffect(() => {
    window.addEventListener('GELocaleChange', (event) => changeLocale(event))
    return () => window.removeEventListener('GELocaleChange', (event) => changeLocale(event))
  }, [])

  return (
    <S.Wrapper vertical={5}>
      <Head head="Telus | App" />
      <CSSReset />
      <GlobalFlexMain />
      {children}
    </S.Wrapper>
  )
}

App.propTypes = {
  children: types.node.isRequired,
  lang: types.string.isRequired
}

export default App
