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

const getKeyCodeForAndroid = (key = '') => {
  if ('abcdefghijklmonpqrstuvwxyz'.includes(key.toLowerCase())) {
    return `Key${key.toUpperCase()}`
  }
  if ('01234567890'.includes(key)) {
    return `Digit${key}`
  }
  return ''
}

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
  const [onMobile, setOnMobile] = useState(false);
  useEffect(() => {
      const body = document.querySelector('body');
      body.addEventListener('keydown', (e) => {
        if (e.target.tagName !== 'BODY') return;
        if (!e.metaKey) {
          e.preventDefault();
        }
        const {key, location, which, code} = e;
        setKey({key, location, which, code})
      })

      body.addEventListener('touchstart', (e) => {
        if (onMobile) return;
        setOnMobile(true)
      })
    }
    , []
  );

  return (
    <div className="container">
      <canvas width="128" height="128" hidden/>
      <FaviconDrawer number={keyEvent.which}/>
      {keyEvent.key ?
        <>
          <p>{keyEvent.which}</p>
          <div className='cards'>
            <Card header='event.key'>{getNormalizedKey(keyEvent.key)}</Card>
            <Card className={'location-card'}
                  header={
                    <div>
                      {'event.location'}
                      <a
                        href="https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/location"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="more-info">(?)
                      </a>
                    </div>
                  }
            >
              {getNormalizedLocation(keyEvent.location)}
            </Card>
            <Card header={
              <div>{'event.which'} <a href="https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent"
                                      target="_blank" rel="noopener noreferrer"
                                      className="deprecated-link">(deprecated)</a>
              </div>}>
              {keyEvent.which}
            </Card>
            <Card header='event.code'>{getNormalizedCode(keyEvent.code)}</Card>
          </div>
        </> :
        <p className="text-display">Press/Tap any key to get the JavaScript event keycode</p>}
      {onMobile &&
      <input keyboardType="visible-password" autoCorrect={false} autoFocus={true} autoCapitalize={false}
             aria-autocomplete={'none'} autoComplete={'new-password'}
             spellCheck={false}
             value={''} id={'mobile-input'}
             onInput={e => {
               e.persist()
               setKey({
                 key: e.nativeEvent.data,
                 which: e.nativeEvent.data.toUpperCase().charCodeAt(0),
                 location: '',
                 code: getKeyCodeForAndroid(e.nativeEvent.data)
               })
             }}
             onKeyDown={e => {
               e.persist()
               if (e.key === '229') return;
               setKey({
                 key: e.nativeEvent.key,
                 which: e.nativeEvent.which,
                 location: e.nativeEvent.location,
                 code: e.nativeEvent.code
               })
               e.preventDefault()
             }}/>}
    </div>
  );
}

export default App;
