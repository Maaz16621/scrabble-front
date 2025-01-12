'use client';

import React, { useState, useEffect } from 'react';
import anime from 'animejs/lib/anime.es.js'; // Ensure Anime.js is imported

const Navbar = ({ navLinks }) => {
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the mobile menu with Anime.js animation
  const toggleMobileMenu = () => {
    if (!isMenuOpen) {
      // Open the menu
      anime({
        targets: '#mobile-nav',
        translateX: ['-100%', 0],
        duration: 800,
        easing: 'easeInOutQuad',
      });
    } else {
      // Close the menu
      anime({
        targets: '#mobile-nav',
        translateX: '-100%',
        duration: 800,
        easing: 'easeInOutQuad',
      });
    }

    setIsMenuOpen(!isMenuOpen); // Update state after animation
  };

  // Function to handle clicks outside the menu to close it (optional)
  useEffect(() => {
    const handleClickOutside = (event) => {
      const mobileNav = document.getElementById('mobile-nav');
      const hamburger = document.getElementById('hamburger');

      // Close the menu if clicked outside of it
      if (!mobileNav.contains(event.target) && !hamburger.contains(event.target) && isMenuOpen) {
        toggleMobileMenu(); // Close the menu
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <nav className="navbar flex py-2 sm:py-2 md:py-2 lg:py-2 xl:py-0 justify-between items-center lg:px-16 sm:px-6 px-6 md:px-6 w-full bg-antique-white shadow-lg transition duration-300">
      {/* Logo Section */}
      <div className="logo">
        <a href="/">
          <img
            sizes="(max-width: 1400px) 100vw, 1400px"
            srcSet="/img/logo_qnbieg_c_scale,w_200.webp 500w, /img/logo_qnbieg_c_scale,w_792.webp 792w, /img/logo_qnbieg_c_scale,w_1186.webp 1186w, /img/logo_qnbieg_c_scale,w_1400.webp 1400w"
            src="/img/logo_qnbieg_c_scale,w_1400.webp"
            alt="Logo"
            width="1400"
            height="auto"
            loading="lazy"
          />
        </a>
      </div>

      {/* Hamburger Menu Icon for Mobile */}
      <button
        id="hamburger"
        className="hamburger-menu sm:block md:block lg:block xl:hidden text-3xl"
        onClick={toggleMobileMenu}
      >
        &#9776; {/* Menu Icon */}
      </button>

      {/* Fullscreen Overlay Navigation Links for Mobile */}
      <div
        id="mobile-nav"
        className="mobile-nav fixed inset-0 bg-gray-800 text-white flex flex-col z-40"
      >
        <button
          className="absolute top-6 right-6 text-4xl"
          onClick={toggleMobileMenu}
        >
          &times;
        </button>
        <ul className="nav-links mt-16 flex flex-col gap-4 text-xl font-bold uppercase text-left p-20">
          {navLinks.slice(0, 3).map((tool, index) => (
            <li key={index}>
              <a href={`/${tool.page_url}`} className="hover:text-orange-500 transition duration-300">
                {tool.page_title.split('-')[0]}
              </a>
            </li>
          ))}
          <li>
            <a href="#other-tools" className="hover:text-orange-500 transition duration-300">
              Other Tools
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:text-orange-500 transition duration-300">
              Contact
            </a>
          </li>
        </ul>
      </div>

      {/* Regular Navigation Links for Desktop */}
      <div className="hidden xl:flex items-center space-x-8">
        <ul className="nav-links flex gap-6 text-base uppercase">
          {navLinks.slice(0, 3).map((tool, index) => (
            <li key={index}>
              <a href={`/${tool.page_url}`} className="hover:text-orange-500 transition duration-300">
                {tool.page_title.split('-')[0]}
              </a>
            </li>
          ))}
          <li>
            <a href="#other-tools" className="hover:text-orange-500 transition duration-300">
              Other Tools
            </a>
          </li>
        </ul>
      </div>

      {/* Contact Button for Desktop */}
      <div className="hidden xl:block">
        <a
          href="/contact"
          className="gradient-button px-6 py-2 font-bold uppercase rounded-xl text-white transition-transform duration-300 hover:scale-105"
        >
          Contact
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
