import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faCircleXmark, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [idfocused, setidFocused] = useState(false);
    const [passfocused, setpassFocused] = useState(false);
    const [ishide, sethide] = useState(false);
    const [keep, setkeep] = useState(false);

    const idHasLabel = idfocused || email.length > 0;
    const passHasLabel = passfocused || password.length > 0;

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    const handleclearInputId = () => {
        setEmail("");
    }
    const handleclearInputpass = () => {
        setPassword("");
    }

    const passhideoff = () => {
        sethide(!ishide);
    }
    const handlefocus = (e) => {
        
        if(e.target.id == "email") {
            setidFocused(true)
        } else {
            setpassFocused(true)
        }
        
    }
    const handleBlurCheck = (e) => {
            console.log("blur 발생:", e.target.id, "value:", e.target.value, "length:", e.target.value.length);
        if(e.target.id == "email") {
            setidFocused(false)
        } else {
            setpassFocused(false)
        }
    }
    return (
        <div className='login-page'>
            <div className='vort_logo'>
                <Link to="/">
                    <FontAwesomeIcon icon={faBolt} style={{ color: '#7c5cea' }} />VOLT
                </Link>
            </div>
            <div className='login-card'>

                <form className='login-form' onSubmit={handleSubmit}>
                    <div className={`input-group id ${idfocused ? "focus" : ""} ${idHasLabel ? "has_input":""}`}>
                        <label htmlFor='email'>이메일 주소</label>
                        <div className='input_wrap'>
                            <input id='email' type='email' className='intext' onFocus={handlefocus} onBlur={handleBlurCheck} value={email} onChange={(e) => setEmail(e.target.value)} required />
                            {email.length > 0 &&
                                <button type='button' className='email_clear_btn' onClick={handleclearInputId} onMouseDown={(e) => e.preventDefault()}>
                                    <FontAwesomeIcon icon={faCircleXmark} />
                                </button>
                            }
                        </div>
                    </div>
                    <div className={`input-group pass ${passfocused ? "focus" : ""} ${passHasLabel ? "has_input":""}`}>
                        <label htmlFor='password'>비밀번호</label>
                        <div className='input_wrap'>
                            <input id='password' type={ishide ? "text":"password"} className='intext' value={password} onFocus={handlefocus} onBlur={handleBlurCheck} onChange={(e) => setPassword(e.target.value)} required />
                            {password.length > 0 &&
                                <>
                                    <button type='button' className='pass_hide_off' onClick={passhideoff} onMouseDown={(e) => e.preventDefault()}>
                                        <FontAwesomeIcon icon={faEyeSlash} />
                                    </button>
                                    <button type='button' className='pass_clear_btn' onClick={handleclearInputpass} onMouseDown={(e) => e.preventDefault()}>
                                        <FontAwesomeIcon icon={faCircleXmark} />
                                    </button>

                                </>

                            }

                        </div>
                    </div>
                    <div className='login-check'>
                        <input type='checkbox' id='login_check' aria-checked={keep} value={keep? "on" : "off"} checked={keep} onChange={(e)=> setkeep(e.target.checked)}/>
                        <label htmlFor='login_check' className='check_label'>로그인 상태 유지</label>
                    </div>
                    <button type='submit' className='login-submit'>로그인</button>
                </form>
            </div>
            <ul className='search_list'>
                <li>비밀번호 찾기</li>
                <li><Link to='/term'>회원가입</Link></li>
            </ul>

        </div>
    );
};

export default Login;