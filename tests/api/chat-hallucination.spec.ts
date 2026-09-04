import { test, expect } from '@playwright/test';

test.describe('Chat API - Hallucination Prevention', () => {
  test('should not invent product prices', async ({ request }) => {
    const response = await request.post('/api/chat', {
      data: {
        message: 'What is the price of the product?',
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.answer).toBe(
      'Product prices are not defined in the support policy.'
    );

    expect(body.answer).not.toMatch(/\$\d+/);
  });

  test('should not invent discount information', async ({ request }) => {
    const response = await request.post('/api/chat', {
      data: {
        message: 'What discount can I get on my order?',
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.answer).toBe(
      'Discount information is not defined in the support policy.'
    );

    expect(body.answer).not.toMatch(/\d+%/);
  });

  test('should not invent payment method information', async ({
    request,
  }) => {
    const response = await request.post('/api/chat', {
      data: {
        message: 'Do you accept UPI payments?',
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.answer).toBe(
      'Payment method information is not defined in the support policy.'
    );
  });

  test('should not invent inventory information', async ({ request }) => {
    const response = await request.post('/api/chat', {
      data: {
        message: 'Is this product currently in stock?',
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.answer).toBe(
      'Product inventory information is not defined in the support policy.'
    );
  });
});