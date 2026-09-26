import api from '../api/axios';
import requests from '../api/request';
import styled from "styled-components";
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Navigation, Pagination, A11y, Autoplay, FreeMode } from 'swiper/modules';
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
const Tab = ({ sendData }) => {
    const [isgenre, setisgenre] = useState([]);
    const [selectOpen, setSelectOpen] = useState(false);
    const [tabClick, setTabClick] = useState(false);
    const [selectValue, setSelectValue] = useState("latest");

    const [currentGenre, setCurrentGenre] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const feachdata = async (genres) => {
        const apirequest = await api.get(genres.url, { params: { page: 1 } });
        setisgenre(apirequest.data.results);
        sendData(true);
        setTabClick(true);
        setCurrentGenre(genres);
        setPage(1);
        setTotalPage(apirequest.data.total_pages);
    }
    const loadMore = async () => {
        setLoading(true);
        try {
            const nextPage = page + 1;
            const apirequest = await api.get(currentGenre.url, { params: { page: nextPage } });
            setisgenre((prev) => {
                const ids = new Set(prev.map((m) => m.id));
                return [...prev, ...apirequest.data.results.filter((m) => !ids.has(m.id))];
            })
            setPage(nextPage);
        } finally {
            setLoading(false);
        }

    }
    const options = {
        latest: "최신 순",
        rating: "평점 순",
        popular: "인기 순"
    }
    const handleOptionValue = (value) => {
        setSelectValue(value);
        setSelectOpen(!selectOpen)
    }
    const sortedMovied = [...isgenre].sort((a, b) => {
        if (selectValue === "latest") {
            const dateA = a.release_date || a.first_air_date || "";
            const dateB = b.release_date || b.first_air_date || "";
            return dateB.localeCompare(dateA);        // 날짜 늦은 것 먼저
        } else if (selectValue === "rating") {
            return b.vote_average - a.vote_average;   // 평점 높은 것 먼저  
        } else if (selectValue === "popular") {
            return b.popularity - a.popularity;       // 인기 높은 것 먼저  
        }
        return 0;
    })
    return (
        <>
            <Swiper className={'menu_wrap_list'} modules={[Navigation, FreeMode]} loop={false} slidesPerView="auto" spaceBetween={10} freeMode={true} navigation={true}>
                {genreTabs.map((genre, idx) => (
                    <SwiperSlide key={genre.name} style={{ width: "auto" }}>
                        <button type='button' className='list_item' onClick={() => feachdata(genre, idx)}>
                            {genre.name}
                        </button>
                    </SwiperSlide>
                ))}

            </Swiper>
            {tabClick &&
                <GenreWrap>
                    <SelectWrap>
                        <OptionPick type='button' className='option_pick' aria-expanded={selectOpen} onClick={() => setSelectOpen(!selectOpen)}>
                            {options[selectValue]}
                            <FontAwesomeIcon icon={faCaretDown} /></OptionPick>
                        {selectOpen &&
                            <OptionWrap>
                                {
                                    Object.entries(options).map(([value, label]) => (
                                        <Option type='button' key={value} className={`option ${selectValue === value ? "pick" : ""}`} onClick={() => handleOptionValue(value)}>
                                            {label}
                                            {selectValue === value && <span className="sr-only">선택됨</span>}
                                        </Option>
                                    ))
                                }
                            </OptionWrap>
                        }
                    </SelectWrap>
                    <GenreListWrap>
                        {sortedMovied.map((genre) => (
                            <GenreImgWrap className={`genre_img_wrap ${genre.adult ? "adult" : ""}`} key={genre.id}>
                                <GenreListImg src={genre.poster_path ? `https://image.tmdb.org/t/p/original/${genre.poster_path}` : '/images/no-poster.png'} alt={genre.title || genre.name} />
                            </GenreImgWrap>
                        ))}
                    </GenreListWrap>
                    {
                        page < totalPage && (
                            <MoreBtn type='button' className='more_btn' onClick={loadMore} disabled={loading}>
                                {loading ? '불러오는 중…' : '더보기'}
                            </MoreBtn>
                        )
                    }


                </GenreWrap>
            }
        </>
    );
};

export default Tab;
const GenreWrap = styled.div`
margin:0px 20px;
position: relative;
text-align: right;`
const GenreListWrap = styled.div`
display:grid;
grid-template-columns: repeat(5, 1fr);
gap: 20px;`;
const GenreImgWrap = styled.div`
overflow:hidden;`;
const GenreListImg = styled.img`
object-fit: cover;
object-position: center top;
width: 100%;
height: 100%;`;
const MoreBtn = styled.button`
 width:100%;
 background:#7c5cea;
 height:50px;
 margin-top:20px;
 color:#fff;
 font-size:1rem;
`;
const SelectWrap = styled.div`
color:#fff;
margin-bottom:20px;
font-size:1.2rem;
display:inline-block;
position: relative;
cursor:pointer;
`;
const Option = styled.button`
display:flex;
justify-content: space-between;
color:#fff;
width: 100%;
text-align:left;
font-size:1.2rem;
padding:10px 0px;
cursor:pointer;
&.pick::after {
    content:"✓";
    color:#fff;
}`;
const OptionPick = styled.button`
display:flex;
font-size:1.2rem;
color:#fff;
align-items: center;
`;
const OptionWrap = styled.div`
width:150px;
position: absolute;
padding:0px 15px;
z-index:2;
right:0px;
margin-top:10px;
background:#000;
border-radius:4px;
border: 1px solid rgba(255, 255, 255, 0.2);
`;