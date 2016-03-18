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
         </Paper>
          <a className="mdl-navigation__link" href="#/">
            <i className="material-icons">home</i>
            <span>Home</span>
          </a>
          <a className="mdl-navigation__link" href="#/projects">
            <i className="material-icons">library_books</i>
            <span className="mdl-badge">Projects</span>
          </a>
          <a className="mdl-navigation__link" href="#/people">
            <i className="material-icons">face</i>
            People 
          </a>
          <a className="mdl-navigation__link" href="#/attributes">
            <i className="material-icons">all_inclusive</i>
            Attributes
          </a>
          <a className="mdl-navigation__link" href="#/archives">
            <i className="material-icons">archive</i>
            Archives 
          </a>
          <a className="mdl-navigation__link" href="#/analytics">
            <i className="material-icons">assessment</i>
            Analytics 
          </a>
        </nav>
      </div>
    )
  }
}

Navigation.contextTypes = {
  router: React.PropTypes.object.isRequired
}
