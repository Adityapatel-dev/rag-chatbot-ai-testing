import { test, expect } from '@playwright/test';

test.describe('Chat API', () => {
  test('should return grounded refund answer', async ({ request }) => {
    const response = await request.post('/api/chat', {
      data: {
        message: 'How long does a refund take?',
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.answer).toBe(
      'Approved refunds are processed within 5 business days.'
    );

    expect(body.context).toContain(
      'Approved refunds are processed within 5 business days'
    );
  });
});