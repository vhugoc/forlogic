import React from 'react';

import './style.css';

const PageTitle = (props) => {
    return(
        <div className="page-title-container">
            <h3 className="title">{props.title}</h3>
            <span className="subtitle">{props.subtitle}</span>
        </div>
    );    
}

export default PageTitle;
