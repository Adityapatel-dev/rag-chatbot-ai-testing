export const chatbotTestData = {
  refund: {
    question: 'How long does a refund take?',
    expectedAnswer:
      'Approved refunds are processed within 5 business days.',
  },

  expressShipping: {
    question: 'How long does express shipping take?',
    expectedAnswer:
      'Express shipping takes 1-2 business days.',
  },

  standardShipping: {
    question: 'How long does standard shipping take?',
    expectedAnswer:
      'Standard shipping takes 5-7 business days.',
  },

  returnPolicy: {
    question: 'How many days do I have to return a product?',
    expectedAnswer:
      'Eligible products can be returned within 30 days of delivery.',
  },

  cancellation: {
    question: 'Can I cancel my order before it is shipped?',
    expectedAnswer:
      'Orders can be cancelled before they are shipped.',
  },
};

export const accuracyTestCases = [
  {
    name: 'refund policy',
    question: chatbotTestData.refund.question,
    expectedAnswer: chatbotTestData.refund.expectedAnswer,
  },
  {
    name: 'standard shipping policy',
    question: chatbotTestData.standardShipping.question,
    expectedAnswer: chatbotTestData.standardShipping.expectedAnswer,
  },
  {
    name: 'express shipping policy',
    question: chatbotTestData.expressShipping.question,
    expectedAnswer: chatbotTestData.expressShipping.expectedAnswer,
  },
  {
    name: 'return policy',
    question: chatbotTestData.returnPolicy.question,
    expectedAnswer: chatbotTestData.returnPolicy.expectedAnswer,
  },
  {
    name: 'cancellation policy',
    question: chatbotTestData.cancellation.question,
    expectedAnswer: chatbotTestData.cancellation.expectedAnswer,
  },
];