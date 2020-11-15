export enum ActionType {
  EXTENSION_CLICKED,
}

export interface ChromeMessage<T extends {} = {}> {
  action: ActionType;
  payload: T;
}

export type ChromeMessageCallback<T1 extends {} = {}, T2 extends {} = {}> = (
  req: ChromeMessage<T1>,
  sender: chrome.runtime.MessageSender,
  sendResponse: SendChromeResponse<T2>,
) => void;

export type SendChromeResponse<T extends {} = {}> = (response: ChromeMessage<T>) => any;
