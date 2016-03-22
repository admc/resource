import React from 'react'

import GridList from 'material-ui/lib/grid-list/grid-list'
import GridTile from 'material-ui/lib/grid-list/grid-tile'
import IconButton from 'material-ui/lib/icon-button'
import ActionGrade from 'material-ui/lib/svg-icons/action/grade'
import RaisedButton from 'material-ui/lib/raised-button'
import CircularProgress from 'material-ui/lib/circular-progress'

import CollectionStore from '../../stores/CollectionStore'
import CollectionActions from '../../actions/CollectionActions'

const gridListStyle = {width: "100%", height: "100%", overflowY: 'auto', margin: 10};

export default class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = CollectionStore.getState()
  }

  componentDidMount() {
    CollectionStore.listen(this._change)
    CollectionActions.fetchCollections()
  }

  componentWillUnmount() {
    CollectionStore.unlisten(this._change)
  }

  _select = (id) => {
    this.context.router.push('/collection/'+id)
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

    if (this.state.collections.length == 0) {
      return (
        <div>
          You need to <a href="#/projects/create">create some</a>!
        </div>
      )
    }

    if (!this.state.collections || !this.state.collections.map) {
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

          {this.state.collections.map(collection => {
            return (
              <GridTile
                titlePosition="top"
                title={<span style={{cursor:"pointer"}} onClick={this._select.bind(this, collection.id)}>{collection.name}</span>}
                subtitle={<span>by <b>{collection.username}</b></span>}
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
