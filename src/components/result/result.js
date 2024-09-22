import React from 'react';
import './result.css';
import { useLocation } from 'react-router-dom';

function PlaylistResult() {
    const location = useLocation();
    const { keywordList = [], musicList = [] } = location.state || {};

    return (
        <div className="container playlist-result">
            <div className="section selected-keywords">
                <h2>선택 키워드</h2>
                <div className="keyword-list">
                    {keywordList.length > 0 ? (
                        keywordList.map((keyword, index) => (
                            <span key={index} className="keyword-item">{keyword}</span>
                        ))
                    ) : (
                        <p>선택된 키워드가 없습니다.</p>
                    )}
                </div>
            </div>

            <div className="section">
                <h2>키워드와 어울리는 음악</h2>
                <div className="music-list">
                    {musicList.length > 0 ? (
                        musicList.map((music, index) => (
                            <span key={index} className="music-item">{music}</span>
                        ))
                    ) : (
                        <p>음악 목록이 없습니다.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PlaylistResult;
