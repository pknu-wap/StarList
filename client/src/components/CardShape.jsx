// 카드 컴포넌트
const BookmarkCard = () => {

    return (
        <div className={`relative w-full sm:max-w-[280px] md:max-w-[320px] lg:max-w-[366px] aspect-[3/2] 
                            rounded-[39px] bg-white shadow-card
                            p-4 flex flex-col justify-end group transition-colors duration-200
                            border border-gray-300
                            hover:bg-gradient-to-b hover:from-gray-200 hover:to-white
                            `}
        >
        </div>
    );
}
export default BookmarkCard;