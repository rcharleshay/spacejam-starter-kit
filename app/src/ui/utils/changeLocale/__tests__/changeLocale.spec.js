/**
 * @jest-environment ../jestenv
 */
/* global jsdom */
import changeLocale from '..'

describe('changeLocale', () => {
  it('getNewLocaleUrl changes locale with language and without region', () => {
    jsdom.reconfigure({
      url: 'http://www.telus.com/en/about'
    })
    window.location.assign = jest.fn()
    const event = { detail: { language: 'en' } }
    changeLocale(event)
    expect(window.location.assign).toBeCalledWith('http://www.telus.com/en/about')
  })

  it('getNewLocaleUrl changes locale with language and region', () => {
    jsdom.reconfigure({
      url: 'http://www.telus.com/en/bc/home'
    })
    window.location.assign = jest.fn()
    const event = { detail: { language: 'fr', region: 'on' } }
    changeLocale(event)
    expect(window.location.assign).toBeCalledWith('http://www.telus.com/fr/on/home')
  })

  it('getNewLocaleUrl changes locale with language and region by default to en/bc', () => {
    jsdom.reconfigure({
      url: 'http://www.telus.com/en/ab/home'
    })
    window.location.assign = jest.fn()
    changeLocale()
    expect(window.location.assign).toBeCalledWith('http://www.telus.com/en/bc/home')
  })

  it('getNewLocaleUrl changes locale without language or region', () => {
    jsdom.reconfigure({
      url: 'http://www.telus.com/notice'
    })
    window.location.assign = jest.fn()
    const event = { detail: { language: 'fr', region: 'on' } }
    changeLocale(event)
    expect(window.location.assign).toBeCalledWith('http://www.telus.com/notice')
    expect(document.cookie).toBe('lang=fr; prov=ON')
  })
})
