const Note  =({note})=> {
    return (
      <li>{note.content} {note.important === true && "🚨Important🚨"} </li>
    )
  
  }

  export default Note