import { useEffect, useState, useRef } from 'react';
import axios from '../api/axios';
import requests from '../api/request';
import MovieModal from '../components/MovieModal/movieModal';
import { Navigation, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
const Row = ({isLargeRow, title, id, fetchUrl}) => {
    const [movies, setMovies] = useState([]);
    const rowPosterRef = useRef(null);
    const [modalOpen, isModalopen] = useState(false);
    const [movieSelected, setMovieSelected] = useState({});


    useEffect(()=> {
        fetchMovieData();
    },[])
    
    const fetchMovieData = async () => {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);

    }
    const handleScroll = (direction) => {
        if(!rowPosterRef.current) return

        const scrollAmoun = window.innerWidth - 80;
        rowPosterRef.current.scrollTo({
            left:rowPosterRef.current.scrollLeft + (direction === 'left' ? -scrollAmoun:scrollAmoun),
            bahavior:'smooth'
        })
    }
    const handleModal = (movie) => {
        isModalopen(true);
        setMovieSelected(movie);
    }
    return (
        <section className='row'>
            <h2>{title}</h2>
            <Swiper modules={[Navigation, Scrollbar, A11y]}
      slidesPerView={3}
      navigation
      pagination={{ clickable: false }}
      loop={true}
      breakpoints={{
        1378: {
            slidesPerView:6,
            slidesPerGroup:6
        },
        998:{
            slidesPerView:5,
            slidesPerGroup:5
        },
        625:{
            slidesPerView:4,
            slidesPerGroup:4
        },
        0:{
            slidesPerView:3,
            slidesPerGroup:3
        }
      }}
    >
                <div id={id} className='row__posters' ref={rowPosterRef}>
                    {movies.map((movie) => (
                        <SwiperSlide>
                            <img key={movie.id} className={`row__poster ${isLargeRow && "row__posterLarge"}`} src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} onClick={()=> handleModal(movie)}/>
                        </SwiperSlide>
                    ))}
                </div>
    
    </Swiper>

            {
                modalOpen && (
                    <MovieModal {...movieSelected} isModalopen={isModalopen}/>
                )
            }
        </section>
   
    );
};

export default Row;