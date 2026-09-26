import axios from '../api/axios';
import { useEffect, useRef, useState} from 'react';
import requests from '../api/request';
import gsap from "gsap";
import { Navigation, Pagination , A11y, Autoplay, FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/free-mode';
const Banner = () => {
    const [movies, setMovies] = useState([]);
    const titleRef = useRef();
    const [activeIndex, setActiveIndex] = useState(0);
    
    useEffect(()=> {
        fetchData();
    },[])

    const fetchData = async () => {
        // 현재상영중인 영화정보 가져오기
        const request = await axios.get(requests.fetchNowPlaying);
        setMovies(request.data.results);
    }
    useEffect(()=> {
        if(titleRef.current) {
            gsap.fromTo(titleRef.current, {},{});
        }
        
    },[activeIndex])
    
    return (
        <div className='banner__wrap'>
           <Swiper modules={[Autoplay, Pagination, Navigation]} slidesPerView={"auto"}  loop={true} autoplay={{delay:3000}} onSlideChange={(swiper)=> setActiveIndex(swiper.realIndex)} slidesPerView={1.1} pagination={{ clickable: true }} centeredSlides={true} spaceBetween={25} navigation>
              {movies.map((movie)=> (
                <SwiperSlide key={movie.id} className='banner' style={{background:`url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")no-repeat center/100%`}}>
                   <div className='banner__contents'>
                       <h2 className='banner__title'>{movie.title || movie.name || movie.original_name}</h2>
                       <h3 className='banner__description'>{movie.overview}</h3>
                    </div>   
                </SwiperSlide>
              ))}
           </Swiper>

          
        </div>
        
    );
};

export default Banner;