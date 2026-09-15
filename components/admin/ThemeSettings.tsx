'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useSettingsStore } from '@/lib/store';
import { COLORS } from '@/lib/constants';

export function ThemeSettings() {
  const theme = useSettingsStore((state) => state.theme);
  const updateTheme = useSettingsStore((state) => state.updateTheme);

  const [themeForm, setThemeForm] = useState(theme);

  const handleColorChange = (key: string, value: string) => {
    setThemeForm({ ...themeForm, [key]: value });
  };

  const handleSave = () => {
    updateTheme(themeForm);
  };

  const presets = [
    {
      name: 'Pink Romance',
      colors: {
        primaryColor: '#ff1493',
        secondaryColor: '#ffc0cb',
        accentColor: '#ffd700',
      },
    },
    {
      name: 'Red Passion',
      colors: {
        primaryColor: '#dc143c',
        secondaryColor: '#ff69b4',
        accentColor: '#ffa500',
      },
    },
    {
      name: 'Purple Dream',
      colors: {
        primaryColor: '#9370db',
        secondaryColor: '#e6ccff',
        accentColor: '#ffb6c1',
      },
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Color Presets */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl p-6 border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Color Presets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {presets.map((preset, index) => (
            <motion.button
              key={index}
              onClick={() => setThemeForm({ ...themeForm, ...preset.colors })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 rounded-lg border-2 border-gray-200 hover:border-pink-400 transition-all"
            >
              <h3 className="font-bold text-gray-900 mb-3">{preset.name}</h3>
              <div className="flex gap-2">
                {Object.values(preset.colors).map((color, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-lg"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Custom Colors */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl p-6 border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Custom Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Primary Color', key: 'primaryColor' },
            { label: 'Secondary Color', key: 'secondaryColor' },
            { label: 'Accent Color', key: 'accentColor' },
          ].map((color) => (
            <motion.div
              key={color.key}
              variants={itemVariants}
              className="space-y-2"
            >
              <label className="block font-semibold text-gray-900">
                {color.label}
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={themeForm[color.key as keyof typeof themeForm] || '#ff1493'}
                  onChange={(e) =>
                    handleColorChange(color.key, e.target.value)
                  }
                  className="w-12 h-12 rounded-lg cursor-pointer border border-gray-300"
                />
                <input
                  type="text"
                  value={themeForm[color.key as keyof typeof themeForm] || '#ff1493'}
                  onChange={(e) =>
                    handleColorChange(color.key, e.target.value)
                  }
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 font-mono"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Font Settings */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl p-6 border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Typography</h2>
        <div className="space-y-4">
          <div>
            <label className="block font-semibold text-gray-900 mb-2">
              Font Family
            </label>
            <select
              value={themeForm.fontFamily || 'Poppins'}
              onChange={(e) =>
                handleColorChange('fontFamily', e.target.value)
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option>Poppins</option>
              <option>Inter</option>
              <option>Playfair Display</option>
              <option>Monts serrat</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Preview */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl p-6 border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Preview</h2>
        <div className="space-y-4">
          <div
            className="h-20 rounded-lg flex items-center justify-center text-white font-bold text-xl"
            style={{ backgroundColor: themeForm.primaryColor || COLORS.primary }}
          >
            Primary Color
          </div>
          <div
            className="h-20 rounded-lg flex items-center justify-center text-gray-900 font-bold text-xl"
            style={{ backgroundColor: themeForm.secondaryColor || COLORS.secondary }}
          >
            Secondary Color
          </div>
          <div
            className="h-20 rounded-lg flex items-center justify-center text-gray-900 font-bold text-xl"
            style={{ backgroundColor: themeForm.accentColor || COLORS.accent }}
          >
            Accent Color
          </div>
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div
        variants={itemVariants}
        className="flex gap-4"
      >
        <motion.button
          onClick={handleSave}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 rounded-lg bg-pink-500 text-white font-semibold hover:bg-pink-600 transition-colors"
        >
          Save Changes
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
        >
          Reset to Default
        </motion.button>
      </motion.div>

      {/* Info */}
      <motion.div
        variants={itemVariants}
        className="bg-blue-50 rounded-xl p-6 border border-blue-200"
      >
        <p className="text-gray-700">
          Changes to the theme will be applied across the entire website. All colors 
          are saved automatically and will persist when you visit the page again.
        </p>
      </motion.div>
    </motion.div>
  );
}
