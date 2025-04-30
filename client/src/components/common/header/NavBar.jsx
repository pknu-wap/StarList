const NavBar = ({ icon, text }) => {
    return (
        <NavBar className="w-[150px] flex gap-2">
            <img src={icon} className="w-[20px] h-[20px]" />
            <span className="text-[24px]">{text}</span>
        </NavBar>
    );
};

export default NavBar;