import React from 'react'

import GridList from 'material-ui/lib/grid-list/grid-list'
import GridTile from 'material-ui/lib/grid-list/grid-tile'
import IconButton from 'material-ui/lib/icon-button'
import FontIcon from 'material-ui/lib/font-icon'
import ActionGrade from 'material-ui/lib/svg-icons/action/grade'
import RaisedButton from 'material-ui/lib/raised-button'
import CircularProgress from 'material-ui/lib/circular-progress'

import ExperienceStore from '../../stores/ExperienceStore'
import ExperienceActions from '../../actions/ExperienceActions'

const gridListStyle = {width: "100%", height: "100%", overflowY: 'auto', margin: 10};

export default class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = ExperienceStore.getState()
  }

  componentDidMount() {
    ExperienceStore.listen(this._change)
    ExperienceActions.getExperiences()
  }

  componentWillUnmount() {
    ExperienceStore.unlisten(this._change)
  }

  _change = (state) => {
    this.setState(state)
  };

  _select = (id) => {
    this.context.router.push('/experience/'+id)
  };


  render() {
   if (this.state.errorMessage) {
      return (
        <div>Something is wrong</div>
      );
    }

    if (this.state.experiences.length == 0) {
      return (
        <div>
          You need to <a href="#/experience/create">create some</a> experiences!
        </div>
      )
    }

    if (!this.state.experiences || !this.state.experiences.map) {
      return (
        <div>
          <CircularProgress mode="indeterminate" size={1.5}/>
        </div>
      )
    }

    return (
     <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
        <GridList
          cols={2}
          cellHeight={100}
          padding={5}
          style={gridListStyle}>

          {this.state.experiences.map(experience => {
            return (
              <GridTile
                title={experience.name}
                titlePosition="top"
                title={<span style={{cursor:"pointer"}} onClick={this._select.bind(this, experience.id)}>{experience.name}</span>}
                subtitle={<span>by <b>{experience.username}</b></span>}
                actionIcon={<FontIcon className="material-icons md-light" style={{color:"white"}}>more_vert</FontIcon>}>
                <img src={"/images/bg/experience_grid.jpg"} />
              </GridTile>
            );
          })}

        </GridList>
      </div>
    )
  }
}

List.contextTypes = {
  router: React.PropTypes.object.isRequired
}
