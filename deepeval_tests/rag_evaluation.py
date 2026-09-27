import requests

from deepeval import evaluate
from deepeval.metrics import AnswerRelevancyMetric, FaithfulnessMetric
from deepeval.test_case import LLMTestCase

from deepeval_tests.test_data import RAG_TEST_CASES


API_URL = "http://localhost:3000/api/chat"


def get_chat_response(question: str) -> dict:
    response = requests.post(
        API_URL,
        json={"message": question},
        timeout=10,
    )

    response.raise_for_status()
    return response.json()


test_cases = []

for test_case_data in RAG_TEST_CASES:
    question = test_case_data["question"]
    expected_answer = test_case_data["expected_answer"]

    result = get_chat_response(question)
    actual_answer = result["answer"]

    # Deterministic expected-answer check
    if actual_answer != expected_answer:
        raise AssertionError(
            f"\nQuestion: {question}"
            f"\nExpected: {expected_answer}"
            f"\nActual: {actual_answer}"
        )

    test_cases.append(
        LLMTestCase(
            input=question,
            actual_output=actual_answer,
            expected_output=expected_answer,
            retrieval_context=[result["context"]],
        )
    )


answer_relevancy = AnswerRelevancyMetric(
    threshold=0.8
)

faithfulness = FaithfulnessMetric(
    threshold=0.8
)


evaluate(
    test_cases,
    [
        answer_relevancy,
        faithfulness,
    ],
)