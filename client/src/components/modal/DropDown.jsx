import { useState, useRef, useEffect } from "react";

const DownArrow = () => (
    <svg
        width={13}
        height={10}
        viewBox="0 0 13 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block"
        preserveAspectRatio="none"
    >
        <path
            d="M6.84766 9.88867L0.785479 0.138672H12.9098L6.84766 9.88867Z"
            fill="#4D4A57"
        />
    </svg>
);

const UpArrow = () => (
    <svg
        width={14}
        height={11}
        viewBox="0 0 14 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block"
        preserveAspectRatio="none"
    >
        <path
            d="M7 10.7354L0.937822 0.985352H13.0622L7 10.7354Z"
            fill="#4D4A57"
        />
    </svg>
);

// DropDown 컴포넌트: 폴더 트리 구조를 드롭다운 형태로 보여주고 선택할 수 있는 UI
const DropDown = ({ options, selected, setSelected }) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef(null);

    // 외부 클릭 시 닫기
    useEffect(() => {
        const handler = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div ref={containerRef} className="relative w-[429px]">
            {/* 1) 현재 선택된 상태 */}
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="
          flex items-center justify-between
          w-full h-[61px]
          bg-[#f4f3f9]
          rounded-[13px]
          px-4
          cursor-pointer
        "
            >
                <span className="text-[22px] text-[#4d4a57]">{selected.name}</span>
                <DownArrow />
            </button>

            {/* 2) 확장된 상태 */}
            {open && (
                <div
                    className="
            absolute left-0 top-[61px]
            w-full h-[151px]
            bg-[#f4f3f9]
            rounded-[13px]
            overflow-hidden
            shadow-md
            z-10
          "
                >
                    {options.map((opt, i) => (
                        <button
                            key={opt.id}
                            type="button"
                            onClick={() => {
                                setSelected(opt);
                                setOpen(false);
                            }}
                            className={`
                flex items-center justify-between
                w-full h-[45px]
                px-4
                text-[22px] text-[#4d4a57]
                ${i < options.length - 1 ? "" : ""}
                hover:bg-[#e8e6f2]
                cursor-pointer
              `}
                        >
                            <span>{opt.name}</span>
                            {selected.id === opt.id ? <UpArrow /> : <DownArrow />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DropDown;
