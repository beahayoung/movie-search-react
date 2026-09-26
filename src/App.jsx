import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Mainpage from "./pages/MainPage/Mainpage";
import Detalpage from "./pages/DetalPage/Detalpage";
import Searchpage from "./pages/SearchPage/Searchpage";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Term from "./components/auth/Term";


const App = () => {
  return (
    <div className='app'>
      <Routes>
        <Route path="/" element={<Layout />}>
         <Route index element={<Mainpage/>}/>
         <Route path="movie/:movieId" element={<Detalpage type="movie"/>}/>
         <Route path="tv/:movieId" element={<Detalpage type="tv"/>}/>
         <Route path="search" element={<Searchpage/>}/>
         <Route path="login" element={<Login/>}/>
         <Route path="term" element={<Term/>}/>
         <Route path="signup" element={<Signup/>}/>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
