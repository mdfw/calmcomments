import { connect } from 'react-redux';
import React from 'react';
import { darkBlack, grey400, grey100, grey500, white, grey300, fullBlack } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { fade } from 'material-ui/utils/colorManipulator';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SocketConnection from './socketConnection';
import Header from '../components/Header';

const snsTheme = getMuiTheme({
  fontFamily: 'Open Sans, sans-serif',
  palette: {
    primary1Color: '#2DB3FF',
    primary2Color: '#735899',
    primary3Color: grey400,
    accent1Color: '#cc7a10',
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: darkBlack,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: '#2d47ff',
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
  appBar: {
    height: 50,
  },
  raisedButton: {
    disabledColor: grey300,
  },
  overlay: {
    backgroundColor: '#2d47ff',
  },
});


class App extends React.Component {
  componentDidMount() {
    const theSocket = SocketConnection(this.props.dispatch);
    this.io = theSocket;
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={snsTheme}>
        <div id="mainapp">
          <Header urlPath={this.props.urlPath} />
          <div className="content">
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
  dispatch: React.PropTypes.func.isRequired,
  urlPath: React.PropTypes.string,
};
App.defaultProps = {
  children: {},
  urlPath: '',
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state, ownprops) {
  return {
    children: ownprops.children,
    urlPath: ownprops.location.pathname,
  };
};

const Container = connect(mapStateToProps)(App);

export default Container;
