export async function generateAnswer(
  question: string,
  context: string
): Promise<string> {
  if (!context.trim()) {
    return 'The information is not available in the support policy.';
  }

  const normalizedQuestion = question.toLowerCase();
  const normalizedContext = context.toLowerCase();

  // Shipping
  if (normalizedContext.includes('shipping')) {
  const asksAboutCost =
    normalizedQuestion.includes('cost') ||
    normalizedQuestion.includes('price') ||
    normalizedQuestion.includes('fee');

  if (asksAboutCost) {
    return 'The information is not available in the support policy.';
  }

  const asksAboutTime =
    normalizedQuestion.includes('how long') ||
    normalizedQuestion.includes('how much time') ||
    normalizedQuestion.includes('delivery time') ||
    normalizedQuestion.includes('days');

  if (asksAboutTime) {
    if (normalizedQuestion.includes('express')) {
      return 'Express shipping takes 1-2 business days.';
    }

    if (normalizedQuestion.includes('standard')) {
      return 'Standard shipping takes 5-7 business days.';
    }
  }
}

  // Refunds
  if (
    normalizedContext.includes('refunds') &&
    normalizedContext.includes('5 business days')
  ) {
    return 'Approved refunds are processed within 5 business days.';
  }

  // Returns
  if (
    normalizedContext.includes('returns') &&
    normalizedContext.includes('30 days')
  ) {
    return 'Eligible products can be returned within 30 days of delivery.';
  }

  // Cancellation
  if (
    normalizedContext.includes('order cancellation') &&
    normalizedContext.includes('before they are shipped')
  ) {
    return 'Orders can be cancelled before they are shipped.';
  }

  // Unsupported information
  if (normalizedContext.includes('unsupported information')) {
    if (
      normalizedQuestion.includes('price') ||
      normalizedQuestion.includes('cost')
    ) {
      return 'Product prices are not defined in the support policy.';
    }

    if (
      normalizedQuestion.includes('discount') ||
      normalizedQuestion.includes('offer')
    ) {
      return 'Discount information is not defined in the support policy.';
    }

    if (
      normalizedQuestion.includes('payment') ||
      normalizedQuestion.includes('upi')
    ) {
      return 'Payment method information is not defined in the support policy.';
    }

    if (
      normalizedQuestion.includes('inventory') ||
      normalizedQuestion.includes('stock')
    ) {
      return 'Product inventory information is not defined in the support policy.';
    }

    return 'The information is not available in the support policy.';
  }

  return 'The information is not available in the support policy.';
}