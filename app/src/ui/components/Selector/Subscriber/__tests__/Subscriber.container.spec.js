import { fromJS } from 'immutable'
import { mapStateToProps, mapDispatchToProps } from '../Subscriber.container'

describe('Subscriber Container', () => {
  const STATE = {
    isLargeSub: false,
    cards: [],
    activeAccount: {
      content: '123',
      numberOfSubs: 15,
      email: ''
    },
    accounts: [
      {
        content: '123',
        numberOfSubs: 15,
        email: ''
      }
    ],
    isLoading: true,
    category: 'mobility'
  }
  const defaultState = {
    app: fromJS({
      data: STATE
    })
  }

  it('should return loading', () => {
    expect(mapStateToProps(defaultState)).toEqual({
      activeAccountObject: [],
      cards: [],
      category: 'mobility',
      email: undefined,
      fetchSubs: true,
      isLargeSub: false,
      isLoading: true
    })
  })
})
