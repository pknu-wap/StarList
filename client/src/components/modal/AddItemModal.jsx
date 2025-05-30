import React, { useState, useEffect } from "react";
import DropDown from "./DropDown";

// AddItemModal 컴포넌트: 항목을 추가하는 모달창
const AddItemModal = ({
    title,             // 모달 상단 제목
    icon: Icon,              // 모달 상단 아이콘
    fields,            // 입력 필드 정보 배열 [{ name, label, placeholder }]
    tree,              // 위치 선택용 트리 구조 배열
    isLoading = false, // 로딩 상태
    defaultValues = {},// 초기 입력 값
    defaultLocation,   // 초기 위치 값
    buttonText = "추가하기", // 버튼 텍스트
    onSubmit,          // 제출 시 호출할 콜백
    onClose,           // 모달 닫기 콜백
}) => {
    // form 상태 초기화: fields 배열을 순회하며 name을 키로, defaultValues에서 값 가져오거나 빈 문자열로 설정
    const [form, setForm] = useState(
        fields.reduce((acc, cur) => ({ ...acc, [cur.name]: defaultValues[cur.name] || "" }), {})
    );

    // 위치 상태 초기화: defaultLocation이 있으면 사용, 없으면 tree 첫 번째 항목
    const [location, setLocation] = useState(
        defaultLocation || (tree && tree[0] ? tree[0] : null)
    );

    // 에러 메시지 상태
    const [errorMsg, setErrorMsg] = useState("");

    // tree가 변경될 때 실행되는 effect
    useEffect(() => {
        if (!tree || !tree.length) return;
        // 현재 location이 없거나 tree에 없는 경우, tree[0]으로 설정
        if (!location || !tree.some(item => item.id === location.id)) {
            setLocation(tree[0]);
        }
    }, [tree]);

    // 입력값 변경 핸들러
    const handleChange = (e) => {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    };

    // 폼 제출 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg(""); // 이전 에러 초기화

        // 위치가 없으면 에러 처리
        if (!location) {
            setErrorMsg("폴더를 선택하세요.");
            return;
        }
        try {
            // onSubmit 콜백 호출 (form과 location 전달)
            await onSubmit({ ...form, location });
            // 제출 성공 시 모달 닫기
            onClose();
        } catch (err) {
            // 에러 발생 시 메시지 설정
            setErrorMsg(err.message || "오류가 발생했습니다.");
        }
    };

    // 로딩 중일 때 렌더링되는 UI
    if (isLoading) return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-start items-center z-50">
            <div className="bg-white rounded-[20px] w-[90%] max-w-[624px] h-[90%] max-h-[537px] flex items-center justify-center text-lg">
                로딩 중...
            </div>
        </div>
    );

    // 모달 UI
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div
                className={`
                        bg-white
                        rounded-[20px] sm:rounded-[30px]
                        w-[90%] max-w-[424px]
                        sm:w-[80%] sm:max-w-[624px]
                        relative
                    `}
                style={{ boxShadow: "0px 2.46px 17.33px 0 rgba(0,0,0,0.25)" }}
            >
                {/* 헤더 영역: 아이콘, 제목, 닫기 버튼 */}
                <div className="
                            flex items-center justify-center relative 
                            mt-[32px] sm:mt-[49px] mb-[32px] sm:mb-[40px] 
                            px-6 sm:px-12
                            space-x-2 sm:space-x-4
                        "
                >
                    {Icon && <Icon className="w-8 h-8 text-main-500" />}
                    <span className="ml-[32px] sm:ml-[64px] text-[20px] sm:text-[27px] font-semibold text-black">
                        {title}
                    </span>
                    <button
                        className="absolute right-[16px] sm:right-[32px] text-2xl text-gray-400 hover:text-gray-600"
                        onClick={onClose}
                        style={{ top: "-35px" }}
                    >
                        ✕
                    </button>
                </div>

                {/* 폼 영역 */}
                <form onSubmit={handleSubmit}
                    className="
                            items-center 
                            px-[60px] sm:px-[50px] pb-[24px] sm:pb-8
                            flex flex-col gap-6 sm:gap-[21px]
                        "
                >
                    {/* 동적 필드 렌더링 */}
                    {fields.map(({ name, label, placeholder }) => (
                        <div
                            key={name}
                            className="flex flex-row items-center mb-6"
                        >
                            <label className="text-[18px] sm:text-2xl font-medium text-black pr-[21px]">
                                {label}
                            </label>
                            <input
                                name={name}
                                type="text"
                                value={form[name]}
                                onChange={handleChange}
                                placeholder={placeholder}
                                className={`
                                        flex-1
                                        w-[300px] sm:w-[429px]
                                        h-[60px] sm:h-[61px]
                                        rounded-[12px] sm:rounded-[18px]
                                        bg-gray-50
                                        text-[16px] sm:text-[22px]
                                        px-4 sm:px-6
                                    `}
                                required
                            />
                        </div>
                    ))}

                    {/* 폴더 선택 드롭다운 */}

                    <div className="flex items-center">
                        <label className="text-[18px] sm:text-2xl font-medium text-black pr-[21px] whitespace-nowrap">
                            위치
                        </label>
                        <div className="flex-1">
                            <DropDown options={tree} selected={location} setSelected={setLocation} />
                        </div>

                    </div>


                    {/* 오류 메시지 출력 */}
                    {errorMsg && (
                        <div className="text-red-500 text-base">
                            {errorMsg}
                        </div>
                    )}

                    {/* 제출 버튼 */}
                    <button
                        type="submit"
                        className={`
                            w-[320px] sm:w-[344px]
                            h-[50px] sm:h-[70px]
                            rounded-[12px] sm:rounded-[18px]
                            bg-gradient-to-r from-main-500 to-main-black
                            text-[18px] sm:text-[23px]
                            font-bold text-white
                            shadow-[0px_2px_14px_0px_rgba(0,0,0,0.25)]
                            mt-3
                            hover:scale-105 active:scale-95 transition-transform duration-150 cursor-pointer
                        `}
                    >
                        {buttonText}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddItemModal;
