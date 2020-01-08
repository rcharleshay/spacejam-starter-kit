import React from 'react'
import { mount } from 'enzyme'
import { triggerAnalytics } from '@telus/analytics-scripts'
import useAnalytics from '..'

jest.mock('@telus/analytics-scripts', () => ({
  triggerAnalytics: () => new Promise((res) => res)
}))

const TestHook = ({ callback }) => {
  callback()
  return null
}

const testHook = (callback) => mount(<TestHook callback={callback} />)

describe('useAnalytics hook', () => {
  const hello = testHook(useAnalytics)

  test('datalayer should be defined', () => {
    expect(hello.length).toEqual(1)
  })
})
