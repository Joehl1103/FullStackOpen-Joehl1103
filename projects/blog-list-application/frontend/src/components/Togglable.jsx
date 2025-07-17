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
        <div className="togglable">
            <div  style={hideWhenVisible}>
                <button className="visible" onClick={toggleVisibility}>{buttonLabel}</button>
            </div>
            <div className="details" style={showWhenVisible}>
                {children}
                <button className="hideDetails" onClick={toggleVisibility}>{cancelLabel}</button>
            </div>
        </div>
    )

}

export default Togglable