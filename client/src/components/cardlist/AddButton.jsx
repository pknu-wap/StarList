import React, { useState } from 'react';
import AddBookMark from '../modal/AddBookMark';


const AddButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 창 오픈 여부

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <button
                onClick={handleOpenModal}
                className="add-bookmark-button"
            >
                북마크 추가
            </button>

            {isModalOpen && (
                <AddBookMark onClose={handleCloseModal} />
            )}
        </div>
    );
}

export default AddButton;