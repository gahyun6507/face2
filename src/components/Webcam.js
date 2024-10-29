import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import '../styles/Webcam.css';

const WebcamComponent = () => {
  const webcamRef = useRef(null);
  const [isWebcamOn, setIsWebcamOn] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const videoConstraints = {
    width: 320,
    height: 240,
    facingMode: "user"
  };

  const handleCapture = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) {
        setUploadStatus("웹캠에서 이미지를 캡처할 수 없습니다.");
        return;
      }

      const base64Image = imageSrc.split(',')[1];

      const data = {
        filename: "attendance_image.png",
        image_binary: base64Image,
      };

      try {
        const response = await axios.post("http://3.139.212.113:8000/upload/", data);
        
        const responseData = response.data;
        if (responseData.label === 'Unknown') {
          setUploadStatus("인식된 사용자: Unknown");
        } else {
          setUploadStatus(`인식된 사용자: ${responseData.label}`);
        }
      } catch (error) {
        setUploadStatus("업로드 실패: " + error.message);
      }
    } else {
      setUploadStatus("웹캠이 초기화되지 않았습니다.");
    }
  };

  const handleWebcamToggle = () => {
    setIsWebcamOn(true);
  };

  useEffect(() => {
    let timer;
    if (isWebcamOn) {
      timer = setTimeout(() => {
        handleCapture(); // 5초 후 이미지 캡처
        setIsWebcamOn(false);
      }, 5000); // 5초 후 웹캠 끄기
    }
    return () => clearTimeout(timer);
  }, [isWebcamOn]);

  return (
    <div className="webcam-container">
      <h3>출석 체크</h3>
      
      {isWebcamOn && (
        <div className="webcam-box">
          <Webcam 
            audio={false}
            height={240}
            width={320}
            ref={webcamRef}
            videoConstraints={videoConstraints}
            screenshotFormat="image/jpeg"
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
