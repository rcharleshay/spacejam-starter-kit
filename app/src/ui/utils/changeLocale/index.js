const URL_REGEX = /(.*\/)(en|fr)(\/)(ab|bc|mb|nb|nl|ns|nt|nu|on|pe|qc|sk|yt)(.*)/

const getNewLocaleUrl = (event) => {
  const defaultLocale = { language: 'en', region: 'bc' }
  const newLocale = event && event.detail ? event.detail : defaultLocale
  let newUrl = window.location.href

  const currentUrl = window.location.href.toLowerCase()

  if (URL_REGEX.test(currentUrl)) {
    newUrl = currentUrl.replace(
      URL_REGEX,
      // about header change locale event does not include region so we
      // default to existing region
      `$1${newLocale.language}$3${newLocale.region || '$4'}$5`
    )
  } else {
    // We need to manually set the cookie as express locale won't
    document.cookie = `lang=${newLocale.language};path=/;expires=Tue, 19 Jan 2038 03:14:07 UTC;domain=.telus.com`
    document.cookie = `prov=${newLocale.region.toUpperCase()};path=/;expires=Tue, 19 Jan 2038 03:14:07 UTC;domain=.telus.com`
  }

  return newUrl
}

const changeLocale = (event) => {
  const path = getNewLocaleUrl(event)
  window.location.assign(path)
}

export default changeLocale
