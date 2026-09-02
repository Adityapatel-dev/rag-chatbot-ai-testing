# ShopAssist RAG Chatbot - Test Strategy

## 1. Objective

The objective of this test strategy is to validate the functional
behavior, API behavior and AI-specific quality characteristics of
the ShopAssist RAG customer support chatbot.

The testing approach combines traditional software testing with
LLM and RAG evaluation techniques.

---

## 2. Testing Scope

### In Scope

- Chatbot API testing
- Chatbot UI testing
- Functional testing
- Knowledge retrieval testing
- Accuracy testing
- Relevance testing
- Groundedness testing
- Hallucination testing
- Consistency testing
- Safety testing
- Prompt injection testing
- Robustness testing
- Out-of-domain testing
- Regression testing

### Out of Scope

- Performance/load testing of the LLM provider
- Training a foundation model
- Model fine-tuning
- Infrastructure penetration testing
- Production monitoring

---

## 3. Testing Levels

### Level 1 - Unit Testing

Individual application components will be tested independently.

Examples:

- Document loading
- Text chunking
- Retrieval logic
- Prompt construction
- Response parsing

### Level 2 - API Testing

The chatbot API will be tested independently from the UI.

Examples:

- Valid request
- Empty request
- Invalid request
- Unsupported question
- Response structure
- HTTP status code

### Level 3 - UI Testing

The chatbot UI will be tested using Playwright.

Examples:

- Open chatbot
- Enter question
- Submit question
- Verify response
- Error handling

### Level 4 - AI Evaluation

AI-specific tests will evaluate the quality of generated responses.

Examples:

- Accuracy
- Relevance
- Groundedness
- Hallucination
- Consistency
- Safety

### Level 5 - Security Testing

The chatbot will be tested against malicious and adversarial
inputs.

Examples:

- Prompt injection
- Instruction override
- System prompt extraction
- Data leakage attempts
- Role manipulation

---

## 4. Test Categories

| Category | Purpose |
|---|---|
| Functional | Verify application functionality |
| Accuracy | Verify factual correctness |
| Relevance | Verify answer relevance |
| RAG | Verify retrieved information supports the answer |
| Groundedness | Verify answer is supported by context |
| Hallucination | Detect unsupported information |
| Consistency | Verify stable answers for equivalent prompts |
| Safety | Verify safe handling of harmful requests |
| Prompt Injection | Verify resistance to malicious instructions |
| Robustness | Verify behavior with unusual inputs |
| Out-of-Domain | Verify unsupported questions are handled correctly |
| Regression | Verify existing behavior after changes |

---

## 5. AI Evaluation Principles

Traditional UI automation often uses exact assertions.

Example:

    expect(response).toContain("5 business days");

However, LLM responses can express the same meaning using different
words.

Example:

    "The refund is processed within 5 business days."

and

    "Approved refunds generally take up to five working days."

Both responses may be semantically acceptable.

Therefore, AI testing will use semantic and quality-based evaluation
in addition to exact assertions.

---

## 6. Evaluation Dimensions

### Accuracy

Does the response contain correct information?

### Relevance

Does the response directly answer the user's question?

### Groundedness

Is the response supported by the retrieved knowledge?

### Hallucination

Does the response contain unsupported or fabricated information?

### Consistency

Does the chatbot maintain important facts across repeated or
semantically equivalent questions?

### Safety

Does the chatbot appropriately handle unsafe or inappropriate
requests?

### Prompt Injection Resistance

Does the chatbot maintain its intended behavior when the user
attempts to override instructions?

---

## 7. Initial Test Distribution

The initial test suite will contain approximately 30 AI-focused
test cases.

| Category | Target Tests |
|---|---:|
| Accuracy | 5 |
| Relevance | 3 |
| Hallucination | 4 |
| Groundedness | 4 |
| Consistency | 2 |
| Safety | 3 |
| Prompt Injection | 4 |
| Robustness | 3 |
| Out-of-Domain | 2 |
| **Total** | **30** |

---

## 8. Test Oracle Strategy

Because LLM responses are probabilistic, a traditional exact-value
test oracle is not always appropriate.

The project will use multiple validation approaches:

1. Ground-truth comparison
2. Semantic evaluation
3. LLM-as-a-Judge evaluation
4. Knowledge-base comparison
5. Rule-based assertions
6. Keyword assertions where appropriate
7. Human review for selected failures

No single evaluation technique will be treated as sufficient for
all AI test cases.

---

## 9. Pass/Fail Strategy

Traditional tests:

    PASS = Expected result matches actual result

AI tests:

    PASS = Response meets defined evaluation criteria

Example:

Question:

    "How long does an approved refund take?"

Ground truth:

    "5 business days"

Potential acceptable response:

    "Approved refunds are processed within five business days."

Potential failure:

    "Refunds usually take 10 business days."

Potential failure:

    "Refunds are always processed within 24 hours."

---

## 10. Severity

### Critical

Security or safety failure with significant impact.

Examples:

- System prompt leakage
- Sensitive information disclosure
- Successful prompt injection causing unauthorized behavior

### High

Major factual or business-policy failure.

Examples:

- Incorrect refund policy
- Incorrect cancellation policy
- Fabricated company policy

### Medium

Quality issue affecting usefulness.

Examples:

- Irrelevant response
- Incomplete answer
- Inconsistent response

### Low

Minor presentation or wording issue.

Examples:

- Unnecessary wording
- Minor formatting issue
- Non-critical grammar issue

---

## 11. Automation Strategy

Playwright will be used for:

- UI automation
- API automation
- Regression testing

Promptfoo will be used for:

- Prompt evaluation
- Model comparison
- Automated assertions
- Evaluation datasets

DeepEval will be used for:

- LLM evaluation
- RAG evaluation
- AI-specific metrics

Postman will be used for:

- Manual API testing
- API collections
- API validation

---

## 12. CI/CD Strategy

The automated test suite will eventually run through GitHub Actions.

The planned pipeline is:

    Developer Push
          ↓
    Install Dependencies
          ↓
    Run Tests
          ↓
    AI Evaluation
          ↓
    Generate Reports
          ↓
    Pass / Fail Pipeline

---

## 13. Test Evidence

Test execution evidence will include:

- Playwright HTML reports
- Screenshots for UI failures
- API test results
- AI evaluation results
- Prompt evaluation results
- Failure analysis

---

## 14. Exit Criteria

Testing can be considered complete for a release when:

1. All critical functional tests pass.
2. No critical security failures remain.
3. AI evaluation thresholds are met.
4. Known hallucination issues are documented.
5. Regression tests pass.
6. Test reports are generated.
7. Critical and high-severity defects are resolved or accepted.