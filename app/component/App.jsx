import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import WordCard from './WordCard.jsx';
import { loadDefinition } from '../action';
import wordList from '../wordlist';

const WORD = wordList[Math.floor(Math.random() * wordList.length)];

class App extends Component {
  render() {
    return <WordCard word={WORD} />;
  }
}

function mapStateToProps(state) {
  return {
    dictionary: state.dictionary
  };
}

export default connect(mapStateToProps, {
  loadDefinition
})(App);
