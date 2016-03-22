import React from 'react'
import { hashHistory, Router, Route, Link, IndexRoute, Redirect } from 'react-router'
import Profile from './Profile.jsx'
import Home from './Home.jsx'
import Projects from './Projects'
 
export default class Routes extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={this.props.AppRoot}>
          <IndexRoute component={Home}/>
          <Route path="/home" component={Home} />
          <Route path="/profile" component={Profile} />

          <Route path="/projects" component={Projects.Container}>
            <IndexRoute component={Projects.List}/>
            <Route path="/projects/list" component={Projects.List} />
            <Route path="/projects/create" component={Projects.Create} />
            <Route path="/projects/:projectsId" component={Projects.View}/>
          </Route>

          <Route path="*" component={Home}/>
        </Route>
      </Router>
    )
  }
}
