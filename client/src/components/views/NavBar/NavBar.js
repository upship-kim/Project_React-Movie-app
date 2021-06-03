import React from 'react';
import {Link} from 'react-router-dom';
function NavBar() {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '0.4rem',
                fontSize: '1rem',
            }}
        >
            <Link to={'/'} style={{textDecoration: 'none', color: 'green'}}>
                <span>Movie View</span>
            </Link>
        </div>
    );
}

export default NavBar;
