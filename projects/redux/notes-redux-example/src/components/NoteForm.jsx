const NoteForm = ({ addNote }) => {

  return (
    <>
      <h2>Add note</h2>
      <form onSubmit={addNote}>
        <input name='note' /> {/* this allows us to access the value by using target.value.note*/}
        <button type='submit'>add</button>
      </form>
    </>
  )
}

export default NoteForm
