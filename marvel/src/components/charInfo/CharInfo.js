import "./charInfo.scss";
import thor from "../../resources/img/thor.jpeg";
import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import comicsList from "../comicsList/ComicsList";
import Skeleton from "../skeleton/Skeleton";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

class CharInfo extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    char: null,
    loading: false,
    error: false,
  };

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps) {
    if (this.props.charId !== prevProps.charId) {
      this.updateChar();
    }
  }

  marvelService = new MarvelService();

  onCharLoading = () => {
    this.setState({ loading: true, error: false });
  };

  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };
  onError = () => {
    this.setState({ loading: false, error: true });
  };
  updateChar = () => {
    const { charId } = this.props;
    if (!charId) {
      return;
    }
    this.onCharLoading();
    this.marvelService
      .getCharacter(charId)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  render() {
    const { char, loading, error } = this.state;
    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;
    return (
      <div className="char__info">
        {skeleton}
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;
  const comix = comics.slice(0, 10).map((item, i) => {
    return (
      <li className="char__comics-item" key={i}>
        {item.name}
      </li>
    );
  });
  const imgStyle = (imgPath) => {
    const imgName = imgPath.split("/").reverse()[0].slice(0, -4);
    return imgName === "image_not_available" || imgName === "4c002e0305708"
      ? "contain"
      : "cover";
  };
  return (
    <>
      <div className="char__basics">
        <img
          src={thumbnail}
          alt={name}
          style={{ objectFit: imgStyle(thumbnail) }}
        />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={wiki} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={homepage} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comix.length > 0 ? comix : "There are no comics with this char!"}
      </ul>
    </>
  );
};

export default CharInfo;