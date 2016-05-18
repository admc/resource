import React from 'react'

import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import Subheader from 'material-ui/Subheader';
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
              <h4>{organization.name} Organization</h4>
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
