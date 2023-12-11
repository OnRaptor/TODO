window.global ||= window;

import { useState } from 'react'
import './App.css'
import useDarkMode from "use-dark-mode";
import { Card, CardHeader, Avatar, Button, CardBody, CardFooter } from '@nextui-org/react';
import React from 'react';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import Header from './components/Header';
import AuthPage from './pages/AuthPage';
import { useUserStore } from './store/UserStore';

export default function App() {
  const darkMode = useDarkMode(false);
  let isAuth = useUserStore(store => store.isAuthenticated);
  let userName = useUserStore(store => store.userName);

  return (
    <main className={`${darkMode.value ? 'dark' : ''} text-foreground bg-background h-full`}>
      <div className='container max-md: flex items-center flex-col max-h-full'>
        <Header isAuth={isAuth} userName={userName}/>
        <AuthPage/>
      </div>
    </main>
  )
}
