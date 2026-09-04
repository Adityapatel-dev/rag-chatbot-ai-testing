import { test, expect } from '@playwright/test';
import { retrieveContext } from '../../src/retriever/retriever';

test.describe('Retriever', () => {
  test('should retrieve refund policy for refund query', () => {
    const context = retrieveContext('How long does a refund take?');

    expect(context).toContain(
      'Approved refunds are processed within 5 business days'
    );
  });

  test('should retrieve shipping policy for shipping query', () => {
    const context = retrieveContext('How long does standard shipping take?');

    expect(context).toContain(
      'Standard shipping takes 5-7 business days'
    );
  });

  test('should retrieve unsupported information policy for price query', () => {
    const context = retrieveContext('What is the price of the product?');

    expect(context).toContain('Product prices');
    expect(context).toContain('Unsupported Information');
  });
});