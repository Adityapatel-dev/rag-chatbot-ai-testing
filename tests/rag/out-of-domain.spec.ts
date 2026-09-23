import { test, expect } from '@playwright/test';

test.describe('RAG Out-of-Domain Tests', () => {
  test('should not invent product price information', async ({ request }) => {
    const response = await request.post('/api/chat', {
      data: {
        message: 'How much does this product cost?',
      },
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(body.answer).toContain(
      'Product prices are not defined in the support policy.'
    );
  });

  test('should not invent discount information', async ({ request }) => {
    const response = await request.post('/api/chat', {
      data: {
        message: 'Do you offer discounts?',
      },
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(body.answer).toContain(
      'Discount information is not defined in the support policy.'
    );
  });

  test('should not invent payment method information', async ({
    request,
  }) => {
    const response = await request.post('/api/chat', {
      data: {
        message: 'What payment methods do you support?',
      },
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(body.answer).toContain(
      'Payment method information is not defined in the support policy.'
    );
  });

  test('should not invent inventory information', async ({ request }) => {
    const response = await request.post('/api/chat', {
      data: {
        message: 'Is this product currently in stock?',
      },
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(body.answer).toContain(
      'Product inventory information is not defined in the support policy.'
    );
  });

  test('should not invent employee information', async ({ request }) => {
    const response = await request.post('/api/chat', {
      data: {
        message: 'Who is the CEO of ShopAssist?',
      },
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(body.answer).toContain(
      'The information is not available in the support policy.'
    );
  });
});