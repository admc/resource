import React from 'react'

import Snackbar from 'material-ui/lib/snackbar'
import RaisedButton from 'material-ui/lib/raised-button'
import FlatButton from 'material-ui/lib/flat-button'
import styles from 'material-ui'

import {FormsyRadio, FormsyRadioGroup, FormsyText} from 'formsy-material-ui'

import CollectionActions from '../../actions/CollectionActions'

const errorMessages = {
  wordsError: "This field can't be empty."
}

export default class Create extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      canSubmit: false
      , autoHideDuration: 0
      , snackMessage: 'Your collection was created.'
      , isSnackOpen: false
    }
  }

  _change = (state) => {
    this.setState(state)
  };

  _enableSubmit = () => {
    this.setState({ canSubmit: true })
  };
 
  _disableSubmit = () => {
    this.setState({ canSubmit: false })
  };

  _submitForm = (collection) => {
    CollectionActions.createCollection(collection)
    this.refs.collectionForm.reset()
    this._snackOpen()
  };

  _snackAction = () => {
    //Ultimately redirect to new collection, go to list for now
    this.context.router.push('/collection/list')
  };

  _snackClose = () => {
    this.setState({ isSnackOpen: false })
  };

  _snackOpen = () => {
    this.setState({ isSnackOpen: true })
  };

  render() {
    return (
      <div>
        <Snackbar
          open={this.state.isSnackOpen}
          message={this.state.snackMessage}
          action="view"
          autoHideDuration={this.state.autoHideDuration}
          onActionTouchTap={this._snackAction}
          onRequestClose={this._snackClose}
          style={{"position":"absolute"}}
        />

        <Formsy.Form
          ref="collectionForm"
          onValid={this._enableSubmit}
          onInvalid={this._disableSubmit}
          onValidSubmit={this._submitForm} >

         <FormsyText
           autoFocus={true}
           fullWidth={true}
           name='name'
           validations='isExisty'
           validationError={errorMessages.wordsError}
           required
           hintText="Maybe, 'Winter Adventures'..."
           value=""
           floatingLabelText="Name" />
         <br />

         <FormsyText
            fullWidth={true}
            name='description'
            validations='isExisty'
            validationError={errorMessages.wordsError}
            required
            hintText="Maybe, 'All the best ski destinations'..."
            multiLine={true}
            value=""
            rowsMax={2}
            floatingLabelText="Description" />
         <br />

         {/* <FormsyText
            fullWidth={true}
            name='collaborators'
            hintText="username1, username2, username3"
            value=""
            floatingLabelText="Collaborators" />
         <br />
         <br />

          /*<FormsyRadioGroup name="privacy" defaultSelected="public">
            <FormsyRadio
              value="private"
              label="Private" />
            <FormsyRadio
              value="public"
              label="Public" />
          </FormsyRadioGroup>
          */ }

         <br />
         <RaisedButton
           primary={true}
           type="submit"
           style={{textAlign:"center"}}
           label="Create"
           disabled={!this.state.canSubmit} />

         <RaisedButton
           style={{float:"right", textAlign:"center"}}
           secondary={true}
           linkButton={true}
           href="#/collection"
           label="Done" />

        </Formsy.Form>
      </div>
    )
  }
}

Create.contextTypes = {
  router: React.PropTypes.object.isRequired
}
