import React from "react";

import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import { MarvelService } from "../../services/MarvelService";

const charactersIds = [
    1011334, 1017100, 1009144, 1010699, 1009146, 1016823, 1009148, 1009149,
    1010903, 1011266, 1010354, 1010846, 1017851, 1012717, 1011297, 1011031,
    1009150, 1011198, 1011175, 1011136,
];

export class RandomChar extends React.Component {
    state = {
        name: null,
        description: null,
        thumbnail: null,
        homepage: null,
        wiki: null,
    };

    componentDidMount() {
        this.updateChar();
    }

    marvelService = new MarvelService();

    updateChar = async () => {
        const id =
            charactersIds[Math.floor(Math.random() * charactersIds.length)];
        const res = await this.marvelService.getCharacterById(id);
        this.setState({ ...res });
    };

    render() {
        const { name, description, thumbnail, homepage, wiki } = this.state;

        return (
            <div className="randomchar">
                <div className="randomchar__block">
                    <img
                        src={thumbnail ? thumbnail : undefined}
                        alt="Random character"
                        className="randomchar__img"
                    />
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">{description}</p>
                        <div className="randomchar__btns">
                            <a
                                href={homepage ? homepage : undefined}
                                className="button button__main"
                            >
                                <div className="inner">homepage</div>
                            </a>
                            <a
                                href={wiki ? wiki : undefined}
                                className="button button__secondary"
                            >
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!
                        <br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">Or choose another one</p>
                    <button className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img
                        src={mjolnir}
                        alt="mjolnir"
                        className="randomchar__decoration"
                    />
                </div>
            </div>
        );
    }
}