import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Mainpage from "./pages/MainPage/Mainpage";
import Detalpage from "./pages/DetalPage/Detalpage";
import Searchpage from "./pages/SearchPage/Searchpage";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";


const App = () => {
  return (
    <div className='app'>
      <Routes>
        <Route path="/" element={<Layout />}>
         <Route index element={<Mainpage/>}/>
         <Route path=":movieId" element={<Detalpage/>}/>
         <Route path="search" element={<Searchpage/>}/>
         <Route path="login" element={<Login/>}/>
         <Route path="signup" element={<Signup/>}/>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
