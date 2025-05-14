const Delete = (props) => {
    return (
        <>
            <form>
                <button type='button' onClick={props.deletePerson}>Delete</button>
            </form>
        </>
    )
}

export default Delete