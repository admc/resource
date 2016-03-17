import React from 'react'
import { hashHistory, Router, Route, Link, IndexRoute, Redirect } from 'react-router'
import Profile from './Profile.jsx'
import Home from './Home.jsx'
import Collection from './Collection'
import Experience from './Experience'
 
export default class Routes extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={this.props.AppRoot}>
          <IndexRoute component={Home}/>
          <Route path="/home" component={Home} />
          <Route path="/profile" component={Profile} />

          <Route path="/collection" component={Collection.Container}>
            <IndexRoute component={Collection.List}/>
            <Route path="/collection/list" component={Collection.List} />
            <Route path="/collection/create" component={Collection.Create} />
            <Route path="/collection/:collectionId" component={Collection.View}/>
          </Route>

          <Route path="/experience" component={Experience.Container}>
            <IndexRoute component={Experience.List}/>
            <Route path="/experience/list" component={Experience.List} />
            <Route path="/experience/create" component={Experience.Create} />
            <Route path="/experience/create/:collectionId" component={Experience.Create} />
            <Route path="/experience/:experienceId" component={Experience.View}/>
          </Route>

          <Route path="*" component={Home}/>
        </Route>
      </Router>
    )
  }
}
