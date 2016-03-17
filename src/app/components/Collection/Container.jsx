import React from 'react'
import Dialog from 'material-ui/lib/dialog'
import FlatButton from 'material-ui/lib/flat-button'
import RaisedButton from 'material-ui/lib/raised-button'
import AppBar from 'material-ui/lib/app-bar'
import Paper from 'material-ui/lib/paper'

export default class Container extends React.Component {
  constructor(props) {
    super(props)
  }

  _create = (e) => {
    e.preventDefault()
    this.context.router.push('/collection/create')
  };

  _list = (e) => {
    e.preventDefault()
    this.context.router.push('/collection/list')
  };

  render() {
    return (
      <div style={{marginTop:50, width:"100%"}}>
        <AppBar
          title={<span style={{cursor:"pointer"}} onClick={this._list}>Collections</span>}
          showMenuIconButton={false} 
          iconElementRight={
            <FlatButton primary={true} label="New Collection" onClick={this._create} />
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
