import { test, expect } from '@playwright/test';

test.describe('RAG Groundedness Tests', () => {
  test('express shipping answer should be grounded in retrieved context', async ({
    request,
  }) => {
    const response = await request.post('/api/chat', {
      data: {
        message: 'How long does express shipping take?',
      },
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(body.answer).toContain('1-2 business days');
    expect(body.context).toContain('1-2 business days');
  });

  test('refund answer should be grounded in retrieved context', async ({
    request,
  }) => {
    const response = await request.post('/api/chat', {
      data: {
        message: 'How long do approved refunds take?',
      },
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(body.answer).toContain('5 business days');
    expect(body.context).toContain('5 business days');
  });

  test('return answer should be grounded in retrieved context', async ({
    request,
  }) => {
    const response = await request.post('/api/chat', {
      data: {
        message: 'How long do I have to return a product?',
      },
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(body.answer).toContain('30 days');
    expect(body.context).toContain('30 days');
  });
});