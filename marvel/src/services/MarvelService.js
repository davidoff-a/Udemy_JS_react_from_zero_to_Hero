class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = "apikey=6925b7b9a76cbb0150838cebae0ff5c1";
  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, with status ${res.status}`);
    }
    return res.json();
  };

  getAllCharacters = async () => {
    const res = await this.getResource(
      `${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`
    );
    return res.map(this._transformCharacter);
  };

  getCharacter = async (id) => {
    const res = await this.getResource(
      `${this._apiBase}characters/${id}?${this._apiKey}`
    );
    return this._transformCharacter(res.data.results[0]);
  };

  _transformCharacter = (char) => {
    return {
      name: char.name,
      description: char.description,
      thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      wiki: char.urls[0].url,
      homepage: char.urls[1].url,
    };
  };
}

export default MarvelService;
