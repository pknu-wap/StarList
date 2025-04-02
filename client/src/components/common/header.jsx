import React from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import UserIcon from "./UserIcon";
import SettingsIcon from "./SettingsIcon";

const Header = () => {
    return (
        <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <Logo />
            <NavLinks />
            <div className="flex items-center space-x-4">
                <UserIcon />
                <SettingsIcon />
            </div>
        </header>
    );
};

export default Header;
