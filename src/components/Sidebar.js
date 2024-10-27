import React from 'react';
import { MdDashboard, MdPerson, MdSettings, MdLogout } from 'react-icons/md';
import '../styles/Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>출첵MARK</h2>
      <ul>
        <li><MdDashboard /> 대시보드</li>
        <li><MdPerson />출결통계</li>
        <li><MdSettings />캘린더</li>
        <li><MdLogout />출결기록</li>
      </ul>
    </div>
  );
}

export default Sidebar;
