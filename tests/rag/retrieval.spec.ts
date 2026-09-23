import { test, expect } from '@playwright/test';

test.describe('RAG Retrieval Tests', () => {
  test('should retrieve shipping context for a shipping question', async ({
    request,
  }) => {
    const response = await request.post('/api/chat', {
      data: {
        message: 'How long does express shipping take?',
      },
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(body.context.toLowerCase()).toContain('shipping');
    expect(body.context.toLowerCase()).toContain('express');
    expect(body.context).toContain('1-2 business days');
  });

  test('should retrieve refund context for a refund question', async ({
    request,
  }) => {
    const response = await request.post('/api/chat', {
      data: {
        message: 'How long do approved refunds take?',
      },
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(body.context.toLowerCase()).toContain('refund');
    expect(body.context).toContain('5 business days');
  });

  test('should retrieve return context for a return question', async ({
    request,
  }) => {
    const response = await request.post('/api/chat', {
      data: {
        message: 'How long do I have to return a product?',
      },
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(body.context.toLowerCase()).toContain('return');
    expect(body.context).toContain('30 days');
  });
});