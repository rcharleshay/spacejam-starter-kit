import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import testHook from 'src/ui/utils/testHook'
import Subscriber from '../Subscriber.component'

const postSubsMock = jest.fn()
const postsSubsSessionMock = jest.fn()
const createProps = (props) => ({
  activeAccountObject: {
    content: 'hello',
    numberOfSubs: 12
  },
  isLargeSub: false,
  cards: [],
  isLoading: true,
  postSubscriberInSessionAction: postSubsMock,
  fetchSubs: false,
  postSubscribersAction: postsSubsSessionMock,
  setSubscribersFetchedAction: jest.fn(),
  category: 'mobility',
  email: 'test@telusinternal.com',
  ...props
})

const wrapper = shallow(<Subscriber {...createProps()} />)

describe('Subscriber Component', () => {
  it('renders', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('test useEffect with fetch', () => {
    testHook(() => Subscriber(createProps({ fetchSubs: true })))
    expect(postsSubsSessionMock).toHaveBeenCalled()
  })

  it('test useEffect no fetch', () => {
    testHook(() => Subscriber(createProps({ fetchSubs: false })))
    expect(postsSubsSessionMock).toHaveBeenCalled()
  })
})
