import React from 'react'

export default class Footer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className="mdl-mini-footer">
        <div className="mdl-mini-footer__left-section">
          <div className="mdl-logo">Wild © 2016</div>
          <ul className="mdl-mini-footer__link-list">
            <li><a href="#">About</a></li>
            <li><a href="#">Privacy & Terms</a></li>
          </ul>
        </div>
      </footer>
    )
  }
}

Footer.contextTypes = {
  router: React.PropTypes.object.isRequired
}
