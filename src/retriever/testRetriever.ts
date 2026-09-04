import { retrieveContext } from './retriever';

const queries = [
  'How long does express shipping take?',
  'How many days do I have to return a product?',
  'Can I cancel my order before it is shipped?',
  'What discount can I get on my order?',
  'Is this product currently in stock?',
];

for (const query of queries) {
  console.log('\nQUESTION:', query);
  console.log('CONTEXT:', retrieveContext(query));
}