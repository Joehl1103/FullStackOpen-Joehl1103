const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createNote } = require('./helper')


describe('Note app', () => {

  // before each test, delete users and notes and create new user
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    
    console.log(`message in beforeEach: delete all users and notes`)
    let response
    try {
      response = await request.post('/api/users',{
        data: {
          username: "jamormis",
          name: "henry portmeister",
          password: "Iheamm100btMM!"
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
    await page.goto('/')
  })

  test('front page can be opened', async ({ page }) => {
    await expect(page.getByTestId('main-notes-header')).toBeVisible()
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2025')).toBeVisible()
  
  })

  test('user can log in', async ({ page }) => {
    await loginWith(page, 'jamormis','Iheamm100btMM!')
    await expect(page.getByText('henry portmeister logged-in')).toBeVisible()
  })

  test('login fails with wrong password', async ({ page }) => {
    await page.getByRole('button', { name: 'Show login form'}).click()
    await page.getByTestId('username').fill('jamormis')
    await page.getByTestId('password').fill('wrong')
    await page.getByRole('button',{ name: 'login'}).click()

    const errorDiv = page.locator('.error')
    await expect(errorDiv).toContainText('Wrong credentials')
    await expect(errorDiv).toHaveCSS('border-style','solid')
    await expect(errorDiv).toHaveCSS('color','rgb(255, 0, 0)')

    await expect(page.getByText('henry portmeister logged-in')).not.toBeVisible()
  })

  describe('when logged in', () => {
    // before each test, log in as jamormis
    beforeEach(async ({ page }) => {
      await loginWith(page, 'jamormis','Iheamm100btMM!')
    })

    test('a new note can be created', async ({ page }) => {
      await createNote(page,'a note created by playwright')
      await expect(page.getByText('a note created by playwright')).toBeVisible()
    })

    describe('and several notes exists', () => {
      beforeEach(async ({ page }) => {
        await createNote(page,'first note')
        await createNote(page,'second note')
        await createNote(page,'third note')
      })

      test.only('one note can be made unimportant', async ({ page }) => {
        await page.pause()
        const noteElement = await page.getByText('second note').locator('..')
        await noteElement.getByRole('button', { name: 'make not important'}).click()
        await expect(noteElement.getByText('make important')).toBeVisible()
      })
    })

  })

})
