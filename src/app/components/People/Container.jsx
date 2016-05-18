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

  _list = (e) => {
    e.preventDefault()
    this.context.router.push('/people/list')
  };

  render() {
    return (
      <div style={{marginTop:50, width:"100%"}}>
        <AppBar
          title={<span style={{cursor:"pointer"}} onClick={this._list}>People</span>}
          showMenuIconButton={false} 
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
