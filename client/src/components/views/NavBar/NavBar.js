import React from 'react';
import {Link} from 'react-router-dom';
function NavBar() {
    return (
        <div
            style={{
                position: 'fixed',
                display: 'flex',
                justifyContent: 'center',
                // padding: '0.4rem',
                fontSize: '1rem',
                background: '#0c152d',
                zIndex: '1',
                width: '100%',
                marginTop: '0',
            }}
        >
            <Link
                to={'/'}
                style={{
                    textDecoration: 'none',
                    color: '#c1c9ef',
                    fontSize: '1.5rem',
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                }}
            >
                <span>Movie View</span>
            </Link>
        </div>
    );
}

export default NavBar;
