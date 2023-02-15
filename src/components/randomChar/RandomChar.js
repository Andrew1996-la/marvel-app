import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import MarvelServices from "../../services/MarvelServices";
import { Component } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { charValidation } from "../../utils/utils";

class RandomChar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      char: {
        name: "",
        description: "",
        thumbnail: "",
        homepage: "",
        wiki: "",
      },
      loading: true,
      error: false,
    };
  }

  marvelServices = new MarvelServices();

  onCharLoaded = (char) => {
    charValidation(char);

    this.setState({
      char,
      loading: false,
    });
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  onCharLoading = () => {
    this.setState({
      loading: true,
    });
  };

  componentDidMount() {
    this.handleUpdateHero();
    // this.timerId = setInterval(this.handleUpdateHero, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  handleUpdateHero = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    this.onCharLoading();
    this.marvelServices
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  render() {
    const { char, loading, error } = this.state;

    const spinnerComponent = loading ? <Spinner /> : null;
    const errorComponent = error ? <ErrorMessage /> : null;
    const viewComponent = !(error || loading) ? <View char={char} /> : null;

    return (
      <div className="randomchar">
        {spinnerComponent}
        {errorComponent}
        {viewComponent}

        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button className="button button__main">
            <div className="inner" onClick={this.handleUpdateHero}>
              try it
            </div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}

const View = ({ char }) => {
  const { thumbnail, name, description, homepage, wiki } = char;
  const imgIsNotAvaliable =
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

  let classImg = { objectFit: "cover" };
  if (thumbnail === imgIsNotAvaliable) {
    classImg = { objectFit: "contain" };
  }

  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        className="randomchar__img"
        style={classImg}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
