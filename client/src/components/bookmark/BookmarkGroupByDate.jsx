// 북마크 모음 컨포넌트 (메인화면에서 최근에 추가한 북마크로 띄워주기 위한 용도)
import BookmarkItem from "./BookmarkItem";

const BookmarkGroupByDate = ({ date, bookmarks }) => {
    return (
        <div className="w-full">
            <div className="w-full max-w-[1520px] mx-auto space-y-2">
                {/* 날짜 제목 */}
                <h2 className="text-lg font-semibold text-[16px] ml-[25px] mt-[60px]">{date}</h2>

                {/* 카드 배경 */}
                <div className="rounded-[39px] bg-[#4d4a57] px-[25px] py-[15px] flex flex-col gap-y-4">
                    {bookmarks.map((bm) => (
                        <BookmarkItem key={bm.id} {...bm} />
                    ))}
                </div>
            </div>
        </div>
    );
};


export default BookmarkGroupByDate;


