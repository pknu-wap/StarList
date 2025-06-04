import React, { useState, useRef, useEffect } from "react";
import AddSelectMenu from "../modal/AddSelectMenu";
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
                onClick={() => setOpenMenu((v) => !v)}
                className={`/* 기본 그림자 */ /* 호버시 그림자 강화 */ /* 선언해서 내부 오버레이에 hover 바인딩 */ /* 그라데이션 배경은 그대로 */ group relative flex h-8 w-[80px] items-center justify-center rounded-full bg-gradient-to-r from-main-500 to-indigo-900 shadow-md transition-shadow duration-200 ease-in-out hover:shadow-[0px_4px_14.9px_rgba(0,0,0,0.25)] sm:h-9 sm:w-[90px] sm:rounded-full md:h-10 md:w-[100px] md:rounded-full lg:h-[43px] lg:w-[120px] lg:rounded-[78px]`}
            >
                {/* 배경 오버레이: 기본엔 투명, hover시 검정 25% */}
                <div className="/* 기본엔 투명 */ /* hover 시 검정25% */ /* 버튼과 같은 */ absolute inset-0 rounded-full border bg-transparent transition-colors duration-200 group-hover:bg-black/25" />
                <PlusIcon
                    className={`relative z-10 mr-1 h-4 w-4 text-white sm:mr-1 sm:h-4 sm:w-4 md:mr-2 md:h-5 md:w-5 lg:mr-2 lg:h-5 lg:w-5`}
                />
                <span className={`relative z-10 text-xs font-medium text-white sm:text-sm md:text-base lg:text-base`}>
                    New
                </span>
            </button>
            {openMenu && <AddSelectMenu onSelect={handleSelect} onClose={() => setOpenMenu(false)} />}
            {openModal === "bookmark" && <AddBookmarkModal onClose={handleCloseModal} />}
            {openModal === "folder" && <AddFolderModal onClose={handleCloseModal} />}
        </div>
    );
};

export default AddButton;
