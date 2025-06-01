// 시작 페이지의 목업 컴포넌트
const MockUp = () => {
    return (
        <div className="w-[1399px] h-[803.50px] mt-[120px] relative">
            {/* 상단바 */}
            <div className="
                        w-full h-14 bg-zinc-200/60 
                        rounded-tl-[20px] rounded-tr-[20px] 
                        shadow-[0px_0px_90px_0px_rgba(0,0,0,0.25)]
                    "
            >

            </div>

            {/* 창 */}
            <div className="
                    justify-center relative
                    w-full h-[793px]
                    bg-gradient-to-r from-[#fffafe] to-[#eee8fe]
                    rounded-bl-[20px] rounded-br-[20px]
                "
            >
                <div className="w-16 h-20 left-[1086px] top-[150px] absolute bg-violet-100" />
                <div className="w-28 h-28 left-[1179px] top-[520px] absolute bg-violet-100 rounded-full" />
                <div className="w-28 h-28 left-[226px] top-[623px] absolute bg-violet-50 rounded-full" />
                <div className="w-16 h-16 left-[121px] top-[520px] absolute bg-fuchsia-50 rounded-full" />
                <div className="w-44 h-44 left-[182px] top-[106px] absolute bg-gradient-to-r from-purple-50 to-purple-100 rounded-full" />
            </div>
        </div>

    );
}

export default MockUp;