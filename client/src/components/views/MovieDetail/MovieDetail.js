import React, {useEffect, useState} from 'react';
import {API_KEY, API_URL, IMAGE_BASE_URL} from '../../../Config';
import MainImage from '../LandingPage/Sections/MainImage';

const MovieDetail = ({match}) => {
    const [movieInfo, setMovieInfo] = useState([]);
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

    return (
        <div>
            movieDetail page
            <MainImage
                img={`${IMAGE_BASE_URL}w1280${movieInfo.backdrop_path}`}
                title={movieInfo.title}
                description={movieInfo.overview}
            />
            {/* header */}
            <div style={{width: '85%', margin: '1rem auto'}}>
                {/* movie info */}
                <br />

                {/* Action Grid */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        margin: '2rem',
                    }}
                >
                    <button>Toggle Actor View</button>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
