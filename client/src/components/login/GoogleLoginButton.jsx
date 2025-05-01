import googleLogo from "../../assets/google.svg"
// 구글 로그인 버튼 컴포넌트
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID; // Google Cloud Console에서 발급받은 클라이언트 ID를 저장하는 변수
const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI; // 

const SCOPE = ['email', 'profile'].join(' '); // 구글로부터 요청할 정보들 => 이메일, 프로필 정보


const GoogleLoginButton = () => {
    // 로그인 버튼이 클릭됐을 때 실행될 함수 정의
    const handleGoogleLogin = () => {
        // 로그인 URL에 붙을 쿼리 파라미터들을 구성하는 객체
        const params = new URLSearchParams({
            client_id: clientId, // 내 앱의 클라이언트 ID
            redirect_uri: redirectUri, // 로그인 후 되돌아올 주소
            response_type: 'code', // Authorization Code Flow 사용
            scope: SCOPE,
            access_type: 'offline', // refresh_token도 함께 요청
            prompt: 'consent' // 로그인 할때마다 구글 동의 창을 띄움
        });

        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
        window.location.href = googleAuthUrl; // 함수가 실행되면 브라우저가 구글 로그인 페이지로 이동
    };

    // 위의 쿼리 파라미터를 URL뒤에 붙여서 전체 URL 생성

    return (
        <div
            className="flex items-center w-[249.53px] h-[74.86px] rounded-[31.39px] bg-[#e8e6f0] border-[4.02px] border-[#8d87a2] px-[20px] gap-[17px]
             hover:scale-105 active:scale-95 transition-transform duration-150 cursor-pointer"
            onClick={handleGoogleLogin}
        >
            <img src={googleLogo} className="w-[57.15px] h-[57.15px]" />
            <p className="text-[20px] font-Pretendard text-[#1a1a1a]">
                Google로 로그인
            </p>
        </div>


    );
}

export default GoogleLoginButton;