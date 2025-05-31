const AUTH_START_URI = import.meta.env.VITE_GOOGLE_AUTH_URI;

const GoogleLoginButton = () => {
    const handleGoogleLogin = () => {
        // Google OAuth 로그인 페이지로 이동
        window.location.href = AUTH_START_URI;
    };

    return (
        <div
            className="
                    w-60 h-11 mt-2 mr-2
                    rounded-3xl border-[3px] border-white 
                    flex items-center justify-center cursor-pointer
                    hover:bg-violet-50 hover:border-main-200
                    group    
                    transition-colors duration-500 ease-in-out
                    active:scale-95 active:transition-transform active:duration-400
                "
            onClick={handleGoogleLogin}
        >
            <div className="
                        text-xl font-bold leading-loose
                        text-white group-hover:text-main-600
                        transition-colors duration-500
                        select-none
                    "
            >
                Google로 로그인
            </div>
        </div>
    );
};

export default GoogleLoginButton;
