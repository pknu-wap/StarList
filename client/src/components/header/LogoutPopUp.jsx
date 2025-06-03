import React, { useEffect, useCallback, useRef } from "react";
import useAuthStore from "../../functions/hooks/useAuthStore";
import { Logout } from "../../assets";

const LogoutPopUp = ({ onClose }) => {
    const logout = useAuthStore((s) => s.logout);
    const popupRef = useRef(null);

    const handleLogout = () => {
        logout();
    };

    // 현재 영역을 벗어난 곳을 클릭하면 모달창 닫기
    const handleClickOutside = useCallback(
        (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) onClose();
        },
        [onClose],
    );

    // 마운트될때 mousedown 이벤트 리스너를 등록, 언마운트시 해제
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleClickOutside]);

    return (
        <div
            ref={popupRef}
            className="absolute right-14 top-14 flex w-[370px] items-center justify-center rounded-2xl bg-white p-4 shadow-card"
        >
            <div
                className="flex w-[330px] cursor-pointer flex-col items-center justify-center rounded-2xl bg-gray-100 p-4 hover:bg-gray-200"
                onClick={handleLogout}
            >
                <div className="flex items-center gap-x-2">
                    <Logout className="h-8 w-8" />
                    <p className="font-sans text-xl font-medium text-black">로그아웃</p>
                </div>
            </div>
        </div>
    );
};

export default LogoutPopUp;
