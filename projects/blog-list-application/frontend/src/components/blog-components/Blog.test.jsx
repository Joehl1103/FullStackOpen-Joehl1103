import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author by default', () => {

    const user = {
        username: "Username"
    }

    const blog = {
        title: "Title",
        author: "Author",
        username: "",

    }

    const { container } = render(<Blog blog={blog} user={user} />)
    screen.debug()
    const element = screen.getByText('Title by Author')
    // console.log('element',element)
    expect(element).toBeDefined()
    console.log('container',container)
    const details = container.querySelector('.details')
    // console.log('details',details)
    expect(details).toHaveStyle('display: none')
})