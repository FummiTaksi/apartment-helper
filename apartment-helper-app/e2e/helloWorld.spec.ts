import { test, expect } from '@playwright/test'

test.describe('Hello world', () => {
  test('should be able to login to see hello world page', async ({ page }) => {
    await page.goto('http://localhost:3000/login')
    await page.getByPlaceholder('Username').type('admin')
    await page.getByPlaceholder('Password').type('password')
    await page.getByRole('button').click()
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('h1')).toContainText('Hello World!')
  })
})
