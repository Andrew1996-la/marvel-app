import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from "../../resources/img/vision.png";
import { Component } from "react";

class App extends Component {
  state = {
    charId: null,
  };

  setCharId = (id) => {
    this.setState({
      charId: id,
    });
  };
  render() {
    return (
      <div className="app">
        <AppHeader />
        <main>
          <ErrorBoundary>
            <RandomChar />
          </ErrorBoundary>
          <div className="char__content">
            <ErrorBoundary>
              <CharList setCharId={this.setCharId} />
            </ErrorBoundary>
            <ErrorBoundary>
              <CharInfo charId={this.state.charId} />
            </ErrorBoundary>
          </div>
          <img className="bg-decoration" src={decoration} alt="vision" />
        </main>
      </div>
    );
  }
}

export default App;
