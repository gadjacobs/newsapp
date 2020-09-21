import React from 'react';

const Sports = ({sports}) => {

        return !sports.length ? (
        <h1>Loading</h1>
        ):
        (
        <h1>{sports[2].title}</h1>
        );
}

export default Sports;