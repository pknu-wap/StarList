import { Link } from 'react-router-dom'
import LogoStar from "./LogoStar";
import { ProfileIcon, SettingIcon } from "../../assets";

const Header = () => {
    const logoClick = () => {
        window.location.href = '/main'
    };

    return (
        <header className="h-[169px] border-b border-gray-300-[2px]">
            <div className="mx-[23px] my-[20px] flex justify-between items-center">
                <LogoStar onClick={logoClick} />
                <div className="flex gap-[20px]">
                    <ProfileIcon className="w-[32px] h-[32px]" />
                    <Link to="/setting">
                        <SettingIcon className="w-[32px] h-[32px]" />
                    </Link>
                </div>

            </div>
        </header>

    );
};

export default Header;

//  <Link to="/" style={{ color: "blue" }}>Home </Link>
// <Link to="/categories" style={{ color: "blue" }}>카테고리 별</Link>
