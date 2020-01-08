import { fromJS } from 'immutable'
import { mapStateToProps, mapDispatchToProps } from '../App.container'

describe('Mobility Container', () => {
  const LOADING = true
  const defaultState = {
    app: fromJS({
      data: {
        loading: LOADING
      }
    })
  }

  it('should return loading', () => {
    expect(mapStateToProps(defaultState).loading).toEqual(LOADING)
  })

  it('should return stop loading action', () => {
    const stopLoadingAction = mapDispatchToProps.stopLoadingAction
    expect(mapDispatchToProps).toEqual({ stopLoadingAction })
  })
})
