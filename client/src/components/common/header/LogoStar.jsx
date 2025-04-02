import logoImage from "../../web/assets/logo.svg";

const LogoStar = () => {
    return (
        <div className="w-28 h-11 justify-start text-black text-3xl font-black font-['Inter'] leading-[48px]">
            <img
                src={logoImage}
                alt="Starlist Logo"
                className="size-11 bg-gradient-to-b from-sub4_coolgrey to-sub1_coolgrey rounded-full"
            />
            Starlist
        </div>
    );
};

export default LogoStar;
