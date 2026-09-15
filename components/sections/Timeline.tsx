'use client';

import { motion } from 'framer-motion';

const timelineEvents = [
  {
    date: 'date yaad nhi',
    title: 'Lucky Day - Tumhara "Hii" Reply Aaya 💬',
    description:
      'Maine sirf request bheji thi and aapne accept kari uske baad aapka "Hii" ka message mujhe bahut shocking laga and maine 1 din liye reply krne main mujhe laga fake id h',
    emoji: '💌',
  },
  {
    date: 'iski bhi date yaad nhi mujhe',
    title: 'Pehla Voice Note 🎙️',
    description:
      'Jss din mujhe tumhara pehla voice note mila. Pehli baar tumhari aawaz suni aur sach bolu toh uss voice note ko maine baar baar suna. Bahut accha laga.',
    emoji: '🎧',
  },
  {
    date: 'Iski bhi date yaad nahi mujhe',
    title: 'The first time you sent me your picture 😂',
    description:
      'Pata nahi us picture mein aisa kya tha, lekin tumhari woh pehli picture dekhkar ek alag si smile aa gayi thi. Shayad picture se zyada special baat yeh thi ki tumne mujhse itna comfortable feel kiya ki apni picture share ki. Chhoti si baat thi, lekin mere liye woh moment kaafi special ban gaya. ❤️',
    emoji: '📸',
  },
  {
    date: 'Not Remembered',
    title: 'Trust Build Hone Laga ❤️',
    description:
      'Iss din mujhe feel hua ki tum mere saath pehle se zyada comfortable ho rahi ho. Tumne personal baatein mujhse share ki, aur mere liye woh sirf ek baatein nahi thi. Mujhe laga ki tum mujhe apni life ka thoda sa aur hissa samajhne lagi ho, aur honestly, mujhe yeh feeling bahut special lagi.',
    emoji: '📸',
  },
  {
    date: 'Sorry not remembered',
    title: 'Phone Number Exchange 📱',
    description:
      'Phone par hamari pehli baar baat hui thi, aur sabse shocking baat ye thi ki call tumne kiya tha. 😂 Mujhe abhi bhi yaad hai, tumhara call dekhkar meri toh literally phat gayi thi ki arre yeh achanak kya ho gaya. 😂❤️',
    emoji: '☎️',
  },
  {
    date: 'Sorry Yaad nhi',
    title: 'Tumhari Aadat Si Hone Lagi ❤️',
    description:
      'Kabhi hum ek dusre ko tease karte hain, kabhi care karte hain, kabhi personal baatein share karte hain aur kabhi bas bina kisi reason ke ghanton baat karte hain. Pata hi nahi chala kab tumse baat karna meri daily life ka ek favourite part ban gaya. Tumse baat karke ek alag sa sukoon milta hai, aur shayad isi liye ab dil chahta hai ki yeh connection sirf aaj tak nahi, balki hamesha aise hi beautiful bana rahe. ❤️',
    emoji: '✨',
  },
];

export function Timeline() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="timeline"
      className="relative min-h-screen w-full bg-gradient-to-b from-white via-blue-50 to-white py-20 px-6"
    >
      <div className="mx-auto max-w-4xl">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <p className="text-blue-600 font-semibold mb-2">Our Connection</p>
            <h2 className="text-5xl font-bold text-gray-900 mb-2">
              <span className="text-blue-500">Timeline</span> Since June 24
            </h2>
            <p className="text-gray-600">Every moment that brought us closer</p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-200 via-blue-400 to-blue-200 -translate-x-1/2" />

            {/* Timeline events */}
            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`relative flex gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className="w-1/2">
                    <motion.div
                      whileHover={{ y: -5 }}
                      className={`${
                        index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'
                      }`}
                    >
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block"
                      >
                        <p className="text-5xl mb-2">{event.emoji}</p>
                      </motion.div>
                      <p className="text-blue-600 font-semibold text-sm">{event.date}</p>
                      <h3 className="text-2xl font-bold text-gray-900 mt-1">{event.title}</h3>
                      <p className="text-gray-600 mt-2 leading-relaxed">{event.description}</p>
                    </motion.div>
                  </div>

                  {/* Center dot */}
                  <div className="w-0 flex justify-center">
                    <motion.div
                      whileInView={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 0.6 }}
                      className="w-6 h-6 bg-white border-4 border-blue-500 rounded-full shadow-lg"
                    />
                  </div>

                  {/* Empty space on other side */}
                  <div className="w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Add milestone button */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center pt-8"
          >
            <button className="px-6 py-3 rounded-full border-2 border-blue-400 text-blue-600 font-semibold hover:bg-blue-50 transition-colors">
              + Add a Milestone
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
