import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { withLocale } from '@telus/isomorphic-core'
import Error from '../Error.component'

jest.mock('@telus/isomorphic-core', () => {
  const identity = x => x
  return {
    withLocale: jest.fn(identity)
  }
})


describe('Error Component', () => {
  const createProps = () => ({
    lang: 'en'
  })

  const wrapper = shallow(<Error {...createProps()} />)
  it('renders', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
