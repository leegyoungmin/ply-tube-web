import React from 'react';
import './header.css';

function Header({ onButtonClick }) {
    return (
        <header className="header">
            <img src='/images/ply_tube_icon.svg' alt="LOGO" className='logo-image' />
            <div className="right-section">
                <button
                    className="header-button-item"
                    onClick={() => onButtonClick(
                        '똑똑한 플레이리스트를 만드세요.',
                        '유튜브에 나오는 플레이리스트가 마음에 들었나요?\n자신의 플레이리스트를 만들어보세요.\n마음에 드는 키워드를 누른 후, 생성하시면 됩니다.'
                    )}
                >
                    Help
                    <img src='/images/help-circle-contained.svg' alt="Icon" className="header-icon" />
                </button>
            </div>
        </header>
    );
}

export default Header;
