import {Row} from 'antd';
import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router';
import {API_KEY, API_URL, IMAGE_BASE_URL} from '../../../../Config';
import GridCards from '../../commons/GridCards';

const MovieActor = ({match}) => {
    const [credits, setCredits] = useState();

    let movieId = match.params.movieId;

    useEffect(() => {
        const endpointInfo = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=ko-KR`;
        async function fn() {
            const oriData = await fetch(endpointInfo);
            const res = await oriData.json();
            setCredits(res.cast);
            console.log(res.cast);
        }
        fn();
    }, []);

    return (
        <>
            <div>
                <h2>Movie Cast</h2>
                <hr />

                {/* movies Grid Cards */}
                <Row gutter={[16, 16]}>
                    {credits &&
                        credits.map((credit, index) => (
                            <React.Fragment key={index}>
                                <GridCards
                                    image={
                                        credit.profile_path
                                            ? `${IMAGE_BASE_URL}w500${credit.profile_path}`
                                            : null
                                    }
                                    cursor={false}
                                />
                            </React.Fragment>
                        ))}
                </Row>
            </div>
        </>
    );
};

export default withRouter(MovieActor);
