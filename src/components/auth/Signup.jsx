import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faCircleXmark, faL } from '@fortawesome/free-solid-svg-icons';

const Signup = () => {
    const inputRef = useRef(null);
    
    const steps = [
        { name: "nickname", label: "닉네임", type: "text", placeholder: "닉네임", alert:"8자 이내로 입력해주세요.", maxLen:8},
        { name: "email", label: "이메일", type: "email", placeholder: "이메일", alert:"이메일 형식으로 입력해주세요.", maxLen:50},
        { name: "password", label: "비밀번호", type: "password", placeholder: "비밀번호 입력", alert:"8자 이내로 입력해주세요.", maxLen:8},
        { name: "confirmPassword", label: "비밀번호 확인", type: "password", placeholder: "비밀번호을 한 번 더 입력해주세요", alert:"비밀번호 같이 입력해주세요", maxLen:8},
    ]
    const [formData, setFormData] = useState({
        nickname: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [step, setStep] = useState(0);
    const [disable, setdisable] = useState(true);
    useEffect(()=> {
        if(inputRef.current) {
            inputRef.current.focus();
            setdisable(true)
        }
    }, [step])
    const valueForm = (name, value) => {
        setFormData({...formData, [name]:value});
        setdisable(false)
    }
    const onBlurhanedle = (length) => {
        if(length <=0) {
            setdisable(true);
        } else {
            setdisable(false);
        }
    }
    return (
        <div className='auth-page'>
            <div className='vort_logo'>
                <Link to="/">
                    <FontAwesomeIcon icon={faBolt} style={{ color: '#7c5cea' }} />VOLT
                </Link>
            </div>
            <div className='auth-card'>
                <h2 className='auth-tit'>{steps[step].label} 입력해주세요.</h2>
                <form className='auth-form' >
                    {
                        steps.slice(0, step + 1).map((item, index) => (
                            <div className={`input-group ${index<step?"completed":""}`} key={item.name}>
                                <label htmlFor={item.name} className='input_name'>{item.label}</label>
                                <div className='input_group_wrap'>
                                    <div className='input_wrap'>
                                    <input id={item.name} type={item.type} ref={index === step ? inputRef :null} maxLength={item.maxLen} name={item.name} placeholder={item.placeholder} value={formData[item.name]} onChange={(e)=>valueForm(item.name,e.target.value)} required onBlur={(e)=>onBlurhanedle(e.target.value.length)}/>
                                    <button type='button' className='input_clear_btn' onMouseDown={(e) => e.preventDefault()} onClick={()=>setFormData({...formData, [item.name]:""})}>
                                        <FontAwesomeIcon icon={faCircleXmark} />
                                    </button>
                                    </div>
                                    <p className='alert'>{item.alert}</p>
                                </div>
                            </div>
                        ))
                    }
                    <div className='button_wrap'>
                        
                        {step === steps.length-1 ?
                        <button type='submit' className='auth-submit' disabled={disable}>가입 하기</button>:<button type='button' disabled={disable} className='auth-submit next' onClick={() => setStep(step + 1)}>다음</button>
                        }
                    </div>
                </form>
            </div>
            <p className='auth-switch'>이미 계정이 있으신가요? <Link to='/login'>로그인</Link></p>
        </div>
    )
};

export default Signup;