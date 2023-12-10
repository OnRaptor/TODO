window.global ||= window;

import { useState } from 'react'
import './App.css'
import useDarkMode from "use-dark-mode";
import { Card, CardHeader, Avatar, Button, CardBody, CardFooter } from '@nextui-org/react';
import React from 'react';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import Header from './components/Header';
import AuthPage from './pages/AuthPage';

export default function App() {
  const darkMode = useDarkMode(false);

  return (
    <main className={`${darkMode.value ? 'dark' : ''} text-foreground bg-background h-full`}>
      <div className='container max-md: flex items-center flex-col max-h-full'>
        <Header isAuth={false}/>
        <AuthPage/>
      </div>
    </main>
  )
}
