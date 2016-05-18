import React from 'react'

import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import ProjectStore from '../../stores/ProjectStore'
import ProjectActions from '../../actions/ProjectActions'

const gridListStyle = {width: "100%", height: "100%", overflowY: 'auto', margin: 10};

export default class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = ProjectStore.getState()
  }

  componentDidMount() {
    ProjectStore.listen(this._change)
    ProjectActions.fetchProjects()
  }

  componentWillUnmount() {
    ProjectStore.unlisten(this._change)
  }

  _select = (id) => {
    this.context.router.push('/projects/'+id)
  };

  _change = (state) => {
    this.setState(state)
  };

  render() {
   if (this.state.errorMessage) {
      return (
        <div>Something is wrong...</div>
      );
    }

    if (this.state.projects.length == 0) {
      return (
        <div>
          You need to <a href="#/projects/create">create some</a>!
        </div>
      )
    }

    if (!this.state.projects || !this.state.projects.map) {
      return (
        <div>
          <CircularProgress mode="indeterminate" size={1.5}/>
        </div>
      )
    }

    return (
     <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
        <GridList
          cols={3}
          cellHeight={100}
          padding={5}
          style={gridListStyle}>

          {this.state.projects.map(project => {
            return (
              <GridTile
                titlePosition="top"
                title={<span style={{cursor:"pointer"}} onClick={this._select.bind(this, project.id)}>{project.name}</span>}
                subtitle={<span>by <b>{project.username}</b></span>}
                actionIcon={<IconButton></IconButton>}
                >
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
