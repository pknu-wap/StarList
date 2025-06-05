import React, { useState, useEffect } from "react";
import DropDown from "./DropDown";

// AddItemModal 컴포넌트: 항목을 추가하는 모달창
const AddItemModal = ({
    title, // 모달 상단 제목
    icon: Icon, // 모달 상단 아이콘
    fields, // 입력 필드 정보 배열 [{ name, label, placeholder }]
    tree, // 위치 선택용 트리 구조 배열
    isLoading = false, // 로딩 상태
    defaultValues = {}, // 초기 입력 값
    defaultLocation, // 초기 위치 값
    buttonText = "추가하기", // 버튼 텍스트
    onSubmit, // 제출 시 호출할 콜백
    onClose, // 모달 닫기 콜백
}) => {
    // form 상태 초기화: fields 배열을 순회하며 name을 키로, defaultValues에서 값 가져오거나 빈 문자열로 설정
    const [form, setForm] = useState(
        fields.reduce((acc, cur) => ({ ...acc, [cur.name]: defaultValues[cur.name] || "" }), {}),
    );

    // 위치 상태 초기화: defaultLocation이 있으면 사용, 없으면 tree 첫 번째 항목
    const [location, setLocation] = useState(defaultLocation || (tree && tree[0] ? tree[0] : null));

    // 에러 메시지 상태
    const [errorMsg, setErrorMsg] = useState("");

    // tree가 변경될 때 실행되는 effect
    useEffect(() => {
        if (!tree || !tree.length) return;
        // 현재 location이 없거나 tree에 없는 경우, tree[0]으로 설정
        if (!location || !tree.some((item) => item.id === location.id)) {
            setLocation(tree[0]);
        }
    }, [tree]);

    // 입력값 변경 핸들러
    const handleChange = (e) => {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
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
    if (isLoading)
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-start bg-black bg-opacity-50">
                <div className="flex h-[90%] max-h-[537px] w-[90%] max-w-[624px] items-center justify-center rounded-[20px] bg-white text-lg">
                    로딩 중...
                </div>
            </div>
        );

    // 모달 UI
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div
                className={`relative w-[90%] max-w-[424px] rounded-[20px] bg-white sm:w-[80%] sm:max-w-[624px] sm:rounded-[30px]`}
                style={{ boxShadow: "0px 2.46px 17.33px 0 rgba(0,0,0,0.25)" }}
            >
                {/* 헤더 영역: 아이콘, 제목, 닫기 버튼 */}
                <div className="relative mb-[32px] mt-[32px] flex items-center justify-center space-x-2 px-6 sm:mb-[40px] sm:mt-[49px] sm:space-x-4 sm:px-12">
                    {Icon && <Icon className="h-8 w-8 text-main-500" />}
                    <span className="ml-[32px] font-sans text-[20px] font-semibold text-black sm:ml-[64px] sm:text-[27px]">
                        {title}
                    </span>
                    <button
                        className="absolute right-[16px] text-2xl text-gray-400 hover:text-gray-600 sm:right-[32px]"
                        onClick={onClose}
                        style={{ top: "-35px" }}
                    >
                        ✕
                    </button>
                </div>

                {/* 폼 영역 */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center gap-6 px-[60px] pb-[24px] sm:gap-[21px] sm:px-[50px] sm:pb-8"
                >
                    {/* 동적 필드 렌더링 */}
                    {fields.map(({ name, label, placeholder }) => (
                        <div key={name} className="mb-6 flex flex-row items-center">
                            <label className="pr-[21px] font-sans text-[18px] font-medium text-black sm:text-2xl">
                                {label}
                            </label>
                            <input
                                name={name}
                                type="text"
                                value={form[name]}
                                onChange={handleChange}
                                placeholder={placeholder}
                                className={`h-[60px] w-[300px] flex-1 rounded-[12px] bg-gray-50 px-4 text-[16px] sm:h-[61px] sm:w-[429px] sm:rounded-[18px] sm:px-6 sm:text-[22px]`}
                                required
                            />
                        </div>
                    ))}

                    {/* 폴더 선택 드롭다운 */}

                    <div className="flex items-center">
                        <label className="whitespace-nowrap pr-[21px] font-sans text-[18px] font-medium text-black sm:text-2xl">
                            위치
                        </label>
                        <div className="flex-1">
                            <DropDown options={tree} selected={location} setSelected={setLocation} />
                        </div>
                    </div>

                    {/* 오류 메시지 출력 */}
                    {errorMsg && <div className="text-base text-red-500">{errorMsg}</div>}

                    {/* 제출 버튼 */}
                    <button
                        type="submit"
                        className={`mt-3 h-[50px] w-[320px] cursor-pointer rounded-[12px] bg-gradient-to-r from-main-500 to-main-black font-sans text-[18px] font-bold text-white shadow-[0px_2px_14px_0px_rgba(0,0,0,0.25)] transition-transform duration-150 hover:scale-105 active:scale-95 sm:h-[70px] sm:w-[344px] sm:rounded-[18px] sm:text-[23px]`}
                    >
                        {buttonText}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItemModal;
