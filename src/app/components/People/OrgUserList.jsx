import React from 'react'

import Avatar from 'material-ui/lib/avatar'
import Time from 'react-time'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import Divider from 'material-ui/lib/divider'
import {grey400, darkBlack, lightBlack} from 'material-ui/lib/styles/colors'
import Subheader from 'material-ui/lib/Subheader'


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

  render() {
    return (
      <div>
        <List>
          {this.state.organization.users.map(user => {
            return (
              <div>
                <Subheader>{user.usernamename}</Subheader>
                <ListItem
                  leftAvatar={<Avatar src="/images/avatar_placeholder.png" />}
                  primaryText={user.username}
                  secondaryText={
                    <p>
                      {user.firstname} {user.lastname}<br />
                      <span style={{color: darkBlack}}>{user.email}</span><br />
                      Since <Time value={user.created} format="MMMM DD, YYYY" />
                    </p>
                  }
                  secondaryTextLines={2} />

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
