const { test, expect } = require('@playwright/test');
const { pathToFileURL } = require('node:url');
const path = require('node:path');

test.beforeEach(async ({ page }) => {
  await page.goto(pathToFileURL(path.resolve(__dirname, '../morpion/index.html')).href);
  await expect(page.locator('.cell')).toHaveCount(9);
  await expect(page.getByRole('status')).toHaveText('Au tour de X');
});

async function moves(page, sequence) {
  for (const number of sequence) await page.locator('.cell').nth(number - 1).click();
}

async function board(page, expected) {
  await expect(page.locator('.cell')).toHaveText(expected);
}

// Dispatch a click to a disabled square to also exercise the script's guard.
async function blockedClick(page, number) {
  await page.locator('.cell').nth(number - 1).evaluate(button => button.click());
  await page.locator('.cell').nth(number - 1).dispatchEvent('click');
}

test('Essai 1 : alternance et case occupée', async ({ page }) => {
  await moves(page, [1]);
  await expect(page.getByRole('status')).toHaveText('Au tour de O');
  await blockedClick(page, 1);
  await expect(page.getByRole('status')).toHaveText('Au tour de O');
  await moves(page, [4]);
  await board(page, ['X', '', '', 'O', '', '', '', '', '']);
  await expect(page.getByRole('status')).toHaveText('Au tour de X');
});

test('Essai 2 : X gagne sur la première ligne', async ({ page }) => {
  await moves(page, [1, 4, 2, 5, 3]);
  await expect(page.getByRole('status')).toHaveText('X a gagné !');
  await expect(page.locator('.winner')).toHaveText(['X', 'X', 'X']);
});

test('Essai 3 : aucun coup après une victoire', async ({ page }) => {
  await moves(page, [1, 4, 2, 5, 3]);
  await blockedClick(page, 9);
  await board(page, ['X', 'X', 'X', 'O', 'O', '', '', '', '']);
  await expect(page.locator('.cell:disabled')).toHaveCount(9);
  await expect(page.getByRole('status')).toHaveText('X a gagné !');
});

test('Essai 4 : nouvelle partie et X recommence', async ({ page }) => {
  await moves(page, [1, 4, 2, 5, 3]);
  await page.getByRole('button', { name: 'Nouvelle partie' }).click();
  await board(page, Array(9).fill(''));
  await expect(page.locator('.winner')).toHaveCount(0);
  await expect(page.locator('.cell:enabled')).toHaveCount(9);
  await expect(page.getByRole('status')).toHaveText('Au tour de X');
  await moves(page, [5]);
  await expect(page.locator('.cell').nth(4)).toHaveText('X');
});

test('Essai 5 : match nul et blocage', async ({ page }) => {
  await moves(page, [1, 2, 3, 5, 4, 6, 8, 7, 9]);
  const expected = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
  await board(page, expected);
  await expect(page.getByRole('status')).toHaveText('Match nul !');
  await expect(page.locator('.cell:disabled')).toHaveCount(9);
  await blockedClick(page, 1);
  await board(page, expected);
});

test('O gagne verticalement', async ({ page }) => {
  await moves(page, [1, 2, 3, 5, 4, 8]);
  await expect(page.getByRole('status')).toHaveText('O a gagné !');
  await expect(page.locator('.winner')).toHaveText(['O', 'O', 'O']);
});

test('X gagne en diagonale', async ({ page }) => {
  await moves(page, [1, 2, 5, 3, 9]);
  await expect(page.getByRole('status')).toHaveText('X a gagné !');
  await expect(page.locator('.winner')).toHaveText(['X', 'X', 'X']);
});
