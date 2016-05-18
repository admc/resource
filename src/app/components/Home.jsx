import React from 'react'
import {List, ListItem} from 'material-ui/List'
import  _ from 'lodash'
 
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {projects: [], user: {}, organizations: []}
  }

  componentDidMount() {
    var _this = this;

    $.get("/user/me", function(user) {
      _this.setState({user});
      $.get("/project/user/"+user.id, function(projects) {
        _.forEach(projects, function(v, k) {
          $.get( "/project/"+v.id, function(project) {
            var state = _this.state;
            state.projects.push(project)
            _this.setState(state)
          })
        })
      })

      _(user.organizations).forEach(function(org) {
        $.get( "/organization/"+org.id, function(organization) {
          var organizations = _this.state.organizations;
          organizations.push(organization);
          _this.setState({organizations});
        })
      })
    })
  }

  render() {
    return (
      <div>
        <h4>My Role</h4>
        Hey {this.state.user.firstname}, looks like you are a {this.state.user.title} working in the {this.state.user.department} department on the {this.state.user.team} team.

        <h4>My Organizations ({this.state.organizations.length})</h4>
        {this.state.organizations.map(organization => {
          return (
            <div>
              {organization.name}
            </div>
          )
        })}

        <h4>My Projects ({this.state.projects.length})</h4>
        <List>
        {this.state.projects.map(project => {
          return (
            <ListItem
              primaryText={project.name}
              leftIcon={<i className="material-icons">description</i>}
            />
          )
        })}
        </List>

      </div>
    )
  }
}
