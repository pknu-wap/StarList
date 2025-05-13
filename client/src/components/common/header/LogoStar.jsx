import { Title, MainpageLogo } from '../../../assets'


const LogoStar = () => {
    return (
        <div className="relative h-[67px]">
            <img
                src={MainpageLogo}
                alt="Starlist Logo"
                className="w-[67px] h-[67px] object-cover"
            />
            <img
                src={Title}
                className="w-[100px] h-[24px] absolute bottom-[23px]"
            />
        </div>
    );
};

export default LogoStar;
