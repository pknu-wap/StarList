import React from 'react';

function HompageButton() {
    const handleHomepage = () => {
        console.log('Button clicked!');
    };

    return (
        <div>
            <button onClick={handleHomepage}>Click Me</button>
        </div>
    );
}

export default HompageButton;