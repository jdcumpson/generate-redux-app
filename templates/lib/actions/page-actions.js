// actions/pages.js

export const INVALIDATE_POSTMORTEM = 'INVALIDATE_POSTMORTEM'
export const REQUEST_UPDATE_PAGE = 'REQUEST_UPDATE_PAGE'
export const RECEIVE_UPDATE_PAGE = 'RECEIVE_UPDATE_PAGE'


export const updatePage = ({location, match, history}) => {
  return (dispatch, getState) => {
    dispatch({
      type: RECEIVE_UPDATE_PAGE,
      location,
      match,
      history,
    })
  }
}


export const navigatePage = (url, args) => {
  return (_dispatch, getState) => {
    getState().page.history.push(url, args)
  }
}
