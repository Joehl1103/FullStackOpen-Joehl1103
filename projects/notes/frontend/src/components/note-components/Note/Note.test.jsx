import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

test('renders content', async () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }

    const mockHandler = vi.fn() // creates a mock function

    render(<Note
        note={note}
        toggleImportanceOf={mockHandler} />) // this part is difficult to understand

    const user = userEvent.setup() // creates a session
    const button = screen.getByText('make not important')
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
})
