import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle.tsx';
import { useAuth } from '../contexts/AuthContext.tsx';

const Header: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky-top shadow">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">SVU Events</Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav"
                  aria-controls="nav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="nav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink end to="/" className="nav-link">الرئيسية</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/events" className="nav-link">الفعاليات</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-link">عنا</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact" className="nav-link">اتصل بنا</NavLink>
              </li>
              {isAuthenticated && (
                <li className="nav-item">
                  <NavLink to="/admin" className="nav-link">لوحة التحكم</NavLink>
                </li>
              )}
            </ul>
            <div className="d-flex"><ThemeToggle /></div>
          </div>
        </div>
      </nav>
    </header>
  );
}
export default Header;
