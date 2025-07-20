const loginWith = async (page) => {
    await page.getByText('show login form').click()
    await page.getByTestId('username').fill('jaloomis')
    await page.getByTestId('password').fill('REDACTED_TEST_PASSWORD')
    await page.getByTestId('login-button').click()
}

export { loginWith }