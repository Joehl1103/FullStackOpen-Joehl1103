const { test,expect,describe,beforeEach } = require('@playwright/test')

describe('blog app', () => {
    beforeEach(async ({ page }) => {
        await page.goto('/')
    })

    test('when not logged in displays login form', async ({ page }) => {
        await page.getByText('show login form').click()
        await expect(page.getByTestId('username')).toBeVisible()
        await expect(page.getByTestId('password')).toBeVisible()
        await expect(page.getByTestId('login-button')).toBeVisible()
        await expect(page.getByText('cancel')).toBeVisible()
    })
})