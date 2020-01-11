import React, {useEffect, useState} from 'react';
import './App.css';
import FaviconDrawer from "./Components/FaviconDrawer";
import Card from "./Components/Card";

const KEY_CODE_MAP = {
  'Unidentified': <a href="https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values#Special_values"
                     target="_blank" rel="noopener noreferrer">Unidentified</a>,
  ' ': <span className="text-muted">(Space character)</span>,
};

const KEY_LOCATIONS = {
  0: 'General keys',
  1: 'Left-side modifier keys',
  2: 'Right-side modifier keys',
  3: 'Numpad',
};

const getNormalizedKey = (key = '') => {
  if (KEY_CODE_MAP[key]) {
    return KEY_CODE_MAP[key]
  }
  return key
};

const getNormalizedLocation = (key = 'Unknown') => {
  if (key in KEY_LOCATIONS) {
    return <>
      {`${key}`}
      <span className="text-muted">{`(${KEY_LOCATIONS[key]})`}</span>
    </>
  }
  if (key !== 'Unknown') {
    return <a href="https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/location" target="_blank"
              rel="noopener noreferrer">Other</a>
  }
  return key
};

const getNormalizedCode = (key = '') => {
  if (key === 'Unidentified') {
    return <a href="https://w3c.github.io/uievents-code/#table-key-code-special" target="_blank"
              rel="noopener noreferrer">Unidentified</a>
  }
  return key
}

function App() {
  const [keyEvent, setKey] = useState({});
  useEffect(() => {
    const body = document.querySelector('body');
    body.addEventListener('keydown', ({key, location, which, code}) =>
      setKey({key, location, which, code}))
    const mobileInputDiv = document.querySelector('.mobile-input-div')
    body.addEventListener('touchstart', (e) => {
      if (document.querySelector('.mobile-input-div input') !== null) return;
      if (e.target.tagName === 'BUTTON') return;
      const input = document.createElement('input');
      input.setAttribute('type', 'text');
      mobileInputDiv.appendChild(input);
      setTimeout(() => {
        input.focus();
        input.click();
      }, 100);
    })

  }, []);

  return (
    <div className="container">
      <canvas width="128" height="128" hidden/>
      <FaviconDrawer number={keyEvent.which}/>
      {keyEvent.which ?
        <>
          <p>{keyEvent.which}</p>
          <div className='cards'>
            <Card header='event.key'>{getNormalizedKey(keyEvent.key)}</Card>
            <Card header={<div>{'event.location'}<a
              href="https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/location" target="_blank"
              rel="noopener noreferrer"
              className="more-info">(?)</a></div>} className={'location-card'}>{getNormalizedLocation(keyEvent.location)}</Card>
            <Card header={<div>{'event.which'} <a href="https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent"
                                              target="_blank" rel="noopener noreferrer"
                                              className="deprecated-link">(deprecated)</a>
            </div>}>{keyEvent.which}</Card>
            <Card header='event.code'>{getNormalizedCode(keyEvent.code)}</Card>
          </div>
        </> :
        <p className="text-display">Press any key to get the JavaScript event keycode</p>}
      <div className='mobile-input-div'/>
    </div>
  );
}

export default App;
