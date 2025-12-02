import { useState, useEffect } from 'react';
import * as diaryService from './services.ts';
import * as diaryTypes from '../../flight-diaries-be/src/data/types.ts';
import Entries from './Entries.tsx';
import NewEntryForm from './NewEntryForm.tsx';
import Notification from './Notification.tsx';
import type { MessageType } from './types.ts';

function App() {
  const [entries, setEntries] = useState<diaryTypes.DiaryEntry[]>([]);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState<MessageType | string>('');
  const [notificationVisibility, setNotificationVisibility] = useState(false);

  useEffect(() => {
    diaryService.getDiaries()
      .then((diaries: diaryTypes.DiaryEntry[]) => {
        setEntries(diaries)
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          console.log(`Error: ${error.message}`)
        }
      });
  }, []);

  function setNotificationElements(message: string, type: MessageType | string): void {
    setNotificationVisibility(true);
    setNotificationMessage(message);
    setNotificationType(type);
  };

  if (!entries || entries.length === 0) {
    return <div>No diary entries...</div>
  }

  return (
    <div>
      {notificationVisibility ? <Notification
        message={notificationMessage}
        type={notificationType}
        setNotificationVisibility={setNotificationVisibility}
      /> : null}
      <NewEntryForm setNotificationElements={setNotificationElements} />
      <Entries entries={entries} />
    </div >
  )
};

export default App;
