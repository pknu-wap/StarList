import { Logo } from "../../assets";

const LogoIcon = ({ onClick }) => {
    return (
        <div className="flex jutify-center items-center cursor-pointer gap-x-2" onClick={onClick}>
            <Logo className="w-12 h-12 object-cover" />
            <div className="w-32 h-8 justify-start font-sansita text-black font-normal text-3xl leading-9 tracking-tight select-none">
                Starlist
            </div>
        </div>
    );
};

export default LogoIcon;
