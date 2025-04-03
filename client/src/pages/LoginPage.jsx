import { Link } from "react-router-dom";

const LoginPage = () => {
    return (
        <div>
            <h1>로그인 페이지</h1>
            <Link to="/" style={{ color: 'blue' }}>로그인 완료</Link>
        </div>
    );
};

export default LoginPage;