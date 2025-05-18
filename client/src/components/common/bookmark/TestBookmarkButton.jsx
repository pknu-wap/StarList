import React from 'react';
import testAddBookmark from '../../../api/testAddBookmark';

const TestBookmarkButton = () => {
    return (
        <button
            onClick={testAddBookmark}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
            북마크 API 테스트
        </button>
    );
};

export default TestBookmarkButton;
