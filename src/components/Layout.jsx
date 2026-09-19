import { Outlet, useLocation } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';

const Layout = () => {
    const location = useLocation();
    const hideNav = ["/login", "/signup","/term"];
    const shouldNav = hideNav.includes(location.pathname);
    return (
        <div>
            {!shouldNav && <Nav/>}
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Layout;