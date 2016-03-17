import React from 'react'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import IconButton from 'material-ui/lib/icon-button'
import MenuItem from 'material-ui/lib/menus/menu-item'
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
             src="/images/logo_icon_medium.png"/>
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
