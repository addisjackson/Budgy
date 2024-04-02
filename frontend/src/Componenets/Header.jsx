import React from 'react';
import Nav from './Nav';
import './header.css'

export default function Header() {
  return (
    <div className='header'>
      <h1>My Expense Tracker App</h1>
      <Nav />
    </div>
  )
}
