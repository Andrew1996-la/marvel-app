import "./charInfo.scss";
import PropTypes from "prop-types";
import { Component } from "react";
import Skeleton from "../skeleton/Skeleton";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import MarvelServices from "../../services/MarvelServices";

class CharInfo extends Component {
  state = {
    loading: false,
    error: false,
    char: null,
  };

  marvelServices = new MarvelServices();

  onError() {
    this.setState({
      loading: false,
      error: true,
    });
  }

  componentDidMount() {
    this.onUpdateChar();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.charId !== this.props.charId) {
      this.onUpdateChar();
    }
  }

  onCharLoaded = (char) => {
    this.setState({
      char: char,
      loading: false,
    });
  };

  onUpdateChar = () => {
    if (this.props.charId === null) return;
    this.onCharLoading();

    this.marvelServices
      .getCharacter(this.props.charId)
      .then((res) => this.onCharLoaded(res))
      .catch(() => this.onError());
  };

  onCharLoading = () => {
    this.setState({
      loading: true,
    });
  };

  render() {
    const { error, loading, char } = this.state;

    const skeleton = error || loading || char ? null : <Skeleton />;
    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = !(errorMessage || spinner || !char) ? (
      <View char={char} />
    ) : null;

    return (
      <div className="char__info">
        {spinner}
        {errorMessage}
        {skeleton}
        {content}
      </div>
    );
  }
}

const View = ({ char }) => {
  let { name, homepage, wiki, description, thumbnail, comics } = char;

  if (description.length === 0) {
    description = "There is no description of this hero";
  }

  const imgIsNotAvaliable =
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

  let classImg = { objectFit: "cover" };
  if (thumbnail === imgIsNotAvaliable) {
    classImg = { objectFit: "contain" };
  }

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={classImg} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length === 0 && "No comics"}
        {comics.map((item, i) => {
          return (
            <li key={i} className="char__comics-item">
              {item.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number,
};
export default CharInfo;
