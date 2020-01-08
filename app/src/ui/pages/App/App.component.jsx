import React, { useEffect } from 'react'
import types from 'prop-types'
import { Head } from '@telus/isomorphic-core'
import translations from 'src/config/translations'
import CSSReset, { GlobalFlexMain } from '@tds/core-css-reset'
import PageSpinner from 'src/ui/components/Universal/PageSpinner'
import changeLocale from 'src/ui/utils/changeLocale'
import { AppContainer } from './App.style'

const App = ({ lang, children, loading, stopLoadingAction }) => {
  const { title } = translations(lang)
  useEffect(() => {
    stopLoadingAction()
    window.addEventListener('GELocaleChange', (event) => changeLocale(event))
    return () => window.removeEventListener('GELocaleChange', (event) => changeLocale(event))
  }, [])

  return (
    <AppContainer vertical={5}>
      <Head head={{ title }} />
      <CSSReset />
      <GlobalFlexMain />
      <PageSpinner loading={loading}>{children}</PageSpinner>
    </AppContainer>
  )
}

App.propTypes = {
  children: types.node.isRequired,
  loading: types.bool.isRequired,
  stopLoadingAction: types.func.isRequired,
  lang: types.string.isRequired
}

export default App
