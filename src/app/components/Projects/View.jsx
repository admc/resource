import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router'

import CollectionStore from '../../stores/CollectionStore'
import CollectionActions from '../../actions/CollectionActions'

export default class View extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    $.get( "/collection/"+this.props.params.collectionId, function(data) {
      this.setState(data)
    }.bind(this))
  }

  render() {

    return (
      <div>
      {this.state.name}<br />
      <Link to={"/experience/create/"+this.state.id}>Create Experience</Link>
      </div>
    )
  }
}

View.contextTypes = {
  router: React.PropTypes.object.isRequired
}
