const { test, expect, describe, beforeEach } = require('@playwright/test')

describe('Note app', () => {

  // before each test, delete users and notes and create new user
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    
    console.log(`message in beforeEach: delete all users and notes`)
    let response
    try {
      response = await request.post('http://localhost:3001/api/users',{
        data: {
          username: "jamormis",
          name: "henry portmeister",
          password: "REDACTED_TEST_PASSWORD"
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log('response from user creation',response)
      console.log('new user created')
    } catch (e){
      console.log('response from user creation',response)
      console.log(`Error while trying to create a user: ${e.message}`)
    }
    await page.goto('http://localhost:5173')
  })

  test('front page can be opened', async ({ page }) => {
    await expect(page.getByTestId('main-notes-header')).toBeVisible()
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2025')).toBeVisible()
  
  })

  test('user can log in', async ({ page }) => {
    await page.getByRole('button', { name: 'Show login form' }).click()
    await page.getByTestId('username').fill('jamormis')
    await page.getByTestId('password').fill('REDACTED_TEST_PASSWORD')
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByText('henry portmeister logged-in')).toBeVisible()
  })

  describe('when logged in', () => {
    // before each test, log in as jamormis
    beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'Show login form' }).click()
      await page.getByTestId('username').fill('jamormis')
      await page.getByTestId('password').fill('REDACTED_TEST_PASSWORD')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new note can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'add new note'}).click()
      await page.getByTestId('note-field').fill('a note created by playwright')
      await page.getByRole('button', { name: 'Submit'}).click()
      await expect(page.getByText('a note created by playwright')).toBeVisible()
    })

  })

})
