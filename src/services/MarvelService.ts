type UrlType = {
    type: string;
    url: string;
};

export class MarvelService {
    private _baseUrl = `https://gateway.marvel.com:443/v1/public`;
    private _apiKey = `apikey=69d88190cd71ff804d98f5a285ed6964`;

    public getResource = async (url: string) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`error fetch: ${res.status}`);
        }

        return res.json();
    };

    public getAllCharacteres = async () => {
        const {
            data: { results },
        } = await this.getResource(
            `${this._baseUrl}/characters?${this._apiKey}`
        );
        return results.map(this.transformCharacter);
    };

    public getCharacterById = async (characterId: number) => {
        const {
            data: { results },
        } = await this.getResource(
            `${this._baseUrl}/characters/${characterId}?${this._apiKey}`
        );

        return this.transformCharacter(results[0]);
    };

    private transformCharacter = (char: any) => {
        return {
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homepage: char.urls.find((el: UrlType) => el.type === "detail"),
            wiki: char.urls.find((el: UrlType) => el.type === "wiki"),
        };
    };
}