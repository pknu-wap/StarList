import React from 'react';

function Logo({ width, height }) {
    return (
        <img
            src='/logo/logo.svg'
            alt='Logo'
            width={width}
            height={height}
        />
    );
}

export default Logo;