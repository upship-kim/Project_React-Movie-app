import React from 'react';
import {Col} from 'antd';

const GridCards = ({image, movieId, movieName, cursor}) => {
    if (!cursor) {
        return (
            <Col lg={6} md={8} xs={24}>
                {image && (
                    <div style={{position: 'relative'}}>
                        <img
                            src={image}
                            alt={movieName}
                            style={{width: '100%', height: '100%'}}
                        />
                    </div>
                )}
            </Col>
        );
    }
    return (
        <Col lg={6} md={8} xs={24}>
            {image && (
                <div style={{position: 'relative'}}>
                    <a href={`/movie/${movieId}`}>
                        <img
                            src={image}
                            alt={movieName}
                            style={{width: '100%', height: '100%'}}
                        />
                    </a>
                </div>
            )}
        </Col>
    );
};

export default GridCards;
