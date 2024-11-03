import React from 'react';
import { MdDashboard, MdPerson, MdSettings, MdLogout } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <NavLink 
        to="/" 
        className="snapcheck-title"
        aria-label="SnapCheck"
      >
        <h2>SnapCheck</h2>
      </NavLink>
      <ul>
        <li>
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => (isActive ? 'active' : '')}
            aria-label="대시보드"
          >
            <MdDashboard /> 대시보드
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/calendar" 
            className={({ isActive }) => (isActive ? 'active' : '')}
            aria-label="캘린더"
          >
            <MdPerson /> 캘린더
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/system-log" 
            className={({ isActive }) => (isActive ? 'active' : '')}
            aria-label="시스템 로그"
          >
            <MdSettings /> 시스템 로그
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/webcam" 
            className={({ isActive }) => (isActive ? 'active' : '')}
            aria-label="출석체크"
          >
            <MdPerson /> 출석체크
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/logout" 
            className={({ isActive }) => (isActive ? 'active' : '')}
            aria-label="로그아웃"
          >
            <MdLogout /> 로그아웃
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
