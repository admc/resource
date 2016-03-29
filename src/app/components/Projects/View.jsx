import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router'
import {FormsyText} from 'formsy-material-ui'
import RaisedButton from 'material-ui/lib/raised-button'

import ProjectStore from '../../stores/ProjectStore'
import ProjectActions from '../../actions/ProjectActions'

export default class View extends React.Component {

  constructor(props) {
    super(props)
    this.state = {project: {}, canSubmit: false}
  }

  componentDidMount() {
    $.get( "/project/"+this.props.params.projectId, function(project) {
      this.setState({project})
    }.bind(this))
  }

  _enableSubmit = () => {
    this.setState({ canSubmit: true })
  };
 
  _disableSubmit = () => {
    this.setState({ canSubmit: false })
  };

  _submitForm = (update) => {
    console.log(update)
  };

  render() {

    return (
      <div>
        <div style={{fontSize:"10px", float:"right"}}>
          Created on {this.state.project.created} by <a href="">{this.state.project.username}</a>
        </div>

        <h4>{this.state.project.name}</h4>
        <div>This project is slated for {this.state.project.quarter} in {this.state.project.year}.</div>
        <div>With the identified stakeholders {this.state.project.stakeholders}.</div>
        <br />

        <div><strong>Engineering Lead:</strong> {this.state.project.lead}</div>
        <div><strong>Product Manager:</strong> {this.state.project.pm}</div>
        <br></br>
        <div><strong>Description:</strong> {this.state.project.description}</div>
        <br />

        <div>
          <strong>Links</strong>
          <ul>
            <li>Specification: <a href="">{this.state.project.spec}</a></li>
            <li>Epic: <a href="">{this.state.project.epic}</a></li>
            <li>Engineering Notes: <a href="">{this.state.project.notes}</a></li>
          </ul>
        </div>
        <br />
        <div>
          <Formsy.Form ref="updateForm"
            onValid={this._enableSubmit}
            onInvalid={this._disableSubmit}
            onValidSubmit={this._submitForm}>

            <FormsyText
              validations='isExisty'
              fullWidth={true}
              name='text'
              hintText="Submit an updated status report"
              multiLine={true}
              value=""
              rowsMax={3}
              floatingLabelText="New Update" />
              <br />

            <RaisedButton
              primary={true}
              type="submit"
              style={{float:"right", textAlign:"center"}}
              label="Submit"
              disabled={!this.state.canSubmit} />
        
              <h5>Updates</h5>
              <div>{this.state.project.updates || "No Updates yet"}</div>
            </Formsy.Form>
        </div>
      </div>
    )
  }
}

View.contextTypes = {
  router: React.PropTypes.object.isRequired
}
