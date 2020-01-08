import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { withLocale } from '@telus/isomorphic-core'
import { withRouter } from 'react-router'
import Header from '../Header.component'

jest.mock('@telus/isomorphic-core', () => {
  const identity = x => x
  return {
    withLocale: jest.fn(identity)
  }
})

jest.mock('react-router', () => {
  const identity = x => x
  return {
    withRouter: jest.fn(identity)
  }
})

const defaultProps = {
  lang: 'en',
  accountType: 'account',
  location: {
    pathname: '/mobility/subscriber',
    search: '?rd=http://www.google.com'
  }
}

describe('Header Component', () => {

  const doShallow = (overrideProps = {}) => {
    return shallow(<Header {...defaultProps} {...overrideProps} />)
  }

  it('renders Header', () => {
    const wrapper = doShallow()
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders Header for subscriber', () => {
    const wrapper = doShallow({ accountType: 'subscriber'})
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders Header without rd params', () => {
    const wrapper = doShallow({
      location: {
        pathname: '/mobility/subscriber',
        search: ''
      }
    })
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
