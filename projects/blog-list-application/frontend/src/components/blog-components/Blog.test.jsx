import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('testing blog visibility', () => {

    let container

    const user = {
        username: "Username"
    }

    const blog = {
        title: "Title",
        author: "Author",
        username: "",
        url: 'https:blog.com',
        likes: 2
    }

    const mockHandler = vi.fn()

    beforeEach(() => {
        container = render(
            <Blog blog={blog} user={user} />
        ).container
    })

    test('renders title and author by default', () => {
        // screen.debug()
        const element = screen.getByText('Title by Author')
        // console.log('element',element)
        expect(element).toBeDefined()
        // console.log('container',container)
        const details = container.querySelector('.details')
        // console.log('details',details)
        expect(details).toHaveStyle('display: none')
    })
    
    test.only('renders author,url,likes when details are clicked', async () => {

        const user = userEvent.setup()
        const button = screen.getByText("view details")
        // console.log('button',button)
        // screen.debug()
        await user.click(button)

        screen.debug()

        const details = container.querySelector('.details')
        // console.log('details',details)
        expect(details).toHaveStyle('display: block')
        expect(screen.getByText(/Title by Author/)).toBeInTheDocument()
        expect(screen.getByText(/Author: Author/)).toBeInTheDocument()
        expect(screen.getByText(/https:blog.com/)).toBeInTheDocument()
        expect(screen.getByText(/Likes: 2/)).toBeInTheDocument()

        const hideDetails = container.querySelector('.hideDetails')
        expect(hideDetails).toBeVisible()

    })
})

