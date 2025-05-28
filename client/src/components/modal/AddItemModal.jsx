import React, { useState, useEffect } from "react";
import DropDown from "./DropDown"; //  props로 tree 넘겨서 사용

const AddItemModal = ({
    title,              // "새 북마크 추가", "새 폴더 추가" 등
    icon,               // svg 아이콘 컴포넌트
    fields,             // [{ name, label, placeholder }]
    tree,               // 폴더 트리 데이터 (없으면 위치 필드 생략)
    isLoading = false,
    defaultValues = {}, // { title: "", url: "", ... }
    defaultLocation,    // 최초 선택 폴더 (없으면 tree[0])
    buttonText = "추가하기",
    onSubmit,           // (form) => void | Promise<void>
    onClose,
}) => {
    // 입력값 state
    const [form, setForm] = useState(
        fields.reduce((acc, cur) => ({ ...acc, [cur.name]: defaultValues[cur.name] || "" }), {})
    );
    // 폴더 선택 state
    const [location, setLocation] = useState(defaultLocation || (tree?.[0] ?? null));
    const [errorMsg, setErrorMsg] = useState("");

    // tree가 바뀌면 첫 폴더 자동 선택
    useEffect(() => {
        if (tree && tree.length) {
            // location이 없거나, 현재 location이 tree 배열에 없으면 tree[0]으로 재설정
            if (!location || !tree.some(item => item.id === location.id)) {
                setLocation(tree[0]);
            }
        }
    }, [tree, location]);


    const handleChange = (e) => {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        try {
            await onSubmit({ ...form, location });  // 부모에서 넘겨준 onSubmit 
            onClose();
        } catch (err) {
            setErrorMsg(err.message || "오류가 발생했습니다.");
        }
    };

    // 로딩 처리
    if (isLoading) return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-[30px] w-[624px] h-[537px] flex items-center justify-center text-lg">로딩 중...</div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div
                className="w-[624px] relative rounded-[30px] bg-white"
                style={{ boxShadow: "0px 2.46px 17.33px 0 rgba(0,0,0,0.25)" }}
            >
                {/* 헤더 */}
                <div className="w-full h-[33px] flex items-center relative mt-[49px] mb-[40px]">
                    {icon}
                    <span className="ml-[64px] text-[27px] font-semibold text-black">{title}</span>
                    <button
                        className="absolute right-[32px] text-2xl text-gray-400 hover:text-gray-600"
                        onClick={onClose}
                        style={{ top: -35 }}
                    >✕</button>
                </div>
                {/* 폼 */}
                <form onSubmit={handleSubmit} className="px-12 pb-8 flex flex-col gap-8 relative">
                    {/* 필드 */}
                    {fields.map(({ name, label, placeholder }) => (
                        <div key={name}>
                            <label className="block text-2xl font-medium text-black mb-2">
                                {label}
                            </label>
                            <input
                                name={name}
                                type="text"
                                value={form[name]}
                                onChange={handleChange}
                                placeholder={placeholder}
                                className="w-full h-[61px] rounded-[18px] bg-[#f4f3f9] text-[22px] px-6"
                                required
                            />
                        </div>
                    ))}
                    {/* 폴더 드롭다운 */}
                    {tree && (
                        <div>
                            <label className="block text-2xl font-medium text-black mb-2">
                                위치
                            </label>
                            <DropDown options={tree} selected={location} setSelected={setLocation} />
                        </div>
                    )}
                    {/* 에러 메시지 */}
                    {errorMsg && (
                        <div className="text-red-500 text-base">{errorMsg}</div>
                    )}
                    {/* 제출 버튼 */}
                    <button
                        type="submit"
                        className="w-full h-[70px] rounded-[18px] bg-gradient-to-r from-[#7349D6] to-[#1A1A1A] text-[23px] font-bold text-white shadow mt-3"
                    >
                        {buttonText}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddItemModal;