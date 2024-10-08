import React, { useEffect, useState } from 'react';
import './tag.css';

import { useNavigate } from 'react-router-dom';

//43.203.164.87:8000

function getRandomColor() {
    const randomColors = ['#FF0000', '#E7DA29', '#2614AB', '#77FFD6']
    const randomIndex = Math.floor(Math.random() * randomColors.length);
    console.log('Random index:', randomIndex); // 디버깅을 위한 출력

    return randomColors[randomIndex]
}

// HEX 색상을 RGB로 변환하는 함수
function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
}

function TagCloud() {
    const navigate = useNavigate(); // useHistory 훅 사용

    const navigateToResult = async () => {
        // 선택된 태그와 관련된 음악 목록 생성
        const keywords = Object.keys(selectedTags);

        try {
            const response = await fetch('http://3.38.28.112:8000/submit-selection/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "select_value": keywords
                }),
            });

            const result = await response.json();
            const keywordList = result['keywords']
            const musicList = result['predictions']
            navigate('/result', { state: { keywordList, musicList } });
        } catch (error) {
            console.error('Error sending POST request')
        }

        // Result 페이지로 이동하면서 데이터 전달
    };

    const [tags, setTag] = useState([]);
    const [selectedTags, setSelectedTags] = useState({}); // 태그별 선택 상태와 색상 관리

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://3.38.28.112:8000/random-items/');
                const result = await response.json();
                console.log(result);
                setTag(result['keywords'])
            } catch (error) {
                console.error('Error fetching data : ', error);
            }
        }

        fetchData();
    }, []);

    const handleTagClick = (tag) => {
        if (selectedTags[tag]) {
            // 이미 선택된 태그를 다시 클릭하면 선택 해제
            const updatedTags = { ...selectedTags };
            delete updatedTags[tag];
            setSelectedTags(updatedTags);
        } else {
            // 선택된 태그에 랜덤 색상을 적용
            const randomColor = getRandomColor();
            const randomBackgroundColor = `rgba(${hexToRgb(randomColor)}, 0.2)`;
            const randomBorderColor = `rgba(${hexToRgb(randomColor)}, 0.5)`;
            setSelectedTags(prevTags => ({
                ...prevTags,
                [tag]: {
                    color: `rgba(0,0,0,1)`,
                    backgroundColor: randomBackgroundColor,
                    borderColor: randomBorderColor
                }
            }));
        }
        console.log(selectedTags)
    };

    return (
        <div className="tag-cloud">
            {tags.map((tag, index) => (
                <button
                    key={index}
                    className={`tag-item ${selectedTags[tag] ? 'selected' : ''}`}
                    style={{
                        backgroundColor: selectedTags[tag]?.backgroundColor || '#FFFFFF',
                        borderColor: selectedTags[tag]?.borderColor || '#E7E7E7',
                    }}
                    onClick={() => handleTagClick(tag)}
                >
                    {tag}
                </button>
            ))}
            <button className='create-playlist' onClick={navigateToResult} disabled={Object.keys(selectedTags).length === 0}>
                <img src='/images/icon_puzzle.svg' alt="Icon" className="header-icon" />
                플레이리스트 만들기
            </button>
        </div>
    );
}

export default TagCloud;
