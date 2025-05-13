import React from "react";
import { Link } from 'react-router-dom'
import LogoStar from "./LogoStar";
import { ProfileIcon, SettingIcon } from "../../../assets";

const Header = () => {
    return (
        <header className="h-[209px] border-b border-gray-[2px]">
            <div className="mx-[23px] my-[20px] flex justify-between items-center">
                <LogoStar />
                <div>
                    <img src={ProfileIcon} />
                    <img src={SettingIcon} className="ml-[18px]" />
                </div>

            </div>
        </header>

    );
};

export default Header;

//  <Link to="/" style={{ color: "blue" }}>Home </Link>
// <Link to="/categories" style={{ color: "blue" }}>카테고리 별</Link>
