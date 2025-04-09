import { Link } from 'react-router-dom'

const StartPage = () => {
    return (
        <div>
            <h1>로그인X 시 시작 페이지</h1>
            <Link to="/login" style={{ color: "blue" }}>로그인버튼</Link>
            <br />
            <Link to="/register" style={{ color: "blue" }}>회원가입버튼</Link>
        </div>
    );
};

export default StartPage;