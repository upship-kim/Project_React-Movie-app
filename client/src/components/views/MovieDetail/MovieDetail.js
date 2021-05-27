import React, {useEffect, useRef, createRef, useState} from 'react';
import {Route} from 'react-router';
import {API_KEY, API_URL} from '../../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import MovieActor from './Sections/MovieActor';
import MovieInfo from './Sections/MovieInfo';

const MovieDetail = ({match}) => {
    const [movieInfo, setMovieInfo] = useState([]);
    const [view, setView] = useState(false);

    let movieId = match.params.movieId;

    useEffect(() => {
        const endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=ko-KR`;

        fetch(endpointInfo)
            .then((response) => response.json())
            .then((response) => {
                setMovieInfo(response);
                console.log(response);
            });
    }, []);

    const onClick = () => {
        setView(!view);
    };

    return (
        <div>
            {movieInfo && (
                <MainImage
                    img={movieInfo.backdrop_path}
                    title={movieInfo.title}
                    description={movieInfo.overview}
                />
            )}

            {/* header */}
            <div style={{width: '85%', margin: '1rem auto'}}>
                {/* movie info */}
                <br />
                <MovieInfo info={movieInfo} />
                {/* Action Grid */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        margin: '2rem',
                    }}
                >
                    <button onClick={onClick}>Toggle Actor View</button>
                </div>

                <br />
                {view && <MovieActor view={view} />}
            </div>
        </div>
    );
};

export default MovieDetail;
