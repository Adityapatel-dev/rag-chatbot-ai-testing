import { test, expect } from '@playwright/test';

test.describe('Chat API - Robustness', () => {
  test('should handle different wording for refund question', async ({
    request,
  }) => {
    const response = await request.post('/api/chat', {
      data: {
        message: 'When will my approved refund be processed?',
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.answer).toContain('5 business days');
  });

  test('should handle different wording for shipping question', async ({
    request,
  }) => {
    const response = await request.post('/api/chat', {
      data: {
        message: 'How quickly can I get my express delivery?',
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.answer).toContain('1-2 business days');
  });

  test('should handle uppercase input', async ({ request }) => {
    const response = await request.post('/api/chat', {
      data: {
        message: 'HOW LONG DOES EXPRESS SHIPPING TAKE?',
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.answer).toContain('1-2 business days');
  });

  test('should safely handle an out-of-domain question', async ({
    request,
  }) => {
    const response = await request.post('/api/chat', {
      data: {
        message: 'What is the weather today?',
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.answer).toBe(
      'The information is not available in the support policy.'
    );
  });
});