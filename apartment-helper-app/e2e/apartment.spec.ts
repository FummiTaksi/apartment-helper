import { test, expect } from '@playwright/test'
test.describe('Create apartment', () => {
  const apartmentTitle = 'Great apartment'
  test('Authenticated user is able to create apartment', async ({ page }) => {
    await page.goto('http://localhost:3000/login')
    await page.getByPlaceholder('Username').type('admin')
    await page.getByPlaceholder('Password').type('password')
    await page.getByRole('button').click()

    await page.getByTestId('create-new-apartment-link').click()

    await page.getByTestId('apartment-url').fill('www.example.com')
    await page.getByTestId('apartment-title').fill(apartmentTitle)
    await page
      .getByTestId('apartment-description')
      .fill('Has something special.')

    await page.getByTestId('submit-apartment').click()

    await expect(page.getByTestId('create-apartment-success')).toBeVisible()
  })

  test('Authenticated user is able to view apartments', async ({ page }) => {
    await page.goto('http://localhost:3000/login')
    await page.getByPlaceholder('Username').type('admin')
    await page.getByPlaceholder('Password').type('password')
    await page.getByRole('button').click()

    await expect(page.getByTestId('apartment-0')).toBeVisible()
    await expect(page.getByTestId('apartment-0')).toContainText(apartmentTitle)
  })
})
