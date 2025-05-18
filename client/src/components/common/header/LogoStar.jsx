import { Title, MainpageLogo } from '../../../assets';

const LogoStar = ({ onClick }) => {
    return (
        <div className="flex items-center cursor-pointer" onClick={onClick}>
            <MainpageLogo className="w-[67px] h-[67px] object-cover" />
            <Title className="w-[120px] h-[20px] -ml-5" />
        </div>
    );
};

export default LogoStar;
