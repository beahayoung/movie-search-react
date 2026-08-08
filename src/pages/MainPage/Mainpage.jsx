import Banner from '../../components/Banner';
import Row from '../../components/Row';
import requests from '../../api/request';
const Mainpage = () => {
    return (
        <div>
        <Banner/>
        
      <Row title='NETFLIX ORLGINALS' id='NO' fetchUrl={requests.fetchNetflixOriginals} isLargeRow/>
      <Row title='Trending Now' id='TN' fetchUrl={requests.fetchTrending}/>
      <Row title='Top Rated' id='TR' fetchUrl={requests.fetchTopRated}/>
      <Row title='Action Movies' id='AM' fetchUrl={requests.fetchActionMovies}/>
      <Row title='Comedy Movies' id='CM' fetchUrl={requests.fetchComedyMovies}/>
        </div>
    );
};

export default Mainpage;