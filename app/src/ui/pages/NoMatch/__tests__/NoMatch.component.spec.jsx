import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import NoMatch from '../NoMatch.component'

const createProps = () => ({})

const wrapper = shallow(<NoMatch {...createProps()} />)

describe('Card Selector Component', () => {
  it('renders', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
