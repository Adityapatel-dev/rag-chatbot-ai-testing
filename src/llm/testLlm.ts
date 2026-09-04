import dotenv from 'dotenv';

dotenv.config();

console.log('Starting LLM test...');
console.log('API key loaded:', !!process.env.LLM_API_KEY);
console.log('Model:', process.env.LLM_MODEL);

async function main() {
  console.log('Loading LLM client...');

  const { generateAnswer } = await import('./llmClient.js');

  console.log('Calling LLM...');

  const context = `
4. Shipping

Standard shipping takes 5-7 business days.
Express shipping takes 1-2 business days.
`;

  const answer = await generateAnswer(
    'How long does standard shipping take?',
    context
  );

  console.log('\nLLM Answer:');
  console.log(answer);
}

main().catch((error) => {
  console.error('\nLLM test failed:');
  console.error(error);
  process.exit(1);
});