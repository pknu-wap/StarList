import React from "react";

export function Loading() {
    return <p className="py-4 text-center">로딩중...</p>;
}

export function ErrorMessage({ code, message }) {
    let text;
    switch (code) {
        case "2002":
            text = "세션이 만료되었습니다. 다시 로그인 해주세요";
            break;
        case "3001":
            text = "아무 것도 없네요";
            break;
        default:
            text = `알 수 없는 오류: ${message}`;
    }
    return <p className="text-center text-2xl text-gray-300">{text}</p>;
}

export default function StatusView({ status, error, children }) {
    if (status === "loading") {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loading />
            </div>
        );
    }
    if (status === "error") {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <ErrorMessage code={error.code} message={error.message} />
            </div>
        );
    }
    return children;
}
