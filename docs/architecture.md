# ShopAssist RAG Chatbot - Architecture

## 1. Architecture Overview

ShopAssist is a Retrieval-Augmented Generation (RAG) based customer
support chatbot.

The application retrieves relevant information from an approved
knowledge base and provides that information to an LLM as context
before generating the final response.

The high-level flow is:

    User
      |
      v
    Chatbot UI
      |
      v
    Backend API
      |
      v
    RAG Service
      |
      +--------------------+
      |                    |
      v                    v
    Retriever        Prompt Builder
      |
      v
    Knowledge Base
      |
      v
    Relevant Context
      |
      +--------------------+
                           |
                           v
                         LLM
                           |
                           v
                    Generated Response
                           |
                           v
                      Backend API
                           |
                           v
                       Chatbot UI


## 2. Main Components

### 2.1 Chatbot UI

The UI provides an interface for customers to interact with the
ShopAssist chatbot.

Responsibilities:

- Display chat interface
- Accept user questions
- Send questions to backend API
- Display chatbot responses
- Display errors when requests fail

The UI will be automated using Playwright.


### 2.2 Backend API

The backend exposes an API endpoint that accepts customer questions.

Example:

    POST /api/chat

Request:

    {
      "message": "How long does a refund take?"
    }

Response:

    {
      "answer": "Approved refunds are processed within 5 business days."
    }

Responsibilities:

- Validate incoming requests
- Send questions to the RAG service
- Return generated responses
- Handle errors


### 2.3 RAG Service

The RAG service coordinates the retrieval and generation process.

Responsibilities:

1. Receive user question
2. Search the knowledge base
3. Retrieve relevant content
4. Build the LLM prompt
5. Send prompt and retrieved context to the LLM
6. Return the generated response


### 2.4 Knowledge Base

The knowledge base contains approved ShopAssist support information.

Initial document:

    knowledge-base/support-policy.md

The document contains information about:

- Returns
- Refunds
- Damaged products
- Shipping
- Order cancellation
- Customer support hours

The knowledge base represents the ground truth used for AI evaluation.


### 2.5 Retriever

The retriever searches the knowledge base for information relevant
to the user's question.

Example:

Question:

    "How long do refunds take?"

Retrieved information:

    "Approved refunds are processed within 5 business days."

The retrieved information is then provided to the LLM as context.


### 2.6 Prompt Builder

The prompt builder combines:

- System instructions
- Retrieved context
- User question

Conceptually:

    System Instructions
            +
    Retrieved Context
            +
    User Question
            =
    LLM Prompt


### 2.7 LLM

The Large Language Model generates the final response using the
retrieved context.

The LLM should use the supplied context rather than inventing
unsupported information.


## 3. RAG Request Flow

A typical request follows this flow:

### Step 1 - User Question

The user asks:

    "Can I return a product after 20 days?"


### Step 2 - API Request

The UI sends:

    POST /api/chat


### Step 3 - Retrieval

The retriever searches the knowledge base.

Relevant content:

    Customers can return eligible products within 30 days
    of delivery.


### Step 4 - Context Construction

The retrieved content is added to the prompt.


### Step 5 - LLM Generation

The LLM receives:

    Question:
    Can I return a product after 20 days?

    Context:
    Customers can return eligible products within 30 days
    of delivery.


### Step 6 - Response

The LLM generates:

    "Yes. Eligible products can be returned within 30 days
    of delivery."


### Step 7 - Response to User

The backend sends the response to the UI.


## 4. Testing Architecture

The testing architecture contains multiple layers.

    ┌───────────────────────────────┐
    │           Test Suite          │
    └───────────────┬───────────────┘
                    |
          ┌─────────┴─────────┐
          |                   |
          v                   v
    Functional Tests      AI Evaluation
          |                   |
          v                   v
      Playwright         Promptfoo
          |               DeepEval
          |
          v
      API / UI


### Functional Testing

Playwright will validate:

- UI behavior
- API behavior
- HTTP status codes
- Request/response structure
- Error handling


### AI Testing

AI evaluation will validate:

- Accuracy
- Relevance
- Groundedness
- Hallucination
- Consistency
- Safety
- Prompt injection resistance


## 5. Test Data Flow

Test prompts will be stored separately from test implementation.

Example:

    test-data/
        accuracy-prompts.json
        safety-prompts.json
        injection-prompts.json
        hallucination-prompts.json


This separation allows test data to be updated without changing the
automation framework.


## 6. Reporting

Test results will be collected into:

    reports/

The project will eventually generate:

- Playwright HTML reports
- AI evaluation results
- Prompt evaluation results
- Test execution summaries


## 7. Environment Configuration

Environment-specific configuration will be stored using environment
variables.

Example:

    .env

Possible variables:

    LLM_API_KEY=
    LLM_MODEL=
    BASE_URL=

Secrets must never be committed to Git.


## 8. Planned Project Structure

The final project structure will be approximately:

    rag-chatbot-ai-testing/
    |
    ├── docs/
    │   ├── requirements.md
    │   ├── test-strategy.md
    │   └── architecture.md
    |
    ├── knowledge-base/
    │   └── support-policy.md
    |
    ├── src/
    │   ├── api/
    │   ├── rag/
    │   ├── retriever/
    │   └── llm/
    |
    ├── tests/
    │   ├── api/
    │   ├── ui/
    │   ├── rag/
    │   └── ai/
    |
    ├── test-data/
    │
    ├── reports/
    │
    ├── screenshots/
    │
    ├── .env
    ├── .gitignore
    ├── package.json
    └── README.md


## 9. Design Principles

The project follows these principles:

1. Separate application code from test code.
2. Separate test data from automation logic.
3. Keep secrets outside source code.
4. Use reusable components.
5. Prefer API testing where UI is not required.
6. Use semantic evaluation for AI responses where exact matching
   is inappropriate.
7. Keep the knowledge base version controlled.
8. Make tests suitable for CI/CD execution.