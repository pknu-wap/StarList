import logoImage from "../../../assets/logo.svg";
import title from "../../../assets/title.svg"


const LogoStar = () => {
    return (
        <div className="relative h-[67px]">
            <img
                src={logoImage}
                alt="Starlist Logo"
                className="w-[67px] h-[67px] object-cover"
            />
            <img
                src={title}
                className="w-[100px] h-[24px] absolute bottom-[23px]"
            />
        </div>
    );
};

export default LogoStar;
