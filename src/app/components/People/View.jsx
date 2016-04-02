import React from 'react'
import ReactDOM from 'react-dom'

import Divider from 'material-ui/lib/divider'
import Paper from 'material-ui/lib/paper'
import TextField from 'material-ui/lib/text-field'
import AppBar from 'material-ui/lib/app-bar'
import RaisedButton from 'material-ui/lib/raised-button'
import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardHeader from 'material-ui/lib/card/card-header'
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button'
import {FormsyRadio, FormsyRadioGroup, FormsyText} from 'formsy-material-ui'
import Snackbar from 'material-ui/lib/snackbar'

import Gravatar from 'gravatar'
import _ from 'underscore'

export default class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      image: '/images/avatar_placeholder.png'
      , canSubmit: false
      , autoHideDuration: 0
      , snackMessage: 'Your data was saved.'
      , isSnackOpen: false
    }
  }

  //SHould be using state, with onclick handlers on the components to clear them out
  // to make them typable, for now, using deprecated setValue, frustrating shit.
  componentDidMount() {
    var icon = this.refs.icon;
    $.get( "/user/"+this.props.params.userId, function(user) {
      var url = Gravatar.url(user.email, {}, true);
      console.log(url)
      this.setState({image: url})
    }.bind(this))
  }

  _enableSubmit = () => {
    this.setState({ canSubmit: true })
  };
 
  _disableSubmit = () => {
    this.setState({ canSubmit: false })
  };

  _submitForm = (model) => {
    this._snackOpen()
  };

  _snackClose = () => {
    this.setState({ isSnackOpen: false })
  };

  _snackOpen = () => {
    this.setState({ isSnackOpen: true })
  };

  render() {
    return (
      <div style={{marginTop:50, width:"100%"}}>

        <Card>
          <CardHeader
            avatar={<img src={this.state.image}/>} />
          <CardTitle style={{margin:"10px"}} title={this.state.username} subtitle={this.state.email}/>
        </Card>

      </div>
    )
  }
}
