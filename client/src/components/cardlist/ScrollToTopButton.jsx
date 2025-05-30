const Arrow = () => {
    return (
        <svg
            width={24}
            height={15}
            viewBox="0 0 24 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="z-50"
        >
            <path d="M2 13L12.1449 3L22 12.7143" stroke="white" stroke-width={3} stroke-linecap="round" />
        </svg>
    );
}

const ScrollToTopButton = () => {
    // 최상단으로 이동
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            onClick={scrollToTop}
            className="
                fixed bottom-8 right-8 z-40
                w-14 h-14 flex items-center justify-center
                rounded-full
                bg-main-500 text-white
                shadow-[0px_0px_15px_0px_rgba(0,0,0,0.60)]
                hover:bg-main-600 
                hover:shadow-[0px_0px_15px_0px_rgba(0,0,0,0.90)]
                transition
                cursor-pointer
            "
        >
            <Arrow />
        </button>
    );
};

export default ScrollToTopButton