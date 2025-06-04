const AUTH_START_URI = import.meta.env.VITE_GOOGLE_AUTH_URI;

const GoogleLoginButton = () => {
    const handleGoogleLogin = () => {
        // Google OAuth 로그인 페이지로 이동
        window.location.href = AUTH_START_URI;
    };

    return (
        <div
            className="active:duration-400 group mr-2 mt-2 flex h-11 w-60 cursor-pointer items-center justify-center rounded-3xl border-[3px] border-white transition-colors duration-500 ease-in-out hover:border-main-200 hover:bg-violet-50 active:scale-95 active:transition-transform"
            onClick={handleGoogleLogin}
        >
            <div className="select-none text-xl font-bold leading-loose text-white transition-colors duration-500 group-hover:text-main-600">
                Google로 로그인
            </div>
        </div>
    );
};

export default GoogleLoginButton;
