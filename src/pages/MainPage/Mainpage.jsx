import Banner from '../../components/Banner';
import Row from '../../components/Row';
import Tab from '../../components/Tab';
import styled from "styled-components";
import requests from '../../api/request';
import { Navigation, Pagination, A11y, Autoplay, FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesUp } from '@fortawesome/free-solid-svg-icons';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/free-mode';
import { useEffect, useState } from 'react';

const Mainpage = () => {
    const [show, setShow] = useState(false);
    const [receivedData, setRecivedData] = useState(false);
    const handleDataFromChild = (data) => {
        setRecivedData(data);
    }
    useEffect(()=> {
        const handleScroll = ()=> {
            setShow(window.scrollY < 64)
        }
        window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    },[])
    const scrolltoTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });  
    }
    return (
        <div>
            <Banner />
            <Tab sendData={handleDataFromChild}/>
            {
                !receivedData&& (
                    <>
                    <Row title='NETFLIX ORLGINALS' id='NO' fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
                    <Row title='Trending Now' id='TN' fetchUrl={requests.fetchTrending} />
                    <Row title='Top Rated' id='TR' fetchUrl={requests.fetchTopRated} />
                    <Row title='Action Movies' id='AM' fetchUrl={requests.fetchActionMovies} />
                    <Row title='Comedy Movies' id='CM' fetchUrl={requests.fetchComedyMovies} />
                    </>
                ) 
            }
            {
                !show && 
            <TopButton type='button' className='top_btn' onClick={scrolltoTop} aria-label="맨 위로 이동"><FontAwesomeIcon icon={faAnglesUp} /></TopButton>
            }
        </div>
    );
};

export default Mainpage;

const TopButton = styled.button`
cursor:pointer;
width:80px;
height:80px;
bottom: 64px;
right:20px;
z-index:999999999999;
box-shadow: 0px 7px 10px rgba(0, 0, 0, 0.3);
background:#7c5cea;
color:#fff;
position: fixed;
font-size:2rem;
border-radius:80px;
`