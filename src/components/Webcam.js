// src/components/WebcamComponent.js
import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import '../styles/Webcam.css';

const WebcamComponent = () => {
  const webcamRef = useRef(null);
  const [isWebcamOn, setIsWebcamOn] = useState(false); // 웹캠 활성화 상태
  const [uploadStatus, setUploadStatus] = useState(""); // 업로드 상태 메시지
  const videoConstraints = {
    width: 320,
    height: 240,
    facingMode: "user" // 전면 카메라 사용
  };

  // 웹캠을 일정 시간 후 자동으로 끄는 효과
  useEffect(() => {
    let timer;
    if (isWebcamOn) {
      // 이미지를 캡처하고 서버에 업로드
      handleCapture(); // 버튼 클릭 시 즉시 캡처
      timer = setTimeout(() => {
        setIsWebcamOn(false); // 2초 후 웹캠 끄기
      }, 2000);
    }
    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [isWebcamOn]);

  // 이미지 캡처 및 POST 요청 처리
  const handleCapture = async () => {
    const imageSrc = webcamRef.current.getScreenshot(); // 웹캠에서 스크린샷을 캡처
    if (!imageSrc) {
      setUploadStatus("웹캠에서 이미지를 캡처할 수 없습니다.");
      return;
    }

    // Base64 문자열에서 'data:image/jpeg;base64,' 부분 제거
    const base64Image = imageSrc.split(',')[1];

    // POST 요청 데이터 생성
    const data = {
      filename: "attendance_image.png",
      image_binary: base64Image,
    };

    try {
      const response = await axios.post("http://3.139.212.113:8000/upload/", data);
      setUploadStatus("업로드 성공: " + response.data.message); // 응답 메시지 표시
    } catch (error) {
      setUploadStatus("업로드 실패: " + error.message);
    }
  };

  // 웹캠 활성화 핸들러
  const handleWebcamToggle = () => {
    setIsWebcamOn(true);
  };

  return (
    <div className="webcam-container">
      <h3>출석 체크</h3>
      
      {/* 웹캠이 켜졌을 때 박스와 웹캠을 보여줌 */}
      {isWebcamOn && (
        <div className="webcam-box">
          <Webcam 
            audio={false}
            height={240}
            width={320}
            ref={webcamRef}
            videoConstraints={videoConstraints}
            screenshotFormat="image/jpeg" // 캡처할 이미지 형식
          />
        </div>
      )}

      <button 
        className={`webcam-toggle-button ${isWebcamOn ? "below" : ""}`} 
        onClick={handleWebcamToggle}
      >
        웹캠 켜기
      </button>

      {uploadStatus && <p>{uploadStatus}</p>} {/* 상태 메시지 표시 */}
    </div>
  );
};

export default WebcamComponent;
