import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // App.js 파일에서 메인 컴포넌트를 가져옴

const root = ReactDOM.createRoot(document.getElementById('root'));  // index.html에 있는 root 요소에 렌더링
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
