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
const genreTabs = [
    { name: "드라마", url: requests.fetchDrama }, 
    { name: "로맨스", url: requests.fetchRomanceMovies },
    { name: "코미디", url: requests.fetchComedyMovies },
    { name: "애니메이션", url: requests.fetchAnimation },
    { name: "스릴러", url: requests.fetchThriller },
    { name: "미스터리", url: requests.fetchMystery },
    { name: "모험", url: requests.fetchAdventure },
    { name: "액션", url: requests.fetchActionMovies },
    { name: "판타지", url: requests.fetchFantasy },
    { name: "SF", url: requests.fetchSF },
    { name: "공포(호러)", url: requests.fetchHorrorMovies },
    { name: "다큐멘터리", url: requests.fetchDocumentaries },
];
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
        // 여러 영화중 영화 하나의 id을 가져오기
        // const movieId = request.data.results[
        //     Math.floor(Math.random()*request.data.results.length)
        // ].id;

        // 특정 영화의 더 상세한 정보를 가져오기(비디오 정보도 포함)
        // const {data:movieDetail} = await axios.get(`movie/${movieId}`, {
        //   params:{append_to_response:"videos"},
        // })
    }
    useEffect(()=> {
        if(titleRef.current) {
            gsap.fromTo(titleRef.current, {},{});
        }
        
    },[activeIndex])
    // const truncate = (str, n) => {
        //     return str?.length > n ? str.substr(0, n-1) + "...":str;
        // }
        console.log(movies.overview);
    const handleGenreClick = (genre) => {

    }
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

           <Swiper className={'menu_wrap_list'} modules={[Navigation, FreeMode]} loop={false} slidesPerView="auto" spaceBetween={10} freeMode={true} navigation={true} spaceBetween={15} slidesPerView="auto">
                {genreTabs.map((genre, idx)=>(
                    <SwiperSlide key={genre.name} style={{width:"auto"}}>
                        {genre.name}
                        {/* <button type='button' className='list_item' onClick={()=>handleGenreClick(genre)}>
                        </button> */}
                    </SwiperSlide>
                ))}
  
        </Swiper>
        </div>
        
    );
};

export default Banner;