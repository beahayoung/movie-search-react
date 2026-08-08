import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark, faCircleXmark, faBolt } from '@fortawesome/free-solid-svg-icons';

const Nav = () => {
    
    const [show, setShow] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [searchKing, setSearchKing] = useState([]);
    const [searchClick, setSearchClick] = useState(false);
    const [deletList, setDeletList] = useState(true);
    const navigate = useNavigate();
    
    useEffect(()=> {
        const handleScroll = () => {
            if(window.scrollY > 50) {
                setShow(true)
            } else {
                setShow(false)
            }
        }
        window.addEventListener("scroll",handleScroll);
        return ()=> {
            window.removeEventListener("scroll", handleScroll);
        }
    },[])
    const handlesearch = (e) => {
        e.preventDefault();
        navigate(`/search?q=${searchValue}`)
        setSearchClick(false);
        setSearchKing([...searchKing, searchValue]);
        setSearchValue("");
        setDeletList(false);
        
    }
    const handledelet = (e) => {
        e.preventDefault();
        setSearchKing([])
        setDeletList(true);
    }
    const handleking = (index) => {
        const newList = searchKing.filter((_, idx) => idx !== index);
        setSearchKing(newList);
        console.log(searchKing.length)
        if(searchKing.length <= 0) {
            setDeletList(true);
        } else {
            setDeletList(false);
        }
    }
    return (
        <nav className={`nav ${show ? "nav__black" : ""}`}>
            <h1 className='nav__logo'>
                <Link to='/'>
                
                <FontAwesomeIcon icon={faBolt} style={{ color: '#7c5cea' }} />
                VOLT
                </Link>
                </h1>
            <div className={`nav__right ${searchClick ? "active":""}`}>
                <button type="button" className="search__btn" onClick={()=>setSearchClick(!searchClick)}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} className='search'/>
                  <FontAwesomeIcon icon={faXmark} className='close'/>
                </button>
                <div className="search__wrap__body">
                    <div className='search__wrap'>
                    <input value={searchValue} className='nav__input' onChange={(e)=> setSearchValue(e.target.value)} type='text' placeholder='영화를 검색해 주세요!'/>
                    <button type='submit' className='srarch__btn__s' onClick={handlesearch}>
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                    </button>
                    </div>
                    <div className='search__king'>
                        <div className='search__top'>
                        <span className='search__tit'>최근 검색어</span>
                        <button className='king__delete' type='button' onClick={handledelet} disabled={deletList}>모두 지우기<FontAwesomeIcon icon={faCircleXmark} /></button>
                        </div>
                        <ul className='search__list'>
                            {searchKing.map((king, i)=> (
                                <li className='sear_item' key={i}>{king}<button type='button' onClick={()=> handleking(i)} className='king_close'><FontAwesomeIcon icon={faXmark} /></button></li>
                            ))}
                        </ul>
                    </div>
                </div>
                <button type='button' className='login_btn' onClick={()=> navigate('/login')}>로그인</button>
            {/* <img src='https://occ-0-4796-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41' alt='User logged' className='nav__avatar' /> */}
            </div>
        </nav>
    );
};

export default Nav;