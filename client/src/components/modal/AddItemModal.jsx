import React, { useState, useEffect } from "react";
import DropDown from "./DropDown";

const AddItemModal = ({
    title,
    icon,
    fields,
    tree,
    isLoading = false,
    defaultValues = {},
    defaultLocation,
    buttonText = "추가하기",
    onSubmit,
    onClose,
}) => {
    const [form, setForm] = useState(
        fields.reduce((acc, cur) => ({ ...acc, [cur.name]: defaultValues[cur.name] || "" }), {})
    );
    const [location, setLocation] = useState(defaultLocation || (tree && tree[0] ? tree[0] : null));
    const [errorMsg, setErrorMsg] = useState("");

    // tree가 바뀌었을 때 location 값 유지, tree에 없는 경우에만 tree[0]로 이동
    useEffect(() => {
        if (!tree || !tree.length) return;
        if (!location || !tree.some(item => item.id === location.id)) {
            setLocation(tree[0]);
        }
    }, [tree]);


    const handleChange = (e) => {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        if (!location) {
            setErrorMsg("폴더를 선택하세요.");
            return;
        }
        try {
            await onSubmit({ ...form, location });
            onClose();
        } catch (err) {
            setErrorMsg(err.message || "오류가 발생했습니다.");
        }
    };

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
                    {tree && tree.length > 0 && (
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
