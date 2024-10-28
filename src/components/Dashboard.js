// Dashboard.js
import React from 'react';
import SystemLogChart from './SystemLogChart';
import Calendar from './Calendar';
import DataTable from './DataTable';
import WebcamComponent from './Webcam'; // 웹캠 컴포넌트 추가
import '../styles/Dashboard.css';
import { FaUserCheck, FaUserTimes, FaClock, FaCheckCircle } from 'react-icons/fa';

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-cards">
        <div className="card">
          <FaUserCheck className="icon" />
          <div className="card-content">
            <div className="card-title">출석</div>
            <div className="card-value">15명</div>
          </div>
        </div>
        <div className="card">
          <FaUserTimes className="icon" />
          <div className="card-content">
            <div className="card-title">결석</div>
            <div className="card-value">5명</div>
          </div>
        </div>
        <div className="card">
          <FaClock className="icon" />
          <div className="card-content">
            <div className="card-title">지각</div>
            <div className="card-value">1명</div>
          </div>
        </div>
        <div className="card">
          <FaCheckCircle className="icon" />
          <div className="card-content">
            <div className="card-title">총 출석률</div>
            <div className="card-value">75%</div>
          </div>
        </div>
      </div>
      <div className="system-log-calendar-container">
        <SystemLogChart />
        <Calendar />
      </div>
      <WebcamComponent /> {/* 웹캠 컴포넌트 추가 */}
      <DataTable />
    </div>
  );
}

export default Dashboard;
