const loginWith = async (page,username,password) => {
    await page.getByRole('button', { name: 'Show login form' }).click()
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}

const createNote = async (page,content) => {
    await page.getByRole('button', { name: 'add new note'}).click()
    await page.getByTestId('note-field').fill(content)
    await page.getByRole('button', { name: 'Submit'}).click()
    await page.getByText(content).waitFor()
}


export { loginWith, createNote }