import React from 'react';
import {IMAGE_BASE_URL} from '../../../../Config';

const MainImage = ({img}) => {
    return (
        <div>
            <div
                style={{
                    background: `
                    linear-gradient(to bottom, rgba(0,0,0,0)
                    39%, rgba(0,0,0,0)
                    41%, rgba(0,0,0,0.65)
                    100%),
                    url('${IMAGE_BASE_URL}w1280${img}'), #1c1c1c`,
                    height: '500px',
                    backgroundSize: '100%, cover',
                    backgroundPosition: 'center, center',
                    width: '100%',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        maxWidth: '500px',
                        bottom: '2rem',
                        marginLeft: '2rem',
                    }}
                >
                    <h2 style={{color: 'white'}}>title</h2>
                    <p style={{color: 'white', fontSize: '1rem'}}>
                        description
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MainImage;
