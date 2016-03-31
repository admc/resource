import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router'
import {FormsyText} from 'formsy-material-ui'
import RaisedButton from 'material-ui/lib/raised-button'
import Tabs from 'material-ui/lib/tabs/tabs'
import Tab from 'material-ui/lib/tabs/tab'
import Paper from 'material-ui/lib/paper'
import Avatar from 'material-ui/lib/avatar'
import Time from 'react-time'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import Divider from 'material-ui/lib/divider'
import Subheader from 'material-ui/lib/Subheader'
import {grey400, darkBlack, lightBlack} from 'material-ui/lib/styles/colors'


import ProjectStore from '../../stores/ProjectStore'
import ProjectActions from '../../actions/ProjectActions'

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

export default class View extends React.Component {

  constructor(props) {
    super(props)
    this.state = {project: {users: [], updates: []}, canSubmit: false}
  }

  componentDidMount() {
    $.get( "/project/"+this.props.params.projectId, function(project) {
      console.log(project)
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
    var _this = this;
    update.projectId = this.state.project.id;

    $.post( "/update/create", update, function(result) {
      console.log(result)
      _this.refs.updateForm.reset()
    });
  };

  render() {

    return (
      <div>
        <div style={{fontSize:"12px", float:"right"}}>
          Created on <Time value={this.state.project.created} format="MMMM DD, YYYY" />&nbsp;
           by <a href="">{this.state.project.username}</a>
        </div>

        <h4>{this.state.project.name}</h4>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}>

          <Tab label="Overview" value="a" >
            <div style={{padding:"10px"}}>
              <div>This project is slated for {this.state.project.quarter} in {this.state.project.year}.</div>
              <div>With the identified stakeholders {this.state.project.stakeholders}.</div>
              <br />
              <div><strong>Engineering Lead:</strong> {this.state.project.lead}</div>
              <div><strong>Product Manager:</strong> {this.state.project.pm}</div>
              <div>
                <h4>Team</h4>
                {this.state.project.users.map(user => {
                  return (<a style={{margin:"2px"}} href={"#/users/"+user.username} title={user.username}><Avatar src="/images/avatar_placeholder.png" /></a>)
                })}
              </div>
              <br></br>
              <div><h4>Description</h4> {this.state.project.description}</div>

              <div>
                <h4>Links</h4>
                <ul>
                  <li>Specification: <a href="">{this.state.project.spec}</a></li>
                  <li>Epic: <a href="">{this.state.project.epic}</a></li>
                  <li>Engineering Notes: <a href="">{this.state.project.notes}</a></li>
                </ul>
              </div>
              <br />
              <div>
              </div>
            </div>
          </Tab>
          <Tab label="Activity Feed" value="b">
            <div style={{padding:"10px"}}>
              <Paper zDepth={1} style={{margin:"2px", padding:"5px"}}>
              <Formsy.Form ref="updateForm"
                onValid={this._enableSubmit}
                onInvalid={this._disableSubmit}
                onValidSubmit={this._submitForm}>

                <FormsyText
                  validations='isWords'
                  validationError={{wordsError: "Please only use letters"}}
                  required
                  fullWidth={true}
                  name='text'
                  multiLine={true}
                  value=""
                  rowsMax={3}
                  floatingLabelText="Write a detailed progress update." />

                <RaisedButton
                  primary={true}
                  style={{float:"right"}}
                  type="submit"
                  label="Submit"
                  disabled={!this.state.canSubmit} />
              </Formsy.Form>
              <div style={{clear:"both"}} />
              </Paper>
              <br /><br />

              <h5>Updates</h5>
              <Paper zDepth={1} style={{margin:"2px", padding:"5px"}}>
                <div>
                    <List>
                      {this.state.project.updates.reverse().map(update => {
                        return (
                          <div>
                            <Subheader><Time value={update.created} format="MMMM DD, YYYY -- hh:mm" /></Subheader>
                            <ListItem
                              leftAvatar={<Avatar src="/images/avatar_placeholder.png" />}
                              primaryText="Project Update"
                              secondaryText={
                                <p>
                                  <span style={{color: darkBlack}}>{update.username}</span> -- &nbsp;
                                  {update.text} 
                                </p>
                              }
                              secondaryTextLines={2} />
                            <Divider inset={true} />
                          </div>
                        )
                      })}
                    </List>
                </div>
              </Paper>
            </div>
          </Tab>
        </Tabs>
      </div>
    )
  }
}

View.contextTypes = {
  router: React.PropTypes.object.isRequired
}
