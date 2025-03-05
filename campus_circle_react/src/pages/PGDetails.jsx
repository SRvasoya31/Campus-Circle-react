import React from 'react';

function PGDetails({ pg }) {
    return (
        <div>
            <h3>{pg.name}</h3>
            <p>{pg.address}</p>
            <p>{pg.rent}</p>
        </div>
    );
}

export default PGDetails;
