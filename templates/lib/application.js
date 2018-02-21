// lib/application.js

import React from 'react'


// TODO: app-wide themes can be installed on the app container

class Application extends React.Component {
  render() {
    return (
      <div className='Application'>
        {this.props.children}
      </div>
    )
  }
}


export {
  Application,
}
