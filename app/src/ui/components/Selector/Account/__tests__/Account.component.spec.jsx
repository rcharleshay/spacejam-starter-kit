import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import Account from '../Account.component'

const createProps = () => ({
  clearSearchAction: jest.fn(),
  postAccountInSessionAction: jest.fn(),
  accounts: [],
  category: 'mobility',
  isLoading: true
})
const wrapper = shallow(<Account {...createProps()} />)

describe('Account Component', () => {
  it('renders', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
