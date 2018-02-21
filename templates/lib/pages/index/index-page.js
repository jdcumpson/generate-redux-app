// lib/pages/index/index-page.js

import React from 'react'
import {connect} from 'react-redux'


class _IndexPage extends React.Component {
  componentWillMount() {
    // NOTE: you can do some fetching here if it makes sense or
    // in the renderIndex function in lib/main.js
  }

  render() {
    return (
      <div className='IndexPage'>
        <h2>{{projectName}}</h2>
      </div>
    )
  }
}


export const IndexPage = connect((state, ownProps) => state, (dispatch, ownProps) => ({dispatch, }))(_IndexPage)
