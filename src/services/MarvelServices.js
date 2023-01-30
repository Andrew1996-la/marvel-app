class MarvelServices {
    _apiBaseUrl = 'https://gateway.marvel.com:443/v1/public/'
    _apiKey = `apikey=2786610d6ef585695878ce40c5106231`

    getResource = async (url) => {
        const res = await fetch(url)

        if(!res.ok) {
            throw new Error(`${url} don't correct`)
        }

        return await res.json()
    }

    getAllCharacters = () => {
        return this.getResource(`${this._apiBaseUrl}characters?${this._apiKey}`)
    }

    getCharacter = (id) => {
        return this.getResource(`${this._apiBaseUrl}characters/${id}?${this._apiKey}`)
    }
}

export default MarvelServices