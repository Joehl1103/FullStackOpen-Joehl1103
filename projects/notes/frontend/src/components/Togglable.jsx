import { useState } from "react";

const Togglable = (props) => {
    const [loginVisible,setLoginVisible] = useState(false)

    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none'}

    const toggleVisibility = () => {
        setLoginVisible(!loginVisible)
    }

    return (
        <>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </>
    )
    
}

export default Togglable