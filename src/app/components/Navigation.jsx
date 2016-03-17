import React from 'react'
import Paper from 'material-ui/lib/paper'

import User from './User.jsx'

const style = {
  margin: 10
  , padding: 10
  , display: 'inline-block'
};

export default class Navigation extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    $.get( "/user/me", function(data) {
      this.setState(data);
    }.bind(this))
  }

  render() {
    return (
      <div className="mdl-layout__drawer">
        <nav className="mdl-navigation">
        <Paper zDepth={1} style={style}>
          <span style={{float:"left", fontSize:"16px"}}>Hi, <b>{this.state.firstname}</b></span>
          <span style={{float:"right"}}><User size={40}/></span>
         </Paper>
          <a className="mdl-navigation__link" href="#/">
            <i className="material-icons">home</i>
            <span>Home</span>
          </a>
          <a className="mdl-navigation__link" href="#/conversation">
            <i className="material-icons">email</i>
            <span className="mdl-badge" data-badge="4">Conversations</span>
          </a>
          <a className="mdl-navigation__link" href="#/collection">
            <i className="material-icons">collections</i>
            Collections
          </a>
          <a className="mdl-navigation__link" href="#/experience">
            <i className="material-icons">photo_filter</i>
            Experiences
          </a>
          <a className="mdl-navigation__link" href="#/checklists">
            <i className="material-icons">beenhere</i>
            Checklists
          </a>
        </nav>
      </div>
    )
  }
}

Navigation.contextTypes = {
  router: React.PropTypes.object.isRequired
}
