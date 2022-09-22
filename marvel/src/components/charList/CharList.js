import "./charList.scss";
import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

class CharList extends Component {
  state = {
    chars: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 210,
  };

  marvel = new MarvelService();

  componentDidMount() {
    console.log("mount");
    this.onRequest();
  }

  onRequest = async (offset) => {
    this.onCharListLoading();
    await this.marvel
      .getAllCharacters(offset)
      .then(this.onCharsLoaded)
      .catch(this.onError);
  };

  onCharListLoading = () => {
    this.setState({ newItemLoading: true });
  };

  onCharsLoaded = (newChars) => {
    this.setState(({ offset, chars }) => ({
      chars: [...chars, ...newChars],
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
    }));
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  render() {
    const { chars, loading, error, newItemLoading, offset } = this.state;
    console.log(chars);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const imgStyle = (imgPath) => {
      const imgName = imgPath
        ? imgPath.split("/").reverse()[0].slice(0, -4)
        : "";
      return imgName === "image_not_available" || imgName === "4c002e0305708"
        ? { objectFit: "contain" }
        : { objectFit: "cover" };
    };
    const addChars = chars.map((char) => {
      return (
        <li
          className="char__item"
          key={char.id}
          onClick={() => this.props.onCharSelected(char.id)}
        >
          <img
            src={char.thumbnail}
            alt={char.name}
            style={imgStyle(char.thumbnail)}
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
        <button
          className="button button__main button__long"
          disabled={newItemLoading}
          onClick={() => this.onRequest(offset)}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;