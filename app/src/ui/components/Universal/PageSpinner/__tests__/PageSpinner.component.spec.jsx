import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import PageSpinner from '../PageSpinner.component'

const createProps = () => ({
  loading: true
})
const wrapper = shallow(
  <PageSpinner {...createProps()}>
    <div>Children</div>
  </PageSpinner>
)

describe('Page Spinner Component', () => {
  it('renders', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
