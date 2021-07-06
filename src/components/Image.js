import React from 'react';

const Image = ({image,text}) => {
    return (
        <React.Fragment>
            <img src={image} alt={text} />
        </React.Fragment>
    );
};

export default Image;