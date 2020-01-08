import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { withLocale } from '@telus/isomorphic-core'
import CardSelector from '../CardSelector.component'

jest.mock('@telus/isomorphic-core', () => {
  const identity = x => x
  return {
    withLocale: jest.fn(identity)
  }
})

const card = {
  content: '28986434',
  email: 'multi_ban@telusinternal.com',
  encryptedBan: 'n_ACegVw1uUEVlcB3AKw7A',
  formattedName: 'UAT TESTER',
  numberOfSubs: 5,
  subTypeCd: 'X',
  typeCd: 'B'
}
let cards = []
for (let i=0; i< 40; i++)
{
  cards.push(card)
}
const clickSpy = jest.fn()

describe('Card Selector Component', () => {

  const createProps = () => ({
    cards,
    lang: 'en',
    contextType: 'account',
    isLoading: false,
    searchCards: [],
    isLargeSub: false,
    searchStatus: '',
    onClick: clickSpy
  })

  it('renders', () => {
    const wrapper = shallow(<CardSelector {...createProps()} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
