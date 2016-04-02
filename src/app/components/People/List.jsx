import React from 'react'

import GridList from 'material-ui/lib/grid-list/grid-list'
import GridTile from 'material-ui/lib/grid-list/grid-tile'
import IconButton from 'material-ui/lib/icon-button'
import ActionGrade from 'material-ui/lib/svg-icons/action/grade'
import RaisedButton from 'material-ui/lib/raised-button'
import CircularProgress from 'material-ui/lib/circular-progress'
import Subheader from 'material-ui/lib/Subheader'
import _ from 'lodash'

import OrgUserList from './OrgUserList.jsx'

const gridListStyle = {width: "100%", height: "100%", overflowY: 'auto', margin: 10};

export default class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {organizations: [], user: {}}
  }

  componentDidMount() {
    $.get( "/user/me", function(user) {
      this.setState({user});

      _(user.organizations).forEach(function(org) {
        $.get( "/organization/"+org.id, function(organization) {
          var organizations = this.state.organizations;
          organizations.push(organization);
          this.setState({organizations});
        }.bind(this))
      }.bind(this))
    }.bind(this))
  }

  render() {
   if (this.state.errorMessage) {
      return (
        <div>Something is wrong...</div>
      );
    }

    if (!this.state.organizations || !this.state.organizations.map) {
      return (
        <div>
          <CircularProgress mode="indeterminate" size={1.5}/>
        </div>
      )
    }

    return (
     <div>
        {this.state.organizations.map(organization => {
          return (
            <div>
              <h4>{organization.name}</h4>
              <OrgUserList organizationId={organization.id} />
            </div>
          )
        })}
      </div>
    )
  }
}

List.contextTypes = {
  router: React.PropTypes.object.isRequired
}
