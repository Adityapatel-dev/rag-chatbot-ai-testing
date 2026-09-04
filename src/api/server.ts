import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { retrieveContext } from '../retriever/retriever';
import { generateAnswer } from '../llm/llmClient';

dotenv.config();

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  res.sendFile(
    path.join(process.cwd(), 'src', 'ui', 'index.html')
  );
});

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'shopassist-rag-chatbot',
  });
});

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({
      error: 'Message is required',
    });
  }

  const context = retrieveContext(message);
  const answer = await generateAnswer(message, context);

  return res.status(200).json({
    message,
    answer,
    context,
  });
});

app.listen(port, () => {
  console.log(`ShopAssist server running on port ${port}`);
});
