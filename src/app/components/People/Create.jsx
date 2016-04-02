import React from 'react'

import Snackbar from 'material-ui/lib/snackbar'
import RaisedButton from 'material-ui/lib/raised-button'
import FlatButton from 'material-ui/lib/flat-button'
import styles from 'material-ui'
import MenuItem from 'material-ui/lib/menus/menu-item'

import {FormsySelect, FormsyRadioGroup, FormsyText} from 'formsy-material-ui'

import ProjectActions from '../../actions/ProjectActions'

const errorMessages = {
  wordsError: "This field can't be empty."
}

const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

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
      , snackMessage: 'Your project was created.'
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

  _submitForm = (project) => {
    console.log(project)
    ProjectActions.createProject(project)
    this.refs.projectForm.reset()
    this._snackOpen()
  };

  _snackAction = () => {
    //Ultimately redirect to new collection, go to list for now
    this.context.router.push('/projects')
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

         <FormsySelect
           name='quarter'
           style={pStyle}
           required
           floatingLabelText="Target Quarter">
           <MenuItem value={'q1'} primaryText="Q1" />
           <MenuItem value={'q2'} primaryText="Q2" />
           <MenuItem value={'q3'} primaryText="Q3" />
           <MenuItem value={'q4'} primaryText="Q4" />
        </FormsySelect>
 
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

         <FormsyText
            name='lead'
            validations='isExisty'
            validationError={errorMessages.wordsError}
            hintText="Who is the engineering lead?"
            value=""
            style={{float:"left"}}
            floatingLabelText="Engineering Lead" />

         <FormsyText
            name='pm'
            validations='isExisty'
            validationError={errorMessages.wordsError}
            hintText="Who is the product manager?"
            value=""
            style={pStyle}
            floatingLabelText="Product Manager" />

         <FormsyText
            name='stakeholders'
            validations='isExisty'
            validationError={errorMessages.wordsError}
            hintText="List the stakeholders"
            value=""
            style={pStyle}
            floatingLabelText="Stakeholders" />
         <br />

         <FormsyText
            fullWidth={true}
            name='spec'
            validations='isExisty'
            validationError={errorMessages.wordsError}
            hintText="Please provide a link to the product specification"
            value=""
            floatingLabelText="Product Specification" />
         <br />

         <FormsyText
            fullWidth={true}
            name='epic'
            validations='isExisty'
            validationError={errorMessages.wordsError}
            hintText="Please provide a link to the JIRA Epic"
            value=""
            floatingLabelText="Jira Epic" />
         <br />

         <FormsyText
            fullWidth={true}
            name='notes'
            validations='isExisty'
            validationError={errorMessages.wordsError}
            hintText="Please provide a link to the engineering notes document"
            value=""
            floatingLabelText="Eng Notes" />
         <br />

         <br />
         <RaisedButton
           primary={true}
           type="submit"
           style={{float:"right", textAlign:"center"}}
           label="Create"
           disabled={!this.state.canSubmit} />
        </Formsy.Form>
      </div>
    )
  }
}

Create.contextTypes = {
  router: React.PropTypes.object.isRequired
}
