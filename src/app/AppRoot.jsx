import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './components/Routes.jsx'
import Header from './components/Header.jsx'
import Navigation from './components/Navigation.jsx'
import Footer from './components/Footer.jsx'

//Theme
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme'
import MaterialTheme from './config/theme';

var injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

class AppRoot extends React.Component {

  constructor(props) {
    super(props)
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme(MaterialTheme)
    }
  }

  render() {
    return (
      <div>
        <div className="demo-layout-transparent mdl-layout mdl-js-layout">
          <Header/>
          <Navigation/>
          <main className="mdl-layout__content">
            <section className="section--center mdl-grid mdl-grid--no-spacing">
              <div className="mdl-card mdl-cell mdl-cell--12-col">
                <div className="mdl-card__supporting-text mdl-grid mdl-grid--no-spacing">
                  {this.props.children}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    )
  }
}

AppRoot.childContextTypes = {
  muiTheme: React.PropTypes.object
}

ReactDOM.render(<Routes AppRoot={AppRoot} />, document.getElementById('app-root'))
