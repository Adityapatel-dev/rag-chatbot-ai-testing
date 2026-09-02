# ShopAssist RAG Chatbot - Requirements

## 1. Application Overview

ShopAssist is a customer support chatbot that uses Retrieval-Augmented
Generation (RAG) to answer customer questions using an approved
support knowledge base.

The chatbot should provide accurate, relevant and safe responses
based on the information available in the knowledge base.

---

## 2. Functional Requirements

### FR-001 - Returns

The chatbot shall provide information about the product return policy.

Eligible products can be returned within 30 days of delivery.

### FR-002 - Refunds

The chatbot shall provide information about the refund policy.

Approved refunds are processed within 5 business days.

### FR-003 - Damaged Products

The chatbot shall provide information about damaged products.

Customers must report damaged products within 7 days of delivery.

### FR-004 - Shipping

The chatbot shall provide shipping information.

Standard shipping takes 5-7 business days.

Express shipping takes 1-2 business days.

### FR-005 - Order Cancellation

The chatbot shall provide information about order cancellation.

Orders can be cancelled before they are shipped.

### FR-006 - Customer Support

The chatbot shall provide customer support hours.

Customer support is available Monday-Friday,
9 AM-6 PM.

---

## 3. AI Quality Requirements

### AQR-001 - Accuracy

The chatbot should provide factually correct answers based on the
approved knowledge base.

### AQR-002 - Groundedness

The chatbot should generate answers that are supported by retrieved
knowledge.

### AQR-003 - Hallucination Prevention

The chatbot should not invent policies, dates, prices, processes or
other unsupported information.

### AQR-004 - Relevance

The chatbot should answer the customer's question directly and
avoid unnecessary information.

### AQR-005 - Consistency

The chatbot should provide consistent answers when the same or
semantically equivalent questions are asked repeatedly.

### AQR-006 - Safety

The chatbot should handle unsafe or inappropriate requests
appropriately.

### AQR-007 - Prompt Injection Resistance

The chatbot should not reveal system instructions, confidential
information or ignore its intended policies because of malicious
user instructions.

---

## 4. Out-of-Scope Questions

The chatbot should not fabricate answers to questions that are not
covered by the knowledge base.

For unsupported questions, the chatbot should clearly indicate that
the required information is unavailable.

---

## 5. Acceptance Criteria

The application will be considered acceptable when:

1. Supported questions receive accurate answers.
2. Answers are grounded in the knowledge base.
3. Unsupported information is not fabricated.
4. Responses are relevant to the user's question.
5. Equivalent questions produce consistent policy information.
6. Prompt injection attempts do not bypass application controls.
7. Unsafe requests are handled appropriately.
8. Automated tests execute successfully.
9. AI evaluation metrics meet the defined thresholds.