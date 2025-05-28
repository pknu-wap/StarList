import React, { useState, useRef, useEffect } from "react";
import AddSelectMenu from "./AddSelectMenu";
import AddBookmarkModal from "../modal/AddBookmarkModal";
import AddFolderModal from "../modal/AddFolderModal";

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
                className="w-[48px] h-[48px] bg-gradient-to-r from-[#7349D6] to-[#1A1A1A] rounded-full shadow flex items-center justify-center text-white text-xl"
                onClick={() => setOpenMenu(v => !v)}
            >
                +
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
}

export default AddButton;