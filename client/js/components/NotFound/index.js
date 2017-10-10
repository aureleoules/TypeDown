// components/NotFound/index.js
import React from 'react';
import Strings from '../../Strings';

const NotFound = () => {
    return (
        <div className="page-404">
            <h1>{Strings.pageNotFound}</h1>
        </div>
    );
}

export default NotFound;