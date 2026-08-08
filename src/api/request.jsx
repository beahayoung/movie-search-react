const requests = {
    // 목록/트렌딩
    fetchNowPlaying: "/movie/now_playing",
    fetchNetflixOriginals: "/discover/tv?with_networks=213",
    fetchTrending: "/trending/all/week",
    fetchTopRated: "/movie/top_rated",

    // 장르별
    fetchDrama: "/discover/movie?with_genres=18",
    fetchRomanceMovies: "/discover/movie?with_genres=10749",
    fetchComedyMovies: "/discover/movie?with_genres=35",
    fetchAnimation: "/discover/movie?with_genres=16",
    fetchThriller: "/discover/movie?with_genres=53",
    fetchMystery: "/discover/movie?with_genres=9648",
    fetchAdventure: "/discover/movie?with_genres=12",
    fetchActionMovies: "/discover/movie?with_genres=28",
    fetchFantasy: "/discover/movie?with_genres=14",
    fetchSF: "/discover/movie?with_genres=878",
    fetchHorrorMovies: "/discover/movie?with_genres=27",
    fetchDocumentaries: "/discover/movie?with_genres=99",
}

export default requests;