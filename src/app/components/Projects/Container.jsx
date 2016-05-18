import React from 'react'

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';

export default class Container extends React.Component {
  constructor(props) {
    super(props)
  }

  _create = (e) => {
    e.preventDefault()
    this.context.router.push('/projects/create')
  };

  _list = (e) => {
    e.preventDefault()
    this.context.router.push('/projects/list')
  };

  render() {
    return (
      <div style={{marginTop:50, width:"100%"}}>
        <AppBar
          title={<span style={{cursor:"pointer"}} onClick={this._list}>Projects</span>}
          showMenuIconButton={false} 
          iconElementRight={
            <FlatButton primary={true} label="New Project" onClick={this._create} />
          }
        /> 
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Container.contextTypes = {
  router: React.PropTypes.object.isRequired
}
