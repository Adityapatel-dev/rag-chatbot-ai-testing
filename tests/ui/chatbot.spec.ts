import { test } from '../fixtures/chatbot.fixture';
import { chatbotTestData } from '../../test-data/chatbot-data';

test.describe('ShopAssist Chatbot UI', () => {
  test('should display the chatbot page', async ({ chatbotPage }) => {
    await chatbotPage.goto();

    await chatbotPage.expectPageLoaded();
  });

  test('should display the refund answer', async ({ chatbotPage }) => {
    await chatbotPage.goto();

    await chatbotPage.askQuestion(
      chatbotTestData.refund.question
    );

    await chatbotPage.expectAnswer(
      chatbotTestData.refund.expectedAnswer
    );
  });

  test('should display the express shipping answer', async ({
    chatbotPage,
  }) => {
    await chatbotPage.goto();

    await chatbotPage.askQuestion(
      chatbotTestData.expressShipping.question
    );

    await chatbotPage.expectAnswer(
      chatbotTestData.expressShipping.expectedAnswer
    );
  });
});