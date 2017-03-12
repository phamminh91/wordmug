import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import TokenInput from 'preact-token-input';

import { loadDefinition } from '../action';

const observeDuration = 6000;

class App extends Component {
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
    let tags = ['new', 'noteworthy', 'tech'];
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
        <TokenInput value={tags} />
      </div>
    );
  }

  componentWillUnmount() {
    clearTimeout(this._timeoutId);
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
})(App);
