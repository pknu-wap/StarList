const NavBar = ({ icon, text, isActive, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="w-[150px] flex items-center gap-2 cursor-pointer relative"
        >
            <img src={icon} className="w-[20px] h-[20px]" />
            <span className={`text-[24px] ${isActive ? "font-bold text-black" : "text-[#8d87a2]"}`}>
                {text}
            </span>
            {isActive && (
                <div className="absolute bottom-[-4px] left-0 w-full h-[3px] bg-black" />
            )}
        </div>
    );
};

export default NavBar;