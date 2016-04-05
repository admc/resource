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
              {this.state.user.organizations.map(org => {
                return (
                  <ListItem primaryText={org.name} leftIcon={<i className="material-icons">business</i>} />
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
