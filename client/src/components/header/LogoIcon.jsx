import { Title, Logo } from "../../assets";

const LogoIcon = ({ onClick }) => {
    return (
        <div className="jutify-center flex cursor-pointer items-center gap-x-2" onClick={onClick}>
            <Logo className="h-[50px] w-[50px] object-cover" />
            <Title className="h-[50px] w-[80px]" />
        </div>
    );
};

export default LogoIcon;
