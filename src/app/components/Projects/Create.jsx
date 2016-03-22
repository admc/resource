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

var pStyle = {
  float:"left"
  , marginLeft:"10px"
};

var getQuarter = function(d) {
  d = d || new Date();
  var m = Math.floor(d.getMonth()/3) + 2;
  return m > 4? m - 4 : m;
}

var currentYear = new Date().getFullYear();
var currentMonth = new Date().getMonth();
var currentQuarter = getQuarter();

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
          ref="projectForm"
          onValid={this._enableSubmit}
          onInvalid={this._disableSubmit}
          onValidSubmit={this._submitForm} >

         <FormsyText
           autoFocus={true}
           name='name'
           validations='isExisty'
           validationError={errorMessages.wordsError}
           required
           hintText="Name the project?"
           value=""
           style={{float:"left"}}
           floatingLabelText="Project Name" />

         <FormsyText
            name='year'
            validations='isExisty'
            validationError={errorMessages.wordsError}
            hintText="What year?"
            value={currentYear}
            style={pStyle}
            floatingLabelText="Target Year" />
         
         <FormsyText
            name='quarter'
            validations='isExisty'
            validationError={errorMessages.wordsError}
            hintText="Slated for which quarter?"
            value={currentQuarter}
            style={pStyle}
            floatingLabelText="Target Quarter" />
         <br />

         <FormsyText
            fullWidth={true}
            name='description'
            validations='isExisty'
            validationError={errorMessages.wordsError}
            hintText="Describe the goals the project hopes to achieve."
            multiLine={true}
            value=""
            rowsMax={3}
            floatingLabelText="Description" />
         <br />

         <FormsyText
            fullWidth={true}
            name='epic'
            validations='isExisty'
            validationError={errorMessages.wordsError}
            hintText="Please provide a link to the JIRA Epic"
            value=""
            rowsMax={2}
            floatingLabelText="Epic" />
         <br />

         <FormsyText
            fullWidth={true}
            name='spec'
            validations='isExisty'
            validationError={errorMessages.wordsError}
            hintText="Please provide a link to the product specification"
            value=""
            rowsMax={2}
            floatingLabelText="Specification" />
         <br />

         <FormsyText
            fullWidth={true}
            name='notes'
            validations='isExisty'
            validationError={errorMessages.wordsError}
            hintText="Please provide a link to the engineering notes document"
            value=""
            rowsMax={2}
            floatingLabelText="Notes" />
         <br />


         <FormsyText
            fullWidth={true}
            name='lead'
            validations='isExisty'
            validationError={errorMessages.wordsError}
            hintText="Who is the engineering lead on the project?"
            value=""
            rowsMax={2}
            floatingLabelText="Engineering Lead" />
         <br />

         <FormsyText
            fullWidth={true}
            name='pm'
            validations='isExisty'
            validationError={errorMessages.wordsError}
            hintText="Who is the product manager for the project?"
            value=""
            rowsMax={2}
            floatingLabelText="Product Manager" />
         <br />

         <FormsyText
            fullWidth={true}
            name='stakeholders'
            validations='isExisty'
            validationError={errorMessages.wordsError}
            hintText="List the non product/engineering stakeholders"
            value=""
            rowsMax={2}
            floatingLabelText="Stakeholders" />
         <br />

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
