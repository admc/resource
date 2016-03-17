import React from 'react'
import Avatar from 'material-ui/lib/avatar'
import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardHeader from 'material-ui/lib/card/card-header'
import CardMedia from 'material-ui/lib/card/card-media'
import CardTitle from 'material-ui/lib/card/card-title'
import FlatButton from 'material-ui/lib/flat-button'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import CardText from 'material-ui/lib/card/card-text'
import _ from 'lodash'

import ExperienceStore from '../../stores/ExperienceStore'
import ExperienceActions from '../../actions/ExperienceActions'

export default class ExperienceView extends React.Component {

  constructor(props) {
    super(props)
    this.state = {experience: {}, collection: {}}
  }

  componentDidMount() {
    $.get( "/experience/"+this.props.params.experienceId, function(experience) {
      this.setState({experience: experience});
      
      $.get( "/collection/"+data.collectionId, function(collection) {
        this.setState({collection: collection})
      }.bind(this))

    }.bind(this))
  }

  render() {

    return (
      <Card>
        <CardMedia overlay={<CardTitle title={this.state.experience.name} subtitle={this.state.experience.location}/>}>
          <img style={{maxHeight:"250px"}} src="/images/bg/turq_gradient.jpg"/>
        </CardMedia>
        <CardText>
          <FloatingActionButton style={{float:"right"}}>
            <i className="material-icons">star_rate</i>
          </FloatingActionButton>

          Originally created by {this.state.experience.username} and stashed in the collection {this.state.collection.name}.
          This experience exists currently in x number of collections.

          {this.state.experience.description}
        </CardText>
        <CardHeader
          title={this.state.experience.url}
          subtitle={this.state.experience.meta}
          avatar={<Avatar style={{color: 'red'}}>A</Avatar>}/>
        <CardActions>
          <FlatButton label="I completed this experience!"/>
          <FlatButton label="Add to collection"/>
        </CardActions>
        <CardText>
          Comments go here
        </CardText>
      </Card>
    )
  }
}

ExperienceView.contextTypes = {
  router: React.PropTypes.object.isRequired
}
