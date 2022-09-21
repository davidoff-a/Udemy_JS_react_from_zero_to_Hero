import "./charList.scss";
import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

class CharList extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    chars: [],
    loading: true,
    error: false,
  };

  marvel = new MarvelService();

  onCharsLoaded = (chars) => {
    this.setState({
      chars: chars,
      loading: false,
      error: false,
    });
  };
  componentDidMount() {
    this.fillChars();
    // this.timerId = setInterval(this.updateChar, 3000)
  }
  onError = () => {
    this.setState({ loading: false, error: true });
  };

  fillChars = () => {
    return this.marvel
      .getAllCharacters()
      .then((res) => this.onCharsLoaded(res))
      .catch(this.onError);
  };

  render() {
    const { chars, loading, error } = this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const imgStyle = (imgPath) => {
      const imgName = imgPath.split("/").reverse()[0].slice(0, -4);
      return imgName === "image_not_available" ? "contain" : "cover";
    };
    const addChars = chars.map((char, index) => {
      return (
        <li className="char__item" key={index}>
          <img
            src={char.thumbnail}
            alt={char.name}
            style={{ objectFit: imgStyle(char.thumbnail) }}
          />
          <div className="char__name">{char.name}</div>
        </li>
      );
    });
    const content = !(loading || error) ? addChars : null;

    return (
      <div className="char__list">
        {spinner}
        {errorMessage}
        <ul className="char__grid">{content}</ul>
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
