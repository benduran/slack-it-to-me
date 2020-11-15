import React, { useCallback, useEffect, useRef } from 'react';
import { render } from 'react-dom';

import { ActionType, ChromeMessageCallback } from '../../types';

interface UseChromeEventsProps {
  onExtensionClicked: ChromeMessageCallback;
}

const DevControls = ({ onExtensionClicked }: { onExtensionClicked: (...args: any[]) => any }) => {
  if (process.env.NODE_ENV === 'production') return null;
  return (
    <div style={{ left: 0, position: 'fixed', right: 0, top: 0 }}>
      <button type='button' onClick={onExtensionClicked}>
        Fake click extension
      </button>
    </div>
  );
};

export function useChromeEvents({ onExtensionClicked }: UseChromeEventsProps) {
  const devModeRenderedRef = useRef<any>(null);

  const handleMessage = useCallback<ChromeMessageCallback>(
    (req, sender, sendResponse) => {
      switch (req.action) {
        case ActionType.EXTENSION_CLICKED:
          return onExtensionClicked(req, sender, sendResponse);
        default:
          break;
      }
    },
    [onExtensionClicked],
  );

  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.runtime?.onMessage?.addListener) {
      chrome.runtime.onMessage.addListener(handleMessage);
      return () => {
        chrome.runtime.onMessage.removeListener(handleMessage);
      };
    }
    if (process.env.NODE_ENV !== 'production' && !devModeRenderedRef.current) {
      const container = document.createElement('div');
      document.body.appendChild(container);
      devModeRenderedRef.current = container;
      render(<DevControls onExtensionClicked={onExtensionClicked} />, container);
    }
  }, [handleMessage, onExtensionClicked]);
}
