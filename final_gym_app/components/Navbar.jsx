"use client"

import React, { useState } from 'react';
import Link from "next/link";
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Navbar = () => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items
  const navItems = [
    { id: 1, text: 'Inicio', route: "/" },
    { id: 2, text: 'Staff', route: "/staff" },
    { id: 3, text: 'Horarios', route: "/horarios" },
    { id: 4, text: 'Rutinas', route: "/rutinas" },
    { id: 5, text: 'Ejemplos', route: "/ejemplos" },
    { id: 6, text: 'Testimonios', route: "/testimonios" },
    { id: 7, text: 'Contacto', route: "/contacto" },
  ];

  return (
    <div className='bg-black w-full flex justify-between items-center h-24 px-4 text-white'>
      {/* Logo */}
      <h1 className='w-full text-3xl font-bold text-[#00df9a]'>Gym App.</h1>

      {/* Desktop Navigation */}
      <ul className='hidden md:flex'>
        {navItems.map(item => (
          <li
            key={item.id}
          >
            <Link href={item.route} className='p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black'>
              {item.text}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? 'fixed md:hidden left-0 top-0 w-auto h-auto rounded-b-lg border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500 z-50'
            : 'ease-in-out w-auto duration-500 fixed top-0 bottom-0 left-[-100%]'
        }
        // w-[60%]
      >
        {/* Mobile Logo */}
        <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>Gym App</h1>

        {/* Mobile Navigation Items */}
        {navItems.map(item => (
          <li
            key={item.id}
            className='p-4 border-b rounded-xl  border-gray-600'
          >
            <Link href={item.route} className='px-4 py-2 rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer'>{item.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;