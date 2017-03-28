import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { MultiSelect } from 'react-selectize';

import { loadDefinition, observedWord } from '../action';

const observeDuration = 6000;

class WordCard extends Component {
  constructor(props) {
    super(props);
    this.handleIframeLoad = this.handleIframeLoad.bind(this);
  }

  componentWillReceiveProps(nProps) {
    const { word, observedWord } = this.props;
    if (nProps.word && word !== nProps.word) {
      document.title = `New Tab (${nProps.word})`;
      this.props.loadDefinition(nProps.word);
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
        <div className="word__tags">
        </div>
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

  handleIframeLoad() {
    const iframeDom = this._iframe.contentWindow
      ? this._iframe.contentWindow.document
      : this._iframe.contentDocument;
    const $examples = iframeDom.querySelectorAll(
      '.examples.left .voting_li .li_content',
    );
    const examples = Array.prototype.map.call($examples, d => d.textContent);
    console.log(examples);
  }
}

function mapStateToProps(state, props) {
  console.log(props);
  return {
    entry: state.dictionary[props.word] || {},
  };
}

export default connect(mapStateToProps, {
  loadDefinition,
  observedWord,
})(WordCard);
