import "./charList.scss";
import PropTypes from "prop-types";
import CharItem from "./charItem/CharItem";
import { Component } from "react";
import MarvelServices from "../../services/MarvelServices";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

class CharList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      charList: [],
      loading: true,
      error: false,
      char: null,
      offset: 210,
      newItemLoading: false,
      lastChar: false,
    };
  }
  marvelServices = new MarvelServices();

  componentDidMount() {
    this.onLoadingNewChar();
  }

  onLoadingNewChar = (offset) => {
    this.setState({
      newItemLoading: true,
    });

    this.marvelServices
      .getAllCharacters(offset)
      .then((characters) => this.setCharList(characters))
      .catch((res) => this.onError(res));
  };

  setCharList = (newCharList) => {
    let endList = false;
    if (newCharList.length < 9) {
      endList = true;
    }

    this.setState(({ charList, offset }) => ({
      charList: [...charList, ...newCharList],
      loading: false,
      offset: offset + 9,
      newItemLoading: false,
      lastChar: endList,
    }));
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  render() {
    const charElements = this.state.charList.map((char) => {
      return (
        <CharItem
          setCharId={this.props.setCharId}
          key={char.id}
          charId={char.id}
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
        <button
          className="button button__main button__long"
          style={{ display: this.state.lastChar ? "none" : "block" }}
          disabled={this.state.newItemLoading}
          onClick={() => this.onLoadingNewChar(this.state.offset)}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

CharList.propsTypes = {
  setCharId: PropTypes.func.isRequired,
};

export default CharList;
