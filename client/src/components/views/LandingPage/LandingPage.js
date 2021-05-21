import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {API_URL, API_KEY} from '../../../Config';
import MainImage from './Sections/MainImage';

function LandingPage() {
    const [movies, setMovies] = useState();
    const [mainMovieImg, setMainMovieImg] = useState();

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;

        fetch(endpoint)
            .then((response) => response.json())
            .then((response) => {
                setMovies([response.results]);
                setMainMovieImg(response.results[0].backdrop_path);
            });
    }, []);
    console.log(movies);
    console.log(mainMovieImg);

    return (
        <div style={{width: '100%', margin: '0'}}>
            {mainMovieImg && <MainImage img={mainMovieImg} />}
            <div style={{width: '85%', margin: '1rem auto'}}>
                <h2>Movies by latest</h2>
                <hr />
            </div>
        </div>
    );
}

export default withRouter(LandingPage);
