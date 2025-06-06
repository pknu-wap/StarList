// 시작 페이지의 목업 컴포넌트
import Slider from "./Slider";

const MockUp = () => {
    const ColorBall = ({ color }) => {
        return <div className={`h-3 w-3 rounded-full ${color}`} />;
    };

    const Book = () => {
        return (
            <svg
                width={22}
                height={22}
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
            >
                <path
                    d="M7.57182 1.40039V20.6004M16.4861 9.62896H11.6861M16.4861 5.51468H11.6861M4.14325 5.51468H1.40039M4.14325 9.62896H1.40039M4.14325 13.7432H1.40039M5.51468 20.6004H17.8575C19.3724 20.6004 20.6004 19.3724 20.6004 17.8575V4.14325C20.6004 2.62841 19.3724 1.40039 17.8575 1.40039H5.51468C3.99984 1.40039 2.77182 2.62841 2.77182 4.14325V17.8575C2.77182 19.3724 3.99984 20.6004 5.51468 20.6004Z"
                    stroke="#373542"
                    stroke-width={2}
                    stroke-linecap="round"
                />
            </svg>
        );
    };

    const Arrow = ({ d, stroke }) => {
        return (
            <div>
                <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative h-6 w-6"
                    preserveAspectRatio="none"
                >
                    <path d={d} stroke={stroke} stroke-width={2} stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
        );
    };

    const Share = () => {
        return (
            <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative h-6 w-6"
                preserveAspectRatio="none"
            >
                <path
                    d="M4 15.2044V18.8925C4 19.4514 4.21071 19.9875 4.58579 20.3827C4.96086 20.778 5.46957 21 6 21H18C18.5304 21 19.0391 20.778 19.4142 20.3827C19.7893 19.9875 20 19.4514 20 18.8925V15.2044M12.0007 14.9425L12.0007 3M12.0007 3L7.42931 7.56318M12.0007 3L16.5722 7.56318"
                    stroke="#373542"
                    stroke-width={2}
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        );
    };

    const Plus = () => {
        return (
            <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative h-6 w-6"
                preserveAspectRatio="none"
            >
                <path
                    d="M12.0008 4.7998L12.0008 19.1998M19.2008 11.9998L4.80078 11.9998"
                    stroke="#373542"
                    stroke-width={2}
                    stroke-linecap="round"
                />
            </svg>
        );
    };

    const Copy = () => {
        return (
            <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative h-6 w-6"
                preserveAspectRatio="none"
            >
                <path
                    d="M20 13.1251L20 6.00003C20 4.34317 18.6568 3.00002 17 3.00003L9.875 3.00012M14 21.0001L7.25 21.0001C6.00736 21.0001 5 19.9928 5 18.7501L5 9.00012C5 7.75747 6.00736 6.75011 7.25 6.75011L14 6.75011C15.2426 6.75011 16.25 7.75747 16.25 9.00011L16.25 18.7501C16.25 19.9928 15.2426 21.0001 14 21.0001Z"
                    stroke="#373542"
                    stroke-width={2}
                    stroke-linecap="round"
                />
            </svg>
        );
    };

    const Clip = (props) => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" fill="none" {...props}>
                <path
                    stroke="#1E1E1E"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="11"
                    d="M39.5004 52.2499a21.2503 21.2503 0 0 0 32.045 2.295l12.75-12.75a21.2503 21.2503 0 0 0-.2589-29.7887 21.25 21.25 0 0 0-29.7886-.2588l-7.31 7.2675m9.5625 24.735a21.2494 21.2494 0 0 0-32.045-2.295l-12.75 12.75a21.2498 21.2498 0 0 0 15.1002 36.0118 21.2503 21.2503 0 0 0 14.9473-5.9643l7.2675-7.2675"
                />
            </svg>
        );
    };

    const Rotate = () => {
        return (
            <svg
                width={15}
                height={15}
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative h-[15px] w-[15px]"
                preserveAspectRatio="none"
            >
                <path
                    d="M11.9555 9.0625C11.3193 11.0587 9.4971 12.5 7.34848 12.5C4.67074 12.5 2.5 10.2614 2.5 7.5C2.5 4.73858 4.67074 2.5 7.34848 2.5C9.14311 2.5 10.71 3.5055 11.5483 5M10.0758 5.625H12.5V3.125"
                    stroke="#8D87A2"
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        );
    };

    return (
        <div className="relative mt-[120px] h-[803.50px] w-[1399px]">
            {/* 상단바 */}
            <div className="flex h-14 w-full items-center justify-between rounded-tl-[20px] rounded-tr-[20px] bg-zinc-200/60 px-6 shadow-[0px_0px_90px_0px_rgba(0,0,0,0.25)]">
                {/* 좌 */}
                <div className="flex items-center space-x-5">
                    <div className="flex justify-center space-x-2">
                        <ColorBall color="bg-[#EE7373]" />
                        <ColorBall color="bg-[#FBF184]" />
                        <ColorBall color="bg-[#97E882]" />
                    </div>
                    <Book />
                    <div className="flex">
                        <Arrow d="M15 17L10 12L15 7" stroke="#373542" />
                        <Arrow d="M10 7L15 12L10 17" stroke="#BCB6CD" />
                    </div>
                </div>

                {/* 검색창 */}
                <div className="flex h-7 w-[622px] items-center justify-between rounded-[5px] bg-gray-50 px-[14px] text-center">
                    <div />
                    <p className="text-sans h-full w-[148px] text-center">www.starlist.com</p>
                    <Rotate className="" />
                </div>

                {/* 우 */}
                <div className="flex justify-between space-x-5">
                    <Share />
                    <Plus />
                    <Copy />
                </div>
            </div>

            {/* 창 */}
            <div className="relative h-[793px] w-full justify-center rounded-bl-[20px] rounded-br-[20px] bg-gradient-to-r from-[#fffafe] to-[#eee8fe]">
                {/* 배경 */}
                <div className="absolute left-[1086px] top-[150px] h-20 w-16 bg-violet-100" />
                <div className="absolute left-[1179px] top-[520px] h-28 w-28 rounded-full bg-violet-100" />
                <div className="absolute left-[226px] top-[623px] h-28 w-28 rounded-full bg-violet-50" />
                <div className="absolute left-[121px] top-[520px] h-16 w-16 rounded-full bg-fuchsia-50" />
                <div className="absolute left-[182px] top-[106px] h-44 w-44 rounded-full bg-gradient-to-r from-purple-50 to-purple-100" />

                <div className="relative flex h-full w-full flex-col items-center">
                    <Clip className="z-10 my-6 mt-[92px] h-24 w-24" />
                    <p className="select-none font-sans text-6xl font-extrabold leading-[96px] text-black">
                        Save Links into Folders
                    </p>
                    <p className="select-none text-center font-sans text-2xl font-medium leading-normal text-black">
                        바쁜 하루, 북마크는 Starlist가 관리해줄게요!
                    </p>
                    <Slider />
                </div>
            </div>
        </div>
    );
};

export default MockUp;
