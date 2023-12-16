window.global ||= window;

import { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import { useUserStore } from './store/UserStore';
import { Outlet, useNavigate } from 'react-router-dom';
import { useApiStore } from './store/ApiStore';
import TaskEditModal from './pages/TaskEditModal';
import PickLangugageModal from './pages/PickLanguageModal';

export default function App() {
  const isAuth = useApiStore(store => store.isAuthenticated);
  const userName = useUserStore(store => store.userName);
  const navigate = useNavigate();
  const token = useApiStore(store => store.token);
  const init = useApiStore(store => store.init);


  useEffect(()=>{
    if (token && useApiStore.persist.hasHydrated()){
      console.log("Reading token...");
      init(token);
    }

    if (!isAuth)
      navigate("/login");

  },[])
  
  return (
    <div className='container flex items-center flex-col max-w-screen-md'>
      <Header isAuth={isAuth} userName={userName}/>
      <Outlet/>
      <TaskEditModal/>
      <PickLangugageModal/>
    </div>
  )
}
