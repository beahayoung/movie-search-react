import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();

    }
    return (
        <div className='login-page'>
            <div className='login-card'>
                <div className='title-wrap'>
                <h1 className='login-title'>로그인</h1>
                <p className='login-subtitle'>다시 만나서 반가워요!</p>
                </div>

                <form className='login-form' onSubmit={handleSubmit}>
                    <div className='input-group'>
                        <label htmlFor='email'>이메일</label>
                        <input id='email' type='email' placeholder='you@example.com' value={email} onChange={(e)=> setEmail(e.target.value)} required/>
                    </div>
                    <div className='input-group'>
                        <label htmlFor='password'>비밀번호</label>
                        <input id='password' type='password' placeholder='비밀번호 입력' value={password} onChange={(e)=> setPassword(e.target.value)} required/>
                    </div>
                    <button type='submit' className='login-submit'>로그인</button>
                </form>
                <p className='login-switch'>계정이 없으신가요? <Link to='/signup'>회원가입</Link></p>
            </div>
            
        </div>
    );
};

export default Login;