import "./charList.scss";
import CharItem from "./charItem/CharItem";
import { Component } from "react";
import MarvelServices from "../../services/MarvelServices";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

class CharList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      charList: [],
      loading: true,
      error: false,
    };
  }
  marvelServices = new MarvelServices();

  componentDidMount() {
    this.marvelServices
      .getAllCharacters()
      .then((characters) => this.setCharList(characters))
      .catch((res) => this.onError(res));
  }

  setCharList(charList) {
    this.setState({
      charList: charList,
      loading: false,
    });
  }

  onError() {
    this.setState({
      loading: false,
      error: true,
    });
  }

  render() {
    const charElements = this.state.charList.map((char) => {
      return (
        <CharItem
          key={generateUniqueID()}
          img={char.thumbnail}
          name={char.name}
        />
      );
    });

    const spinner = this.state.loading ? <Spinner /> : null;
    const error = this.state.error ? <ErrorMessage /> : null;
    const content = !(error || spinner) ? charElements : null;

    return (
      <div className="char__list">
        <ul className="char__grid">
          {spinner}
          {error}
          {content}
        </ul>
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
