'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface ChatMessage {
  id: string;
  sender: 'you' | 'them';
  message: string;
  timestamp: string;
}

export function FavoriteChats() {
  const [expandedChat, setExpandedChat] = useState<string | null>(null);

  const favoriteChats: ChatMessage[][] = [
    [
      {
        id: '1a',
        sender: 'you',
        message: 'Hii',
        timestamp: '10:30 AM',
      },
      {
        id: '1b',
        sender: 'them',
        message: 'It took you two days to reply to “Hii.”',
        timestamp: '10:00 PM',
      },
      {
        id: '1c',
        sender: 'you',
        message: 'Yes, actually, I was busy with something, so I didn’t get any time.',
        timestamp: '10:32 PM',
      },
      {
        id: '1d',
        sender: 'them',
        message: 'bf bana lu aapko aapke view dekh ke mann ho gya',
        timestamp: '10:33 AM',
      },
    ],
    [
      {
        id: '2a',
        sender: 'them',
        message: 'bf bana lu aapko aapke view dekh ke mann ho gya',
        timestamp: '3:45 PM',
      },
      {
        id: '2b',
        sender: 'you',
        message: 'Bana lo yrr Jaisa aapka mann kare',
        timestamp: '3:46 PM',
      },
      {
        id: '2c',
        sender: 'them',
        message: 'mara mann??',
        timestamp: '3:47 PM',
      },
      {
        id: '2d',
        sender: 'you',
        message: 'Nhi yrr main majak kr rhi thi main itni jldbaazi nhi karungi',
        timestamp: '3:48 PM',
      },
    ],
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="chats" className="relative min-h-screen w-full bg-gradient-to-b from-white via-blue-50 to-white py-20 px-6">
      <div className="mx-auto max-w-4xl">
        {/* Section title */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-5xl font-bold text-gray-900">
            Favorite <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Chats</span>
          </h2>
          <p className="text-lg text-gray-600">Our best conversations captured in one place</p>
        </motion.div>

        {/* Chat bubbles */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {favoriteChats.map((chat, chatIdx) => (
            <motion.div
              key={chatIdx}
              variants={itemVariants}
              onClick={() => setExpandedChat(expandedChat === `chat-${chatIdx}` ? null : `chat-${chatIdx}`)}
              className="cursor-pointer rounded-2xl bg-white p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-400"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-gray-500">
                  Chat {chatIdx + 1}
                </p>
                <span className="text-xl">{expandedChat === `chat-${chatIdx}` ? '▼' : '▶'}</span>
              </div>

              {/* Preview message */}
              <p className="text-gray-700 mb-3 line-clamp-2">{chat[0].message}</p>

              {/* Expanded messages */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: expandedChat === `chat-${chatIdx}` ? 'auto' : 0,
                  opacity: expandedChat === `chat-${chatIdx}` ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  {chat.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'you' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs rounded-lg px-4 py-2 ${
                          msg.sender === 'you'
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                            : 'bg-gray-200 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <p className={`text-xs mt-1 ${msg.sender === 'you' ? 'text-blue-100' : 'text-gray-500'}`}>
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
