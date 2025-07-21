const { test,expect,describe,beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')
describe('blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')

        const newUser = {
            username: 'jaloomis',
            name:'Henry Kissinger',
            password: 'REDACTED_TEST_PASSWORD'
        }
        await request.post('/api/users', { data: newUser })

        console.log('create new user',newUser)

        await page.goto('/')

    })

    test('when not logged in displays login form', async ({ page }) => {
        await page.getByText('show login form').click()
        await expect(page.getByTestId('username')).toBeVisible()
        await expect(page.getByTestId('password')).toBeVisible()
        await expect(page.getByTestId('login-button')).toBeVisible()
        await expect(page.getByText('cancel')).toBeVisible()
    })

    describe('login', () => {
        test('successful login', async ({ page }) => {
            await loginWith(page,'jaloomis','REDACTED_TEST_PASSWORD')
            await page.getByText(`logged in as jaloomis`).waitFor()
            await expect(page.getByText('Logged in as jaloomis')).toBeVisible()
    
        })

        test('unsuccessful login with incorrect password', async({ page }) => {
            await loginWith(page,'jaloomis','wrong')
            const errorDiv = page.locator('#notification')
            await expect(errorDiv).toContainText('login unsuccessful: wrong username or password')
            await expect(errorDiv).toHaveCSS('border','2px solid rgb(100, 2, 2)')
            await expect(errorDiv).toHaveCSS('color','rgb(255, 0, 0)')

        })

        describe('when logged in', () => {
            beforeEach(async ({ page }) => {
                await loginWith(page,'jaloomis','REDACTED_TEST_PASSWORD')
                await page.getByText(`logged in as jaloomis`).waitFor()

            })

            test('a new blog can be created', async ({ page }) => {
                await page.getByTestId('toggle-on-button').click()
                await page.getByRole('heading', { name: 'Add new blog'}).waitFor()
                await createBlog(page,'first blog','first author','first url')
                await expect(page.getByRole('heading', {name: 'first blog by first author' })).toBeVisible()
            })

            test.only('can like a created blog', async ({ page }) => {
                await page.getByTestId('toggle-on-button').click()
                await page.getByRole('heading', { name: 'Add new blog'}).waitFor()
                await createBlog(page,'first blog','first author','first url')
                await page.getByRole('button', { name: 'view details' }).click()
                await page.getByRole('button', { name: 'like' }).click()
                await expect(page.getByText('Likes: 1')).toBeVisible() 
            })
        })
    })

   
})