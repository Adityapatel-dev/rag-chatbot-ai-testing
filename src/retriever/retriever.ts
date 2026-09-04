import fs from 'fs';
import path from 'path';

const knowledgeBasePath = path.join(
  process.cwd(),
  'knowledge-base',
  'support-policy.md'
);

const stopWords = new Set([
  'what',
  'how',
  'long',
  'does',
  'do',
  'is',
  'the',
  'a',
  'an',
  'of',
  'to',
  'my',
  'can',
  'i',
  'get',
  'on',
  'it',
  'this',
  'currently',
]);

const sectionKeywords: Record<string, string[]> = {
  returns: ['return', 'returns', 'eligible'],
  refunds: ['refund', 'refunds'],
  damaged: ['damaged', 'damage'],
  shipping: ['shipping', 'standard', 'express'],
  cancellation: ['cancel', 'cancellation', 'cancelled'],
  support: ['support', 'customer'],
  unsupported: [
    'price',
    'prices',
    'discount',
    'discounts',
    'payment',
    'payments',
    'upi',
    'inventory',
    'stock',
  ],
};

export function retrieveContext(query: string): string {
  const knowledgeBase = fs.readFileSync(knowledgeBasePath, 'utf-8');

  const sections = knowledgeBase
    .split(/^## /m)
    .filter(Boolean);

  const queryWords = query
    .toLowerCase()
    .split(/\W+/)
    .filter((word) => word.length > 2 && !stopWords.has(word));

  const scoredSections = sections.map((section) => {
    const sectionText = section.toLowerCase();

    const sectionName = sectionText.split(/\r?\n/)[0].trim();

    let score = 0;

    for (const word of queryWords) {
      if (sectionText.includes(word)) {
        score += 1;
      }
    }

    for (const [category, keywords] of Object.entries(sectionKeywords)) {
      if (
        sectionName.includes(category) &&
        keywords.some((keyword) => queryWords.includes(keyword))
      ) {
        score += 5;
      }
    }

    return {
      section,
      score,
    };
  });

  const bestMatch = scoredSections
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)[0];

  return bestMatch?.section || '';
}