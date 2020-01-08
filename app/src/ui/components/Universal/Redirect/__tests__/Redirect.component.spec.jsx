import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { withRouter } from 'react-router'
import Redirect from '../Redirect.component'

jest.mock('react-router', () => {
  const identity = x => x
  return {
    withRouter: jest.fn(identity)
  }
})

const defaultProps = {
  location: {
    pathname: '/mobility/subscriber',
    search: '?rd=http://www.google.com'
  }
}

describe('Redirect Component', () => {

  window.location.replace = jest.fn()
  const doShallow = (overrideProps = {}) => {
    return shallow(<Redirect {...defaultProps} {...overrideProps} />)
  }

  it('renders', () => {
    const wrapper = doShallow()
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders Redirect without rd params', () => {
    const wrapper = doShallow({
      location: {
        pathname: '/mobility/subscriber',
        search: ''
      }
    })
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
