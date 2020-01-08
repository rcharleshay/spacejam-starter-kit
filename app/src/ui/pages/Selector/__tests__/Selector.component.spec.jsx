import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import Selector from '../Selector.component'

const createProps = (props) => ({
  context: 'account',
  filter: false,
  prov: 'on',
  lang: 'en',
  ...props
})

describe('Card Selector Component', () => {
  it('renders account', () => {
    const wrapper = shallow(<Selector {...createProps()} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders subscriber', () => {
    const wrapper = shallow(<Selector {...createProps({ context: 'subscriber' })} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders subscriber', () => {
    const wrapper = shallow(<Selector {...createProps({ context: 'error' })} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders subscriber', () => {
    const wrapper = shallow(<Selector {...createProps({ context: 'redirect' })} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
