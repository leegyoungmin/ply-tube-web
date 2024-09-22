import React, { useState } from 'react';
import './App.css';
import Tag from './components/tag/tag';
import Header from './components/header/header';
import Popup from './components/popup/popup'
import Result from './components/result/result';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupData, setPopupData] = useState({ title: '', content: '' });

  const openPopup = (title, content) => {
    setPopupData({ title, content }); // 제목과 내용을 주입
    setIsPopupOpen(true); // 팝업 열기
  };

  const closePopup = () => {
    setIsPopupOpen(false); // 팝업 닫기
  };

  return (
    <Router>
      <div className='App'>
        <Header onButtonClick={openPopup} />

        {isPopupOpen && (
          <Popup
            title={popupData.title}
            content={popupData.content}
            handleClose={closePopup}
          />
        )}

        <Routes>
          <Route path="/" element={<Tag />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
