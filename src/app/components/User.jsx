import React from 'react'

import Avatar from 'material-ui/Avatar'
import Badge from 'material-ui/Badge'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'

import Gravatar from 'gravatar'

const style = {
  marginLeft: 20
}

export default class User extends React.Component {

  constructor(props) {
    super(props)
    this.state = {icon: '/images/avatar_placeholder.png'}
  }

  componentDidMount() {
    $.get( "/user/me", function(data) {
      this.setState(data);
      var url = Gravatar.url(data.email, {}, true);
      this.setState({icon: url})
    }.bind(this))
  }

  logout = (e) =>  {
    window.location.href = '/user/logout'
  };

  handleProfile = (e) => {
    e.preventDefault();
    this.context.router.push('/profile')
  };

  _conversationLink = (e) => {
    e.preventDefault();
    this.context.router.push('/conversation')
  };

  show(key, e) {
    this.setState({
      activePopover: key
      , anchorEl: e.currentTarget
    })
  }

  closePopover(key) {
    if (this.state.activePopover == key) {
      this.setState({
        activePopover: 'none'
      })
    }
  }

  setAnchor(positionElement, position, e) {
    let {anchorOrigin} = this.state;
    anchorOrigin[positionElement] = position;

    this.setState({
      anchorOrigin: anchorOrigin
    })
  }

  setTarget(positionElement, position, e) {
    let {targetOrigin} = this.state;
    targetOrigin[positionElement] = position;

    this.setState({
      targetOrigin: targetOrigin
    })
  }

  render() {
    return (
      <div>
        <Avatar
          onClick={this.show.bind(this, "pop")}
          size={this.props.size || 50}
          style={{cursor:"pointer"}} 
          src={this.state.icon} >
      <Badge
        badgeStyle={{top:"", right:"0px", left:"0px", bottom:"8px"}}
        badgeContent={4}
        primary={true}
        onClick={this._conversationLink}>
      </Badge>
      </Avatar>

        <Popover open={this.state.activePopover === 'pop'}
          anchorEl={this.state.anchorEl}
          anchorOrigin={this.state.anchorOrigin}
          targetOrigin={this.state.targetOrigin}
          onRequestClose={this.closePopover.bind(this, 'pop')} >

          <div>
            <Menu>
              <MenuItem primaryText="Profile" onClick={this.handleProfile}/>
              <MenuItem primaryText="Settings" />
              <MenuItem primaryText="Logout" onClick={this.logout} />
            </Menu>
          </div>
        </Popover>

      </div>
    )
  }
}

User.contextTypes = {
  router: React.PropTypes.object.isRequired
}
