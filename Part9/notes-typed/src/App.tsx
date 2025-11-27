import { useState, useEffect } from 'react';
import type { Note, NewNote } from './types.ts'
import noteService from './noteService.ts';
import { checkForError } from './utilities.ts';

function App() {
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState<Note[]>([
    { id: '1', content: 'testing' }
  ]);

  useEffect(() => {
    noteService.getNotes()
      .then((notes: Note[]) => {
        setNotes(notes)
      })
      .catch(e => checkForError(e))
  });

  function noteCreation(event: React.SyntheticEvent): void {
    event.preventDefault();
    noteService.createNote({ content: newNote })
      .then(newNoteResponse => {
        setNotes(notes.concat(newNoteResponse))
      })
      .catch(e => checkForError(e))
    setNewNote('');
  };

  return (
    <>
      <form onSubmit={noteCreation}>
        <input
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
        />
      </form>
      <ul>
        {notes.map(note =>
          <li key={note.id}>{note.content}</li>
        )}
      </ul>
    </>
  )
}

export default App
