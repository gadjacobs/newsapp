import React from 'react';

const Technology = ({technology}) => {
    return !technology.length ? (
        <h1>Loading</h1>
        ):
        (
        <h1>{technology[10].title}</h1>
        );
}

export default Technology;