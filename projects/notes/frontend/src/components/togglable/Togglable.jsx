import { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

// what element is the ref assigned to? Or, does the imperativeHandle assign the ref to toggleVisibility

const Togglable = ({ buttonLabel,ref,children }) => {
    const [loginVisible,setLoginVisible] = useState(false)

    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

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
            <div style={showWhenVisible} className="togglableContent">
                {children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </>
    )
}

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

export default Togglable