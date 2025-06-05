import React from "react";

function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center pt-4 pb-4">
            <h2 className="text-3xl font-bold mb-8 mt-8 text-black text-center">
                Starlist에 로그인 하시겠습니까?
            </h2>
            <button
                className="mt-2 w-64 h-14 rounded-[2rem] bg-gradient-to-r from-[#836fff] to-[#1a1a1a] shadow-md text-white text-xl font-semibold transition hover:brightness-105"
                style={{ boxShadow: "0 4px 18px 0 rgba(160, 116, 255, 0.15)" }}
            >
                Go
            </button>
        </div>
    );
}

export default LoginPage;
