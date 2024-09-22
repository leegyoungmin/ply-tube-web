import React from 'react';
import './popup.css';

function Popup({ title, content, handleClose }) {
    const formattedContent = content.split('\n').map((line, index) => (
        <React.Fragment key={index}>
            {line}
            <br />
        </React.Fragment>
    ));

    return (
        <div className="popup-overlay">
            <div className="popup-box">
                <div className="popup-header">
                    <img src="/images/help-circle-contained.svg" alt="Icon" className="popup-icon" />
                    <img src='/images/icon_circle_xmark.svg' alt='Close' className='close-popup' onClick={handleClose} />
                </div>
                <div className="popup-content">
                    <h2 className='popup-content-header'>{title}</h2>
                    <p className='popup-content-body'>{formattedContent}</p>
                </div>
                <div className="popup-footer">
                    <button className="confirm-button" onClick={handleClose}>확인</button>
                </div>
            </div>
        </div>
    );
}

export default Popup;
