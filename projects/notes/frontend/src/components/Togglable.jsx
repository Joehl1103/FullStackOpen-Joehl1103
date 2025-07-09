import { useState, forwardRef, useImperativeHandle } from "react";

// what element is the ref assigned to? Or, does the imperativeHandle assign the ref to toggleVisibility

const Togglable = ({ buttonLabel,ref,children }) => {
    const [loginVisible,setLoginVisible] = useState(false)

    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none'}

    const toggleVisibility = () => {
        setLoginVisible(!loginVisible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </>
    )
    
}

export default Togglable