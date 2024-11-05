import React, { useState } from 'react';
import { Calendar as ReactCalendar } from 'react-calendar';
import { Bar } from 'react-chartjs-2';
import 'react-calendar/dist/Calendar.css';
import '../styles/Dashboard.css';

// Chart.js 데이터 설정
const data = {
  labels: ['1주차', '2주차', '3주차', '4주차', '5주차', '6주차', '7주차', '8주차'],
  datasets: [
    {
      label: '접속 수',
      data: [12, 19, 3, 5, 2, 3, 9, 7],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
};

function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [schedule, setSchedule] = useState({});
  const [newSchedule, setNewSchedule] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAddSchedule = () => {
    if (newSchedule.trim()) {
      const dateKey = selectedDate.toDateString();
      setSchedule((prev) => ({
        ...prev,
        [dateKey]: [...(prev[dateKey] || []), newSchedule],
      }));
      setNewSchedule(""); // 입력창 초기화
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-cards">
        <div className="card">
          <div className="card-content">
            <div className="card-title">출석</div>
            <div className="card-value">15명</div>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <div className="card-title">결석</div>
            <div className="card-value">5명</div>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <div className="card-title">지각</div>
            <div className="card-value">1명</div>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <div className="card-title">총 출석률</div>
            <div className="card-value">75%</div>
          </div>
        </div>
      </div>

      {/* 시스템 로그 차트 */}
      <div className="system-log-chart">
        <h4>System Log</h4>
        <Bar data={data} options={options} />
      </div>

      {/* 캘린더 */}
      <div className="calendar">
        <ReactCalendar
          className="react-calendar"
          onClickDay={handleDateChange}
          value={selectedDate}
          tileContent={({ date, view }) => view === 'month' && schedule[date.toDateString()]
            ? <div className="schedule-dot">•</div>
            : null
          }
        />
        <div className="schedule-add">
          <h4>일정 추가</h4>
          <input
            type="text"
            placeholder="일정을 입력하세요..."
            value={newSchedule}
            onChange={(e) => setNewSchedule(e.target.value)}
          />
          <button onClick={handleAddSchedule}>추가</button>
          {schedule[selectedDate.toDateString()] && (
            <ul className="schedule-list">
              {schedule[selectedDate.toDateString()].map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* 데이터 테이블 */}
      <div className="data-table">
        <h2>데이터 테이블</h2>
        <table>
          <thead>
            <tr>
              <th>시간</th>
              <th>이름</th>
              <th>학번</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>24-10-28 10:05:39</td>
              <td>홍길동</td>
              <td>2022184765</td>
              <td>출석</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
