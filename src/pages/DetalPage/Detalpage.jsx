import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';
import styled from "styled-components";

const Detalpage = ({ type }) => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState({});
    useEffect(() => {
        const fetchgDate = async () => {
            const request = await axios.get(
                `/${type}/${movieId}`
            )
            setMovie(request.data)
            console.log("backdrop_path:", request.data.backdrop_path)
            console.log(request.data)
        }
        fetchgDate();
    }, [type,movieId])
    return (
        <>
            {movie? (
                <DetalSection>
                    <DetalimgWrap>
                    <DetalImg path={movie.backdrop_path} />
                    </DetalimgWrap>
                        <div className='detal__content'>
                            <p className='detal__details' style={{display: "flex", justifyContent:"space-between", marginBottom:"15px"}}>
                                <span className='detal__user_perc' >100% for you</span>
                                {movie.release_date ? movie.release_date : movie.first_air_date}
                            </p>
                            <h2 className='detal__title' style={{paddingLeft:"0px",color:"#7c5cea",fontSize:"2.5rem"}}>
                                {movie.title ? movie.title : movie.name}
                            </h2>
                            <p className='detal__overview'>
                                평점 : {movie.vote_average}
                            </p>
                            <p className='detal__overview'>
                                {movie.overview}
                            </p>
                        </div>
                    
                </DetalSection>
            ) : (
                <Detalloding>...loading</Detalloding>
            )}
        </>
    );
};

export default Detalpage;
const DetalImg = styled.img.attrs(props => ({
  src:props.path ? `https://image.tmdb.org/t/p/original${props.path}` : `https://placehold.co/500x280?text=No+Image`,
  alt:'poster'
}))`.detal__poster
height:50vh;
object-fit: cover;
object-position: top center;
width: 100%;`;
const DetalSection = styled.section`
position: relative;
height:100%;
margin-top:70px;`;
const DetalimgWrap = styled.div`
position: relative;
top:0;
left:0;
width:100%;
&::after {
  content:"";
  position: absolute;
bottom:0;
left:0;
width:100%;
height: 40%;
background-image: linear-gradient(
180deg,
transparent,
rgba(37, 37, 37, 0.61),
#111
);
}
`;
const Detalloding = styled.div`
height:100vh;
width:100%;
color:#fff;
line-height:2;
`
