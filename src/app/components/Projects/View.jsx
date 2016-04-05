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
import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardHeader from 'material-ui/lib/card/card-header'
import CardTitle from 'material-ui/lib/card/card-title';
import CardMedia from 'material-ui/lib/card/card-media';
import CardText from 'material-ui/lib/card/card-text';
import FlatButton from 'material-ui/lib/flat-button'
import FontIcon from 'material-ui/lib/font-icon';

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
    this.state = {project: {users: [], updates: [], stakeholders: []}, canSubmit: false}
  }

  componentDidMount() {
    $.get( "/project/"+this.props.params.projectId, function(project) {
      this.setState({project})
    }.bind(this))
  }

  _submitForm = (update) => {
    var _this = this;
    update.projectId = this.state.project.id;

    $.post( "/update/create", update, function(result) {
      _this.refs.updateForm.reset()
    });
  };

  render() {

    return (
      <div>
       <Card style={{margin:"10px"}}>
        <CardHeader style={{float:"right"}}
          title={<span>Created on <Time value={this.state.project.created} format="MMMM DD, YYYY" /></span>}
          subtitle={<span>by <a href={"#/people/"+this.state.project.username}>{this.state.project.username}</a></span>}
        />
        <CardTitle
          title={this.state.project.name}
          subtitle={<div>Slated for {this.state.project.quarter} in {this.state.project.year}.</div>}
        />
        <CardActions>
          <FlatButton label="Follow" />
        </CardActions>
        <Divider />
        <CardText>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}>

            <Tab label="Overview" value="a">
              <div style={{padding:"10px"}}>
                <div style={{float:"right"}}><strong>Status</strong> - {this.state.project.status}</div>
                <div><strong>Engineering Lead</strong> - {this.state.project.lead}</div>
                <div><strong>Product Manager</strong> - {this.state.project.pm}</div>
                <div><strong>Stakeholders</strong> - {this.state.project.stakeholders.join(', ')}</div>
                <div>
                  <h4>Team</h4>
                  {this.state.project.users.map(user => {
                    return (<a style={{margin:"2px"}} href={"#/people/"+user.id} title={user.username}><Avatar src="/images/avatar_placeholder.png" /></a>)
                  })}
                </div>
                <br></br>
                <div><h4>Description</h4> {this.state.project.description}</div>

                <div>
                  <h4>Links</h4>
                  <List>
                    <ListItem primaryText={<span>Specification - <a href="">{this.state.project.spec}</a></span>} leftIcon={<i className="material-icons">link</i>} />
                    <ListItem primaryText={<span>Epic - <a href="">{this.state.project.epic}</a></span>} leftIcon={<i className="material-icons">link</i>} />
                    <ListItem primaryText={<span>Engineering Notes - <a href="">{this.state.project.notes}</a></span>} leftIcon={<i className="material-icons">link</i>} />
                  </List>
                </div>
                <br />
                <div>
                </div>
              </div>
            </Tab>
            <Tab label="Activity Feed" value="b" >
              <div style={{padding:"10px"}}>
                <Formsy.Form ref="updateForm"
                  onValidSubmit={this._submitForm}>

                  <FormsyText
                    validations='isWords'
                    fullWidth={true}
                    name='text'
                    multiLine={true}
                    value=""
                    rowsMax={10}
                    floatingLabelText="Write a detailed progress update." />

                  <RaisedButton
                    primary={true}
                    style={{float:"right"}}
                    type="submit"
                    label="Submit"
                    />
                </Formsy.Form>
                <div style={{clear:"both"}} />
                <br /><br />

                <h5>Updates</h5>
                  <div>
                      <List>
                        {this.state.project.updates.reverse().map(update => {
                          return (
                            <div>
                              <Subheader><Time value={update.created} format="MMMM DD, YYYY -- hh:mm a" /></Subheader>
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
                            </div>
                          )
                        })}
                      </List>
                  </div>
              </div>
            </Tab>
          </Tabs>
        </CardText>
      </Card>
      </div>
    )
  }
}

View.contextTypes = {
  router: React.PropTypes.object.isRequired
}
