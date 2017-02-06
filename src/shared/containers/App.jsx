import { connect } from 'react-redux';
import React from 'react';
import { darkBlack, grey400, grey100, grey500, white, grey300, fullBlack } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { fade } from 'material-ui/utils/colorManipulator';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SocketConnection from './socketConnection';

const snsTheme = getMuiTheme({
  fontFamily: 'Open Sans, sans-serif',
  palette: {
    primary1Color: '#459691',
    primary2Color: '#47ad8a',
    primary3Color: grey400,
    accent1Color: '#c94f49',
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: darkBlack,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: '#459691',
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
    backgroundColor: '#4376a3',
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
};
App.defaultProps = {
  children: {},
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state, ownprops) {
  return {
    children: ownprops.children,
  };
};

const Container = connect(mapStateToProps)(App);

export default Container;
