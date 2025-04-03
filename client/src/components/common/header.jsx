import React from "react";
import { Link } from 'react-router-dom'


const Header = () => {
    return (
        <div>
            <Link to="/" style={{ color: "blue" }}>Home </Link>
            <Link to="/categories" style={{ color: "blue" }}>카테고리 별</Link>
        </div>
    );
};

export default Header;
