import { render, screen } from '@testing-library/react'
import NoteForm from './NoteForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm/> updates parent state and calls onSubmit', async () => {
    const createNote = vi.fn()
    const user = userEvent.setup()

    render(<NoteForm createNote={createNote} />)

    const input = screen.getByRole('textbox')
    const sendButton = screen.getByText('Submit')

    await user.type(input,'testing a form...')
    await user.click(sendButton)
    // console.log('createNote.mock.calls',createNote.mock.calls)
    // console.log('createNote.mock.calls[0]',createNote.mock.calls[0])
    // console.log('createNote.mock.calls[0][0]',createNote.mock.calls[0][0])

    expect(createNote.mock.calls).toHaveLength(1)
    expect(createNote.mock.calls[0][0].content).toBe('testing a form...')

})