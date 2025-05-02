const Note  =({note})=> {
    console.log("Note object",note)
    return (
      <li>{note.content} {note.important === true && "🚨Important🚨"} </li>
    )
  
  }

  export default Note