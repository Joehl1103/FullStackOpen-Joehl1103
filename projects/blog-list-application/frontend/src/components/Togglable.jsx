import { useState } from 'react'

const Togglable = ({ buttonLabel,cancelLabel,children }) => {
    const [visible,setVisible] = useState(false)

    // if visible is true then set display to none
    const hideWhenVisible = { display: visible ? 'none':''} 
    // if visible is true then set display to yes
    const showWhenVisible = { display: visible ? '' : 'none'}

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {children}
                <button onClick={toggleVisibility}>{cancelLabel}</button>
            </div>
        </>
    )

}

export default Togglable