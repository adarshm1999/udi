'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const defaultQuestions = [
  {
    id: '1',
    question: '💫 Aisa kya hai jo tum chahti ho ki hum future mein saath karein?',
    answer: '',
  },
  {
    id: '2',
    question: '🤭 Mere liye tumhara favourite nickname kya hoga?',
    answer: '',
  },
  {
    id: '3',
    question: '🌙 Agar hum pehli baar officially milenge, toh sabse pehle kya karna chahogi?',
    answer: '',
  },
  {
    id: '4',
    question: '😊 Humari ab tak ki sabse favourite memory kaunsi hai jo tum kabhi nahi bhoolna chahogi?',
    answer: '',
  },
  {
    id: '5',
    question: '✨ Agar humari story ko ek title dena ho, toh tum kya naam rakhogi aur kyun?',
    answer: '',
  },
];

interface Question {
  id: string;
  question: string;
  answer: string;
}

interface ApiQuestion {
  id: string;
  question: string;
  answer: string;
  createdAt?: string;
  updatedAt?: string;
}

export function Questions() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>(defaultQuestions);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('/api/questions', {
        method: 'GET',
        cache: 'no-store',
      });

      const result = await response.json();

      if (result.success) {
        const savedAnswers: Record<string, string> = {};

        result.data.forEach((item: ApiQuestion) => {
          savedAnswers[item.id] = item.answer;
        });

        setAnswers(savedAnswers);

        setQuestions(
          defaultQuestions.map((question) => ({
            ...question,
            answer: savedAnswers[question.id] || '',
          }))
        );
      }
    } catch (error) {
      console.error('Unable to fetch questions', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (id: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const saveAnswer = async (id: string, question: string) => {
    const answer = answers[id];

    if (!answer?.trim()) {
      alert('Please write your answer first ❤️');
      return;
    }

    try {
      setSavingId(id);

      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          question,
          answer: answer.trim(),
        }),
      });

      const result = await response.json();

      if (result.success) {
        setQuestions((prev) =>
          prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  answer: answer.trim(),
                }
              : item
          )
        );

        setAnswers((prev) => ({
          ...prev,
          [id]: answer.trim(),
        }));

        setSuccessMessage('❤️ Answer Saved Successfully');

        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } else {
        alert(result.message || 'Unable to save answer.');
      }
    } catch (error) {
      console.error(error);
      alert('Unable to save answer.');
    } finally {
      setSavingId(null);
    }
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  };

  if (loading) {
    return (
      <div className="py-32 text-center text-lg font-semibold">
        Loading Questions...
      </div>
    );
  }

  return (
    <section
      id="questions"
      className="relative min-h-screen w-full bg-gradient-to-b from-white via-pink-50 to-white px-6 py-20"
    >
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Questions for You
          </h2>
          <p className="text-lg text-gray-600">
            Things I always want to know about you 💭
          </p>

          {successMessage && (
            <div className="mx-auto mt-6 max-w-md rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700 shadow-sm">
              {successMessage}
            </div>
          )}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {questions.map((question) => {
            const isExpanded = expandedId === question.id;
            const savedAnswer = question.answer;
            const currentAnswer = answers[question.id] || '';

            return (
              <motion.div key={question.id} variants={itemVariants}>
                <div
                  className={`rounded-2xl border-2 transition-all duration-300 ${
                    isExpanded
                      ? 'border-pink-400 bg-gradient-to-r from-pink-100 to-rose-100'
                      : 'border-pink-200 bg-white hover:border-pink-400'
                  }`}
                >
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() =>
                      setExpandedId(isExpanded ? null : question.id)
                    }
                    className="w-full p-6 text-left"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-3">
                          <span className="text-2xl">❓</span>
                          <h3 className="text-lg font-bold text-gray-900">
                            {question.question}
                          </h3>
                        </div>
                      </div>

                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-4 flex-shrink-0"
                      >
                        <span className="text-2xl">⏷</span>
                      </motion.div>
                    </div>
                  </motion.button>

                  <motion.div
                    initial={false}
                    animate={{
                      opacity: isExpanded ? 1 : 0,
                      height: isExpanded ? 'auto' : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      {savedAnswer ? (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="mb-4 rounded-xl border-l-4 border-pink-500 bg-white p-4"
                        >
                          <p className="mb-2 text-sm font-semibold text-pink-600">
                            Saved Answer
                          </p>
                          <p className="leading-relaxed text-gray-700">
                            {savedAnswer}
                          </p>
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="mb-4 rounded-xl border-l-4 border-yellow-400 bg-gradient-to-r from-pink-50 to-rose-50 p-4 italic text-gray-500"
                        >
                          Waiting for your answer... 💭
                        </motion.div>
                      )}

                      <div className="space-y-3">
                        <textarea
                          value={currentAnswer}
                          onChange={(e) =>
                            handleAnswerChange(question.id, e.target.value)
                          }
                          placeholder="Write your answer here..."
                          rows={4}
                          className="w-full rounded-xl border border-pink-200 bg-white p-4 text-gray-700 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            saveAnswer(question.id, question.question)
                          }
                          disabled={savingId === question.id}
                          className="rounded-xl bg-pink-500 px-5 py-3 font-semibold text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          {savingId === question.id
                            ? 'Saving...'
                            : savedAnswer
                            ? 'Update Answer'
                            : 'Save Answer'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="absolute right-10 top-20 text-6xl opacity-20"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          💭
        </motion.div>

        <motion.div
          className="absolute bottom-32 left-10 text-6xl opacity-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
        >
          💭
        </motion.div>
      </div>
    </section>
  );
}
