import { ActionType, ChromeMessage } from '../types';

chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    tabs.forEach(t => {
      if (t.id) {
        chrome.tabs.sendMessage(t.id, {
          action: ActionType.EXTENSION_CLICKED,
        } as ChromeMessage);
      }
    });
  });
});
