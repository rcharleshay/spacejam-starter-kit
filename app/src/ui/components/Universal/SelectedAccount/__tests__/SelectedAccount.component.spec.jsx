import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { withLocale } from '@telus/isomorphic-core'
import SelectedAccount from '../SelectedAccount.component'

jest.mock('@telus/isomorphic-core', () => {
  const identity = x => x
  return {
    withLocale: jest.fn(identity)
  }
})

const accountMock = jest.fn()
const createProps = () => ({
  lang: 'en',
  accounts: [],
  numberOfSubs: 2,
  reselectAccountAction: accountMock,
  location: { pathname: 'mobility' },
  category: 'mobility',
  account: '123456',
  filter: 'subscriber',
  postAccountInSessionAction: jest.fn()
})
const wrapper = shallow(<SelectedAccount {...createProps()} />)

describe('Selected Account Component', () => {
  it('renders', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
