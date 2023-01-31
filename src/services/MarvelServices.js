class MarvelServices {
  _apiBaseUrl = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = `apikey=2786610d6ef585695878ce40c5106231`;

  getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`${url} don't correct`);
    }

    return await res.json();
  };

  getAllCharacters = async () => {
    const res = await this.getResource(
      `${this._apiBaseUrl}characters?limit=9&offset=210&${this._apiKey}`
    );

    return res.data.results.map((item) => this._transformCharacter(item));
  };

  getCharacter = async (id) => {
    const res = await this.getResource(
      `${this._apiBaseUrl}characters/${id}?${this._apiKey}`
    );

    return this._transformCharacter(res.data.results[0]);
  };

  _transformCharacter = (character) => {
    return {
      name: character.name,
      description: character.description,
      thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`,
      homepage: character.urls[0].url,
      wiki: character.urls[1].url,
    };
  };
}

export default MarvelServices;
