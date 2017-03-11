import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import { loadDefinition } from '../action';

const WORD = 'guileless';
class App extends Component {
  componentWillMount() {
    this.props.loadDefinition(WORD);
  }

  render() {
    const { dictionary } = this.props;
    const entry = dictionary[WORD] || { examples: [] };
    console.log('entry', entry);
    return (
      <div className="container">
        <div className="card">
          <h2 className="word">{WORD}</h2>
          <div className="definition">
            {entry.definition || 'loading...'}
          </div>
        </div>

        <div className="card">
          {entry.examples.length
            ? <ul className="usages">
                {entry.examples.map((ex, idx) => (
                  <li className="usage" key={idx}>
                    {ex}
                  </li>
                ))}
              </ul>
            : 'loading...'}
        </div>
      </div>
    );
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
