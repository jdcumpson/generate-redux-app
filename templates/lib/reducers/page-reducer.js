// lib/reducers/page-reducer.js

import {RECEIVE_UPDATE_PAGE, } from '../actions/page-actions'


export const DEFAULT_PAGE_STATE = {}


export const pageStateReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_UPDATE_PAGE:
      const {component, name, params, history, location, match} = action
      return Object.assign({}, state, {
        name,
        component,
        params,
        history,
        location,
        match,
      })
    default:
      return state
  }
}
