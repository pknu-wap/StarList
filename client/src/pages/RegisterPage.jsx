import { Link } from 'react-router-dom'
const RegisterPage = () => {
    return (
        <div>
            <h1>회원가입 페이지</h1>
            <Link to="/" style={{ color: 'blue' }}>회원가입 완료</Link>
        </div>
    );
};

export default RegisterPage;