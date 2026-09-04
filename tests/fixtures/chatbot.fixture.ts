import { test as base } from '@playwright/test';
import { ChatbotPage } from '../pages/ChatbotPage';

type ChatbotFixtures = {
  chatbotPage: ChatbotPage;
};

export const test = base.extend<ChatbotFixtures>({
  chatbotPage: async ({ page }, use) => {
    const chatbotPage = new ChatbotPage(page);

    await use(chatbotPage);
  },
});

export { expect } from '@playwright/test';