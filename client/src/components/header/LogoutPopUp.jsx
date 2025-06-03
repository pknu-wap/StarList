import { useNavigate } from "react-router-dom";
import useAuthStore from "../../functions/hooks/useAuthStore";
import { Logout } from "../../assets";

const LogoutPopUp = () => {
    const logout = useAuthStore((s) => s.logout);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/start", { replace: true });
    };

    return (
        <div className="w-[377px] h-[80px] rounded-[20px] bg-white shadow-card relative flex justify-center items-center">
            <div
                className="
                    w-[337px] h-[60px] 
                    rounded-2xl bg-gray-100 hover:bg-gray-200
                    flex flex-col justify-center items-center
                    cursor-pointer
                "
                onClick={handleLogout}
            >
                <div className="flex">
                    <Logout className="w-8 h-8 pr-[10px] pb-1" />
                    <p className="text-xl font-medium text-black font-sans">
                        로그아웃
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LogoutPopUp;