import { Home, Login } from '../pages';
import Loader from './Loader';
import Navbar from './Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from '../hooks';
import { Signup, Settings, UserProfile } from '../pages';

const Page404 = () => {
  return <div>404</div>;
};
function App() {
  const auth = useAuth();
  console.log('App auth ', auth);

  if (auth.loading) {
    return <Loader />;
  }
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/user/:userId" element={<UserProfile />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
