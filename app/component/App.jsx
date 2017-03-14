import React, { Component } from 'react';
import { connect } from 'react-redux';

import WordCard from './WordCard.jsx';
import { chooseWord } from '../action';

class App extends Component {
  componentWillMount() {
    this.props.chooseWord();
  }

  render() {
    return <WordCard word={this.props.progress.currentWord} />;
  }
}

function mapStateToProps(state) {
  return {
    progress: state.progress,
  };
}

export default connect(mapStateToProps, {
  chooseWord,
})(App);
