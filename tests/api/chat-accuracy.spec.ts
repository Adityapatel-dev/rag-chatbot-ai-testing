import { test, expect } from '@playwright/test';
import { accuracyTestCases } from '../../test-data/chatbot-data';

test.describe('Chat API - Accuracy', () => {
  for (const testCase of accuracyTestCases) {
    test(
      `should return the correct ${testCase.name}`,
      async ({ request }) => {
        const response = await request.post('/api/chat', {
          data: {
            message: testCase.question,
          },
        });

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body.answer).toBe(testCase.expectedAnswer);
      }
    );
  }
});