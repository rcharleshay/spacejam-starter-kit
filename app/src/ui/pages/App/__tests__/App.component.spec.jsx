import React, { useState, useEffect } from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import testHook from 'src/ui/utils/testHook'
import App from '../App.component'

describe('App', () => {
  const defaultProps = {
    loading: true,
    stopLoadingAction: () => ({}),
    children: []
  }

  it('renders a child component', () => {
    const wrapper = shallow(
      <App {...defaultProps} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should updated with hook', () => {
    const value = testHook(() => App(defaultProps))
    expect(value).toBeDefined()
  })
})
