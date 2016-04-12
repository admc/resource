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
import CardMedia from 'material-ui/lib/card/card-media';
import CardText from 'material-ui/lib/card/card-text';

import FlatButton from 'material-ui/lib/flat-button'
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

import Gravatar from 'gravatar'
import _ from 'underscore'

export default class View extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      organization: {users: [], projects: []}
    }
  }

  componentDidMount() {
    var icon = this.refs.icon;
    $.get( "/organization/"+this.props.params.organizationId, function(organization) {
      this.setState({organization})
    }.bind(this))
  }

  _selectProject = (id) => {
    this.context.router.push('/projects/'+id)
  };

  _selectUser = (id) => {
    this.context.router.push('/people/'+id)
  };

  render() {
    return (
      <div style={{marginTop:50, width:"100%"}}>
       <Card style={{margin:"10px"}}>
        <CardTitle style={{float:"right"}}
          title={<span style={{fontSize:"16px"}}>{this.state.organization.created}</span>}
          subtitle={<span>{this.state.organization.url}</span>}
        />
        <CardHeader
          title={<h4>{this.state.organization.name}</h4>}
          subtitle={<div>{this.state.organization.description}</div>}
        />
        <CardActions>
          <FlatButton label="Message" />
          <FlatButton label="Follow" />
        </CardActions>
        <Divider />
        <CardText>
          <div>
            <h4>Users ({this.state.organization.users.length})</h4>
            <List>
              {this.state.organization.users.map(user => {
                return (
                  <ListItem
                    onClick={this._selectUser.bind(this, user.id)}
                    primaryText={user.username} leftIcon={<i className="material-icons">person</i>} />
                )
              })}
            </List>
          </div>
          <div>
            <h4>Projects ({this.state.organization.projects.length})</h4>
            <List>
            {this.state.organization.projects.map(project=> {
              return (
                <ListItem
                  onClick={this._selectProject.bind(this, project.id)}
                  primaryText={project.name} leftIcon={<i className="material-icons">description</i>} />
              )
            })}
            </List>
          </div>
        </CardText>
      </Card>
      </div>
    )
  }
}

View.contextTypes = {
  router: React.PropTypes.object.isRequired
}
