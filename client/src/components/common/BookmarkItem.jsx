// 북마크 하나를 보여주는 화면 구성 컴포넌트
// props를 통해 전달받은 데이터(title, url, dateAdded)를 화면에 표시
const BookmarkItem = ({ title, url, dateAdded }) => {
    return (
        <div className="border p-4 rounded-lg shadow hover:bg-gray-50 transition">
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-lg font-medium">
                {title}
            </a>
            <p className="text-sm text-gray-500">{new Date(dateAdded * 1000).toLocaleString()}</p>
        </div>
    );
};

export default BookmarkItem;
