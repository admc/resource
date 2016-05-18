import React from 'react'
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';

import User from './User.jsx'

export default class Header extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <header className="mdl-layout__header mdl-layout__header--transparent">
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">
           <img style={{height:"35"}}
             src="/images/white_r_boxy.png"/>
          </span>
          <div className="mdl-layout-spacer"></div>
          <nav className="mdl-navigation">
            <a className="mdl-navigation__link" href="javascript: void(0)">
              <User/>
            </a>
          </nav>
        </div>
      </header>
    )
  }
}

Header.contextTypes = {
  router: React.PropTypes.object.isRequired
}
