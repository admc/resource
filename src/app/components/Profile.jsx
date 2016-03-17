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
    $.get( "/user/me", function(data) {
      delete data.username;
      var _refs = this.refs;
      _.each(data, function(v, k, l) {
        _refs[k].setValue(v)
      });
      var url = Gravatar.url(data.email, {}, true);
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
    // Submit your validated form
    console.log("Model: ", model)
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
        <Snackbar
          open={this.state.isSnackOpen}
          message={this.state.snackMessage}
          autoHideDuration={this.state.autoHideDuration}
          onActionTouchTap={this._snackAction}
          onRequestClose={this._snackClose}
        />

        <AppBar
          title="Profile"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          showMenuIconButton={false}
        /> 

        <Card>
          <CardHeader
            avatar={<img src={this.state.image}/>} />
          <CardTitle style={{margin:"10px"}} title={this.state.username} subtitle={this.state.email}/>
            <CardActions>
              <FlatButton label="Change" primary={true}/>
            </CardActions>
        </Card>
        <br />

        <Paper zDepth={0}>
          <Formsy.Form
            onValid={this._enableSubmit}
            onInvalid={this._disableSubmit}
            onValidSubmit={this._submitForm} >

           <FormsyText
              ref="firstname"
              fullWidth={true}
              name='firstname'
              validations='isExisty'
              validationError={"Can't be empty"}
              required
              value=""
              floatingLabelText="First name" />
           <br />

           <FormsyText
              ref="lastname"
              fullWidth={true}
              name='lastname'
              validations='isExisty'
              validationError={"Can't be empty"}
              required
              value=""
              floatingLabelText="Last name" />
           <br />

           <FormsyText
              ref="email"
              fullWidth={true}
              name='email'
              validations='isEmail'
              validationError={"Must be an valid email address"}
              required
              value=""
              floatingLabelText="Email address" />
           <br />

           <FormsyText
              ref="password"
              fullWidth={true}
              name='password'
              validations='isExisty'
              validationError={"Can't be empty"}
              value=""
              type="password"
              floatingLabelText="Password" />
           <br />

           <FormsyText
              ref="confirm"
              fullWidth={true}
              name='confirm'
              validations='equalsField:password'
              validationError={"Must be the same as password"}
              type="password"
              value=""
              floatingLabelText="Confirm" />
           <br />

           <RaisedButton
             type="submit"
             label="Save"
             disabled={!this.state.canSubmit} />

          </Formsy.Form>
        </Paper>
      </div>
    )
  }
}
