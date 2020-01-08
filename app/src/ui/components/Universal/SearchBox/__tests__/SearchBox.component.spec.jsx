import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { withLocale } from '@telus/isomorphic-core'
import SearchBox from '../SearchBox.component'

jest.mock('@telus/isomorphic-core', () => {
  const identity = x => x
  return {
    withLocale: jest.fn(identity)
  }
})
const searchMock = jest.fn()
const clearMock = jest.fn()
const apiSearchMock = jest.fn()
const createProps = (overrideProps) => ({
  lang: 'en',
  prov: 'on',
  localSearchAction: searchMock,
  clearSearchAction: clearMock,
  apiSearchAction: apiSearchMock,
  location: { pathname: 'mobility' },
  searchType: 'account',
  searchStatus: '',
  subscriberCount: 10,
  ...overrideProps
})


describe('Search Box Component', () => {

  it('renders', () => {
    const wrapper = shallow(<SearchBox {...createProps()} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders for searchType Subscriber', () => {
    const wrapper = shallow(<SearchBox {...createProps({ searchType: 'subscriber' })} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders for account - searchStatus success', () => {
    const wrapper = shallow(<SearchBox {...createProps({ searchStatus: 'SUCCESS'  })} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders for account - searchStatus failure', () => {
    const wrapper = shallow(<SearchBox {...createProps({ searchStatus: 'FAILURE'  })} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders for subscriber - searchStatus success', () => {
    const wrapper = shallow(<SearchBox {...createProps({ searchStatus: 'SUCCESS', searchType: 'subscriber' })} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders for subscriber - searchStatus failure', () => {
    const wrapper = shallow(<SearchBox {...createProps({ searchStatus: 'FAILURE', searchType: 'subscriber' })} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
