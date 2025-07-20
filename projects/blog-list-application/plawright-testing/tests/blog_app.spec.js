const { test,expect,describe,beforeEach } = require('@playwright/test')
const { loginWith } = require('./helper')
describe('blog app', () => {
    beforeEach(async ({ page, request }) => {
        request.post('/api/testing/reset')
        request.post('/api/users',{
            username: 'jaloomis',
            name:'Henry Kissinger',
            password: 'REDACTED_TEST_PASSWORD'
        })

        await page.goto('/')

    })

    test('when not logged in displays login form', async ({ page }) => {
        await page.getByText('show login form').click()
        await expect(page.getByTestId('username')).toBeVisible()
        await expect(page.getByTestId('password')).toBeVisible()
        await expect(page.getByTestId('login-button')).toBeVisible()
        await expect(page.getByText('cancel')).toBeVisible()
    })

    test('successful login', async ({ page }) => {
        await loginWith(page)
        await expect(page.getByText('Logged in as jaloomis')).toBeVisible()

    })
})