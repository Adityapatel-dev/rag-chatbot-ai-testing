import { expect, Locator, Page } from '@playwright/test';

export class ChatbotPage {
  readonly page: Page;
  readonly messageInput: Locator;
  readonly sendButton: Locator;
  readonly answer: Locator;
  readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;

    this.heading = page.getByRole('heading', {
      name: 'ShopAssist',
    });

    this.messageInput = page.getByPlaceholder(
      'Ask about returns, refunds, shipping...'
    );

    this.sendButton = page.getByRole('button', {
      name: 'Send',
    });

    this.answer = page.locator('#answer');
  }

  async goto() {
    await this.page.goto('/');
  }

  async askQuestion(question: string) {
    await this.messageInput.fill(question);
    await this.sendButton.click();
  }

  async expectAnswer(expectedAnswer: string) {
    await expect(this.answer).toHaveText(expectedAnswer);
  }

  async expectPageLoaded() {
    await expect(this.heading).toBeVisible();
    await expect(this.messageInput).toBeVisible();
    await expect(this.sendButton).toBeVisible();
  }
}