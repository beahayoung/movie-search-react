import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faAngleDown, faCircleCheck, faCheck } from '@fortawesome/free-solid-svg-icons';

const agreementList = [
    {
        name: "terms",
        label: "(필수) 이용약관 동의",
        text: (
            <>
                1. 수집 항목: 이메일, 비밀번호, 닉네임<br /><br />2. 수집 목적: 회원가입 및 서비스 이용<br /><br />3. 보유 기간: 회원 탈퇴 시까지 (탈퇴 후 지체 없이 파기)<br /><br />4. 동의를 거부할 권리가 있으며, 동의하지 않을 경우 회원가입이 제한됩니다.
            </>
        )
    },
    {
        name: "privacy",
        label: "(필수) 개인정보 처리방침 동의",
        text: (
            <>
                제1조 (목적)<br />이 약관은 VOLT 서비스 이용과 관련하여 회사와 회원 간의 권리, 의무를 규정합니다.<br /><br />제2조 (회원가입)<br />이용자는 이 약관에 동의함으로써 회원가입을 신청할 수 있습니다.<br /><br />제3조 (회원의 의무)<br />회원은 타인의 정보를 도용하거나 허위 정보를 등록해서는 안 됩니다.<br /><br />제4조 (서비스 이용 제한) 회원이 약관을 위반할 경우 서비스 이용이 제한될 수 있습니다.
            </>
        )
    },
];

const Term = () => {
    const [agreements, setAgreements] = useState({
        terms: false,
        privacy: false,
    });
    const [openItems, setOpenItems] = useState({})
    const [showMoreItems, setShowMoreItems] = useState({})

    const handleAllAgree = (checked) => {
        const updated = {};
        Object.keys(agreements).forEach((key) => {
            updated[key] = checked;
        });
        setAgreements(updated);
    };

    const handleSingleAgree = (key, checked) => {
        setAgreements({ ...agreements, [key]: checked });
    };
    const isAllChecked = Object.values(agreements).every((v) => v === true);
    const toggleOpen = (name) => {
        setOpenItems({ ...openItems, [name]: !openItems[name] })
    }
    const toggleShowMore = (name) => {
        setShowMoreItems({ ...showMoreItems, [name]: !showMoreItems[name] })
    }
    return (
        <div className='term_page'>
            <div className='vort_logo'>
                <Link to="/">
                    <FontAwesomeIcon icon={faBolt} style={{ color: '#7c5cea' }} />VOLT
                </Link>
            </div>
            <div className='term_wrap'>
                <h2 className='term_tit'>회원가입을 위한 약관 동의가 필요해요</h2>
                <form className='term_check'>
                    <label className='agree-all'>
                        <input type='checkbox' aria-checked={isAllChecked} checked={isAllChecked} onChange={(e) => handleAllAgree(e.target.checked)} />
                        <FontAwesomeIcon icon={faCircleCheck} />
                        전체 동의합니다.
                        <span className='all_alert'>체크 시 이용약관과 개인정보 처리방침 모두에 동의합니다.</span>
                    </label>

                    {
                        agreementList.map((item) => (
                            <div className='check_term_wrap' key={item.name}>
                                <div className='check_label_head'>
                                    <label className={`${item.name}_wrap`}>
                                        <input
                                            type="checkbox"
                                            checked={agreements[item.name]}
                                            aria-checked={agreements[item.name]}
                                            onChange={(e) => handleSingleAgree(item.name, e.target.checked)}
                                        />
                                        <FontAwesomeIcon icon={faCheck} aria-hidden="true" />
                                        {item.label}
                                    </label>
                                    <button type='button' aria-expanded={openItems[item.name]} className={`label_content_btn ${openItems[item.name] ? "rotated":""}`} onClick={() => toggleOpen(item.name)}>
                                        <FontAwesomeIcon icon={faAngleDown} style={{ color: "rgb(255, 255, 255)" }} aria-hidden="true" />
                                    </button>
                                </div>
                                <div className={`label_content ${openItems[item.name] ? "show":""}`}>
                                    <div className={`content_wrap ${showMoreItems[item.name]?"long":""}`}>
                                        {item.text}
                                    </div>
                                    <button type='button' className='more_btn' aria-expanded="false" onClick={() => toggleShowMore(item.name)}>
                                        {showMoreItems[item.name] ? "접기":"더보기"}
                                        <FontAwesomeIcon icon={faAngleDown} style={{ color: "rgb(255, 255, 255)" }} className={showMoreItems[item.name] ? "rotated":""} aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </form>
            </div>
            <button type='button' className='next_btn' disabled={!isAllChecked} >
                <Link to='/signup'>다음</Link>
            </button>
        </div>
    );
};

export default Term;