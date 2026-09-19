import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';

const Signup = () => {
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();

    }
    return (
        <div className='auth-page'>
                <div className='vort_logo'>
                <Link to="/">
                    <FontAwesomeIcon icon={faBolt} style={{ color: '#7c5cea' }} />VOLT
                </Link>
            </div>
            <div className='auth-card'>
                <h2 className='auth-tit'>닉네임 입력해주세요.</h2>
                <form className='auth-form' onSubmit={handleSubmit}>
                    <div className='input-group'>
                        <label htmlFor='nickname'>닉네임</label>
                        <div className='input_wrap'>
                        <input id='nickname' type='text' placeholder='표시될 이름' value={nickname} onChange={(e) => setNickname(e.target.value)} required />
                        <p className='alert'>8자 이내로 입력해주세요.</p>
                        </div>
                    </div>
                    <div className='input-group'>
                        <label htmlFor='email'>이메일</label>
                        <input id='email' type='email' placeholder='you@example.com' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className='input-group'>
                        <label htmlFor='password'>비밀번호</label>
                        <input id='password' type='password' placeholder='비밀번호 입력' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className='input-group'>
                        <label htmlFor='confirmPassword'>비밀번호 확인</label>
                        <input id='confirmPassword' type='password' placeholder='비밀번호을 한 번 더 입력해주세요' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>
                    <div className='button_wrap'>
                        <button type='button' className='auth-submit'>이전</button>
                        <button type='button' className='auth-submit'>다음</button>
                        <button type='submit' className='auth-submit'>가입 하기</button>
                    </div>
                </form>
            </div>
                <p className='auth-switch'>이미 계정이 있으신가요? <Link to='/login'>로그인</Link></p>
        </div>
    )
};

export default Signup;