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
                className="w-[120px] h-[43px] relative"
                style={{
                    filter: "drop-shadow(0px 4px 14.9px rgba(0,0,0,0.25))",
                }}
                onClick={() => setOpenMenu(v => !v)}
            >
                <div className="w-[120px] h-[43px] absolute left-[-1.5px] top-[-1.5px] rounded-[78px] bg-gradient-to-r from-main-500 to-main-black z-0"></div>
                <PlusIcon className="absolute left-6 top-[11px] w-5 h-5 text-white z-10" />
                <p className="w-[34px] h-[22px] absolute left-[57px] top-2.5 text-base font-medium text-center text-white z-10 flex items-center justify-center">
                    New
                </p>
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
