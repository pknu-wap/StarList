import { Logo } from "../../assets";

const LogoIcon = ({ onClick }) => {
    return (
        <div className="jutify-center flex cursor-pointer items-center gap-x-2" onClick={onClick}>
            <Logo className="h-12 w-12 object-cover" />
            <div className="h-8 w-32 select-none justify-start font-sansita text-3xl font-normal leading-9 tracking-tight text-black">
                Starlist
            </div>
        </div>
    );
};

export default LogoIcon;
