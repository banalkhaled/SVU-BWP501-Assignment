
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.tsx';
import ThemeToggle from './ThemeToggle.tsx';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const navLinkClasses = "px-3 py-2 rounded-md text-sm font-medium transition-colors";
  const activeLinkClasses = "bg-primary-dark text-white";
  const inactiveLinkClasses = "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700";

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary dark:text-primary-light">
              SVU Events
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4 space-x-reverse">
               <NavLink to="/" className={({isActive}) => `${navLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}>الرئيسية</NavLink>
               <NavLink to="/events" className={({isActive}) => `${navLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}>الفعاليات</NavLink>
               <NavLink to="/about" className={({isActive}) => `${navLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}>عنا</NavLink>
               <NavLink to="/contact" className={({isActive}) => `${navLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}>اتصل بنا</NavLink>
               {isAuthenticated && (
                <NavLink to="/admin" className={({isActive}) => `${navLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}>لوحة التحكم</NavLink>
               )}
            </div>
          </div>
          <div className="flex items-center">
            <ThemeToggle />
            <div className="md:hidden ml-2">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">فتح القائمة الرئيسية</span>
                {isMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             <NavLink to="/" className={({isActive}) => `block ${navLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}>الرئيسية</NavLink>
             <NavLink to="/events" className={({isActive}) => `block ${navLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}>الفعاليات</NavLink>
             <NavLink to="/about" className={({isActive}) => `block ${navLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}>عنا</NavLink>
             <NavLink to="/contact" className={({isActive}) => `block ${navLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}>اتصل بنا</NavLink>
             {isAuthenticated && (
              <NavLink to="/admin" className={({isActive}) => `block ${navLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}>لوحة التحكم</NavLink>
             )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;