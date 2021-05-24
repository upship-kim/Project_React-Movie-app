import React, {useEffect, useState} from 'react';
// import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../../Config';
import MainImage from './Sections/MainImage';
import GridCards from '../commons/GridCards';
import {Row} from 'antd';

function LandingPage() {
    const [movies, setMovies] = useState([]);
    const [mainMovieImg, setMainMovieImg] = useState(null);
    const [pageNum, setPageNum] = useState(1);

    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KR&page=${pageNum}`;

    const fetchMovies = (endpoint) => {
        fetch(endpoint)
            .then((response) => response.json())
            .then((response) => {
                setMovies(response.results);
                setMainMovieImg(response.results[0]);
                setPageNum(response.page);
            });
    };

    useEffect(() => {
        fetchMovies(endpoint);
    }, []);
    console.log('movie', movies);
    // console.log(mainMovieImg);

    const loadMoreItems = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KR&page=${
            pageNum + 1
        }`;
        // setPageNum(pageNum + 1);
        fetchMovies(endpoint);
    };

    return (
        <div style={{width: '100%', margin: '0'}}>
            {mainMovieImg && (
                <MainImage
                    img={mainMovieImg.backdrop_path}
                    title={mainMovieImg.title}
                    description={mainMovieImg.overview}
                />
            )}
            <div style={{width: '85%', margin: '1rem auto'}}>
                <h2>Movies by latest</h2>
                <hr />

                {/* movies Grid Cards */}
                <Row gutter={[16, 16]}>
                    {movies &&
                        movies.map((movie, index) => (
                            <React.Fragment key={index}>
                                <GridCards
                                    image={
                                        movie.poster_path
                                            ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
                                            : null
                                    }
                                    movieId={movie.id}
                                    movieName={movie.title}
                                />
                            </React.Fragment>
                        ))}
                </Row>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <button onClick={loadMoreItems}>Load More</button>
            </div>
        </div>
    );
}

export default withRouter(LandingPage);
