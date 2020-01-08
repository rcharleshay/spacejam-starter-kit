import { fromJS } from 'immutable'
import { mapStateToProps } from '../Selector.container'

describe('Selector Container', () => {
  const CONTEXT = 'business-wireline'
  const FILTER = 'internet'
  const defaultState = {
    app: fromJS({
      data: {
        context: CONTEXT,
        filter: FILTER
      }
    })
  }

  it('should return context', () => {
    expect(mapStateToProps(defaultState).context).toEqual(CONTEXT)
  })

  it('should return filter', () => {
    expect(mapStateToProps(defaultState).filter).toEqual(FILTER)
  })
})
