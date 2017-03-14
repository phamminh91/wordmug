import React, { Component } from 'react';
import { connect } from 'react-redux';

import WordCard from './WordCard.jsx';
import { chooseWord } from '../action';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.chooseWord();
    this.handleKeyUp = this.handleKeyUp.bind(this);
    document.addEventListener('keyup', this.handleKeyUp);
  }

  render() {
    return (
      <div onKeyUp={e => this.handleKeyUp(e)}>
        <WordCard word={this.props.progress.currentWord} />
      </div>
    );
  }

  handleKeyUp(e) {
    if (e.which === 32) {
      this.props.chooseWord();
    }
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
