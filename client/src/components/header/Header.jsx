import { Link } from "react-router-dom";
import LogoIcon from "./LogoIcon";
import { ProfileIcon, SettingIcon } from "../../assets";

const Header = () => {
    const logoClick = () => {
        window.location.href = "/main";
    };

    return (
        <header className="border-gray-300-[2px] border-b">
            <div className="mb-9 mt-2 flex items-center justify-between">
                <LogoIcon onClick={logoClick} />
                <div className="flex gap-x-4">
                    <ProfileIcon className="h-[30px] w-[30px]" />
                    <Link to="/setting">
                        <SettingIcon className="h-[30px] w-[30px]" />
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
