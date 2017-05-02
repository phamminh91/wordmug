import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProgressBar from './ProgressBar.jsx';
import { updateTagsReq, loadDefinitionReq, observedWordReq } from '../action';

const observeDuration = 6000;

class WordCard extends Component {
  constructor(props) {
    super(props);
    this.state = { tags: [] };
  }

  componentWillReceiveProps(nProps) {
    const { word, observedWord } = this.props;
    if (nProps.word && word !== nProps.word) {
      document.title = `New Tab (${nProps.word})`;
      this.props.loadDefinition(nProps.word);
      this._progressBar && this._progressBar.go(80);
      this._timeoutId = setTimeout(
        () => observedWord(nProps.word),
        observeDuration,
      );
    }
  }

  render() {
    const { entry, word } = this.props;
    if (!word) return null;

    return (
      <div className="word">
        <ProgressBar ref={ref => this._progressBar = ref} />
        <h2 className="word__word">{word}</h2>
        <div className="word__pron-pos">
          <div className="word__pron" />
          <div className="word__pos">{entry.type}</div>
        </div>
        <div className="word__definition">
          {entry.definition || 'loading...'}
        </div>
        {!!entry.example &&
          <div className="word__example">
            {entry.example}
          </div>}
      </div>
    );
  }

  componentDidUpdate() {
    const { word, entry } = this.props;
    if (entry.definition) {
      document.title = `${word} - ${entry.definition}`;
    }
  }

  componentWillUnmount() {
    clearTimeout(this._timeoutId);
  }
}

function mapStateToProps(state, props) {
  return { entry: state.dictionary[props.word] || {} };
}

export default connect(mapStateToProps, {
  updateTags: updateTagsReq.req,
  loadDefinition: loadDefinitionReq.req,
  observedWord: observedWordReq.req,
})(WordCard);
