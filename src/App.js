import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import { useUser } from './contexts/userContext';
import Dashboard from './pages/Dashboard';
import 'react-toastify/dist/ReactToastify.css';
// import FirestoreTest from './components/FirestoreTest';


function App() {

  const { user } = useUser();

  return (
    <>{
      user?<Header />:null
    }
      <main className=''>
        <Routes>
          {
            user ?
              <Route element={<>
                               <Dashboard />
                               {/* <FirestoreTest /> */}
                           </>} path="/" />
              :
              <Route element={<Home />} path="/" />
          }
        </Routes>
      </main>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" />
    </>
  );
 


}

export default App;


