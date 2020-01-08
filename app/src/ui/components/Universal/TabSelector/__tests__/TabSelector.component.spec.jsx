import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import TabSelector from '../TabSelector.component'

const createProps = () => ({
  lang: 'en',
  location: { pathname: 'mobility' }
})
const wrapper = shallow(<TabSelector {...createProps()} />)

describe('Tab Selector Component', () => {
  it('renders', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
