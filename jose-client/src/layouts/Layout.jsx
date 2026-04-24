import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Layout = () => {
  return (
    <div className="pet-bg pet-bg--paws flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1 pb-16 pt-20">
        <div className="pet-container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
