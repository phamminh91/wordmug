import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ReactSelectize, MultiSelect } from 'react-selectize';

import { loadDefinition } from '../action';

const observeDuration = 6000;

class WordCard extends Component {
  constructor(props) {
    super(props);
    this.handleIframeLoad = this.handleIframeLoad.bind(this);
  }

  componentWillMount() {
    const { word } = this.props;
    document.title = `New Tab (${word})`;
    this.props.loadDefinition(word);
    this._timeoutId = setTimeout(
      () => {
        console.log('word seen', word);
      },
      observeDuration
    );
  }

  render() {
    const { entry, word } = this.props;
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
          <MultiSelect
            placeholder="Select categories"
            options={['emotion', 'relationship', 'action'].map(fruit => ({
              label: fruit,
              value: fruit
            }))}
            autoFocus={false}
            maxValues={5}
            onValuesChange={() => {}}
            transitionEnter={true}
            transitionLeave={true}
            createFromSearch = {(options, values, search) => {
              const labels = values.map(value => value.label);

              if (search.trim().length == 0 || labels.indexOf(search.trim()) != -1)
                return null;

              return {
                label: search.trim(),
                value: search.trim()
              };
            }}
          />
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    clearTimeout(this._timeoutId);
  }

  handleIframeLoad() {
    const iframeDom = this._iframe.contentWindow
        ? this._iframe.contentWindow.document
        : this._iframe.contentDocument;
    const $examples = iframeDom.querySelectorAll('.examples.left .voting_li .li_content');
    const examples = Array.prototype.map.call($examples, d => d.textContent);
    console.log(examples);
  }
}

function mapStateToProps(state, props) {
  console.log(props);
  return {
    entry: state.dictionary[props.word] || {}
  };
}

export default connect(mapStateToProps, {
  loadDefinition
})(WordCard);
