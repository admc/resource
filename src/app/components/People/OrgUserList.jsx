import React from 'react'

import Avatar from 'material-ui/Avatar';
import Time from 'react-time'
import List from 'material-ui/List';
import ListItem from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';


import Gravatar from 'gravatar'

export default class OrgUserList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {organization: {users: [], projects: []}}
    window.state = this.state;
  }

  componentDidMount() {
    $.get( "/organization/"+this.props.organizationId, function(organization) {
      this.setState({organization});
    }.bind(this))
  }

  _select = (id) => {
    this.context.router.push('/people/'+id)
  };

  render() {
    return (
      <div>
        <List>
          {this.state.organization.users.map(user => {
            return (
              <div>
                <Subheader>{user.usernamename}</Subheader>
                <ListItem
                  onClick={this._select.bind(this, user.id)}
                  leftAvatar={<Avatar src="/images/avatar_placeholder.png" />}
                  primaryText={<span>{user.firstname} {user.lastname} ({user.username})</span>}
                  secondaryText={
                    <p>
                      <span style={{color: "black"}}>{user.email}</span><br />
                      Since <Time value={user.created} format="MMMM DD, YYYY" />
                    </p>
                  }
                  secondaryTextLines={2}>
                  <div style={{float:"right"}}>{user.department.toUpperCase()} <br />{user.team} team</div>
                  </ListItem>

                <Divider inset={true} />
              </div>
            )
          })}
        </List>
      </div>
    )
  }
}

OrgUserList.contextTypes = {
  router: React.PropTypes.object.isRequired
}
