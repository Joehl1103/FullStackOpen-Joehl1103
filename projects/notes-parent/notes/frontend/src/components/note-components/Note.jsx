const Note  = (props) => {
    const label = props.note.important ? 'make not important' : 'make important'
    const note = props.note
    // console.log(typeof note.id)

    return (
        <li className='note'>
            <span>{note.content} {note.important === true && '🚨Important🚨'}{' '}</span>
            <button onClick={props.toggleImportanceOf}>{label}</button>{' '}
            <button onClick={() => props.deleteNote(note.id)}>Delete</button>
        </li>
    )
}

export default Note