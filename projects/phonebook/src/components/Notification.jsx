/* a conditional component that displays n types of messages:
* deleted
* added
* modified

one CSS class for each conditional version of the component

one piece of state that controls which message is displayed
*/


const Notification =({notification,notificationType}) => {
  
    const deletedCSS = {

    }
    if (notificationType === null){
        return null
    } else if (notificationType === 'added'){
        return (
            <div className="added">
                {notification}
            </div>
        )
    } else if (notificationType === 'modified'){
        return (
            <div className="modified">
                {notification}
            </div>
        )
    } else if (notificationType === 'deleted'){
        return (
            <div className="deleted">
                {notification}
            </div>

        )
    }

}

export default Notification