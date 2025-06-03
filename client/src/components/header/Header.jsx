import { Link } from "react-router-dom";
import LogoIcon from "./LogoIcon";
import LogoutPopUp from "./LogoutPopUp";
import { ProfileIcon, SettingIcon } from "../../assets";
import { useState } from "react";

const Header = () => {
    const [showLogout, setShowLogout] = useState(false);

    const logoClick = () => {
        window.location.href = "/main";
    };

    const handleProfileClick = () => {
        setShowLogout(prev => !prev);
    };

    return (
        <header className="border-gray-300-[2px] border-b h-[128px] relative">
            <div className="mb-9 mt-2 mx-4 flex items-center justify-between">
                <LogoIcon onClick={logoClick} />
                <div className="flex gap-x-4">
                    <ProfileIcon
                        onClick={handleProfileClick}
                        className="h-[30px] w-[30px] cursor-pointer"
                    />
                    <Link to="/setting">
                        <SettingIcon className="h-[30px] w-[30px]" />
                    </Link>
                </div>
            </div>
            {showLogout && (
                <div className="absolute right-4 mt-2">
                    <LogoutPopUp />
                </div>
            )}
        </header>
    );
};

export default Header;