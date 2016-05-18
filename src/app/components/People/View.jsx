import React from 'react'
import ReactDOM from 'react-dom'

import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import FlatButton from 'material-ui/FlatButton';
import List from 'material-ui/List';;
import ListItem from 'material-ui/List';;

import Gravatar from 'gravatar'

export default class View extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {attributes: [], projects: [], organizations: []}
      , image: '/images/avatar_placeholder.png'
    }
  }

  componentDidMount() {
    var icon = this.refs.icon;
    $.get( "/user/"+this.props.params.userId, function(user) {
      this.setState({user})
      var url = Gravatar.url(user.email, {}, true);
      this.setState({image: url})
    }.bind(this))
  }

  _selectProject = (id) => {
    this.context.router.push('/projects/'+id)
  };

  _selectOrganization = (id) => {
    this.context.router.push('/organizations/'+id)
  };

  render() {
    return (
      <div style={{marginTop:50, width:"100%"}}>
       <Card style={{margin:"10px"}}>
        <CardTitle style={{float:"right"}}
          title={<span style={{fontSize:"16px"}}><strong>{this.state.user.title}</strong></span>}
          subtitle={<span>{this.state.user.department} :: {this.state.user.team}</span>}
        />
        <CardHeader
          title={<span>{this.state.user.firstname} {this.state.user.lastname} ({this.state.user.username})</span>}
          subtitle={<div><a href={"mailto:"+this.state.user.email}>{this.state.user.email}</a></div>}
          avatar={this.state.image}
        />
        <CardActions>
          <FlatButton label="Message" />
          <FlatButton label="Follow" />
        </CardActions>
        <Divider />
        <CardText>
          <div>
            <h4>Organizations ({this.state.user.organizations.length})</h4>
             <List>
              {this.state.user.organizations.map(organization => {
                return (
                  <ListItem
                    onClick={this._selectOrganization.bind(this, organization.id)}
                    primaryText={organization.name} leftIcon={<i className="material-icons">business</i>} />
                )
              })}
            </List>
          </div>
          <div>
            <h4>Attributes ({this.state.user.attributes.length})</h4>
            <List>
              {this.state.user.attributes.map(attribute => {
                return (
                  <ListItem primaryText={attribute.name} leftIcon={<i className="material-icons">loyalty</i>} />
                )
              })}
            </List>
          </div>
          <div>
            <h4>Projects ({this.state.user.projects.length})</h4>
            <List>
            {this.state.user.projects.map(project=> {
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
