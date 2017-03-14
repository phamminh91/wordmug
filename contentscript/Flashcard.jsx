import React from 'react';
import {Motion} from 'react-motion';

export default class Flashcard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      front: true,
      close: false,
    };

    this.changeSide = this.changeSide.bind(this);
    this.close = this.close.bind(this);
    document.addEventListener('keyup', e => {
      if (e.which === 32) {
        this.close();
      }
    })
  }

  render() {
    const {front} = this.state;
    return !this.state.close && (
        <div className="wordmug-flashcard">
          <div className="wordmug-flashcard__close" onClick={this.close}>
            Close
          </div>
          {front
              ? <div className="wordmug-flashcard__front"
                     onClick={this.changeSide}>
                <div className="wordmug-flashcard__word">
                  capricious
                </div>
              </div>
              : <div className="wordmug-flashcard__back"
                     onClick={this.changeSide}>
                <div className="wordmug-flashcard__explanation">
                  <p>given to sudden and unaccountable changes of mood or behavior: a capricious and often brutal administration | a capricious climate.</p>
                </div>
              </div>
          }
        </div>
    );
  }

  changeSide() {
    this.setState({
      front: !this.state.front,
    });
  }

  close() {
    this.setState({
      close: true,
    });
  }
}
