import React, { useState, useRef, useEffect } from "react";
import AddSelectMenu from "./AddSelectMenu";
import AddBookmarkModal from "../modal/AddBookmarkModal";
import AddFolderModal from "../modal/AddFolderModal";
import { PlusIcon } from "../../assets";

const AddButton = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const [openModal, setOpenModal] = useState(""); // "bookmark" | "folder" | ""
    const buttonRef = useRef();

    // 외부 클릭 시 메뉴 닫기
    useEffect(() => {
        const handler = (e) => {
            if (buttonRef.current && !buttonRef.current.contains(e.target)) {
                setOpenMenu(false);
            }
        };
        if (openMenu) {
            document.addEventListener("mousedown", handler);
        }
        return () => document.removeEventListener("mousedown", handler);
    }, [openMenu]);

    // 선택시 모달 오픈
    const handleSelect = (type) => {
        setOpenMenu(false);
        setOpenModal(type);
    };

    const handleCloseModal = () => {
        setOpenModal("");
    };

    return (
        <div className="relative inline-block" ref={buttonRef}>
            <button
                type="button"
                onClick={() => setOpenMenu(v => !v)}
                className={`
                        relative flex items-center justify-center
                        w-[80px]   sm:w-[90px]
                        md:w-[100px] lg:w-[120px]
                        h-8 sm:h-9
                        md:h-10 lg:h-[43px]
                        rounded-full sm:rounded-full
                        md:rounded-full lg:rounded-[78px]
                        
                        /* 기본 그림자 */
                        shadow-md  
                        /* 호버시 그림자 강화 */
                        hover:shadow-[0px_4px_14.9px_rgba(0,0,0,0.25)]
                        transition-shadow duration-200 ease-in-out

                        /* group 선언해서 내부 오버레이에 hover 바인딩 */
                        group

                        /* 그라데이션 배경은 그대로 */
                        bg-gradient-to-r from-main-500 to-indigo-900
                `}
            >
                {/* 배경 오버레이: 기본엔 투명, hover시 검정 25% */}
                <div
                    className="
                        absolute inset-0
                        bg-transparent        /* 기본엔 투명 */
                        group-hover:bg-black/25  /* hover 시 검정25% */
                        rounded-full           /* 버튼과 같은 border */
                        transition-colors duration-200
                    "
                />
                <PlusIcon
                    className={`
                            relative z-10
                            w-4 h-4
                            sm:w-4 sm:h-4
                            md:w-5 md:h-5
                            lg:w-5 lg:h-5
                            mr-1 sm:mr-1 md:mr-2 lg:mr-2
                            text-white
                        `}
                />
                <span className={`
                            relative z-10
                            text-xs sm:text-sm
                            md:text-base lg:text-base
                            font-medium text-white
                        `}>
                    New
                </span>
            </button>
            {openMenu && (
                <AddSelectMenu
                    onSelect={handleSelect}
                    onClose={() => setOpenMenu(false)}
                />
            )}
            {openModal === "bookmark" && (
                <AddBookmarkModal onClose={handleCloseModal} />
            )}
            {openModal === "folder" && (
                <AddFolderModal onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default AddButton;
