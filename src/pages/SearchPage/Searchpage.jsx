import axios from '../../api/axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';

const Searchpage = () => {
    const navigate = useNavigate();
    const [searchResults, setSearcheResults] =  useState([]);
    
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    let query = useQuery();
    const searchTerm = query.get("q")
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    useEffect(()=> {
        if(debouncedSearchTerm) {
            fetchSearchMovie(debouncedSearchTerm);
        }
    },[debouncedSearchTerm])

    const fetchSearchMovie = async (debouncedSearchTerm) => {
        try {
            const request = await axios.get(
                `/search/multi?include_adult=false&query=${debouncedSearchTerm}`
            )
    
            setSearcheResults(request.data.results)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
         {searchResults.length > 0 ? (
            <section className='search-container'>
                {searchResults.map((movie) => {
                    if(movie.backdrop_path !== null && movie.media_type !== "person") {
                        const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path
                        return (
                            <div className='movie' key={movie.id}>
                                <div className='movie__column-poster' onClick={()=> navigate(`/${movie.id}`)}>
                                    <img src={movieImageUrl} alt='movie image' className='movie__poster'/>
                                </div>
                            </div>
                        )
                    }
                })}
            </section>
         ) : (
            <section className='no-results'>
                <div className='no-results__text'>
                    <p>찾고자하는 검색어"{debouncedSearchTerm}"에 맞는 영화가 없습니다.</p>
                </div>
            </section>
         )}
        </>
    );
};

export default Searchpage;