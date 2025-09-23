"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiShield, FiClipboard, FiInfo, FiAlertTriangle, FiFileText } from "react-icons/fi";

const sections = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    icon: <FiClipboard className="text-green-400 w-6 h-6 mr-3" />,
    content:
      "By accessing or using Sukoon’s services, you agree to comply with and be bound by these Terms and Conditions. If you disagree with any part, you must not use our platform.",
  },
  {
    id: "responsibilities",
    title: "User Responsibilities",
    icon: <FiInfo className="text-green-400 w-6 h-6 mr-3" />,
    content:
      "Ensure that all information you provide is accurate and up-to-date. Maintain the confidentiality of your account credentials. Use the services only for lawful purposes related to healthcare.",
  },
  {
    id: "privacy",
    title: "Privacy & Data Protection",
    icon: <FiShield className="text-green-400 w-6 h-6 mr-3" />,
    content:
      "Your personal and health information is treated with utmost confidentiality. Please refer to our Privacy Policy for more details.",
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    icon: <FiAlertTriangle className="text-green-400 w-6 h-6 mr-3" />,
    content:
      "Sukoon is not responsible for any indirect, incidental, or consequential damages arising from the use of our services. We provide services 'as-is' without warranties of any kind.",
  },
  {
    id: "intellectual",
    title: "Intellectual Property",
    icon: <FiFileText className="text-green-400 w-6 h-6 mr-3" />,
    content:
      "All content, trademarks, logos, and materials on Sukoon are the property of Sukoon and protected by applicable laws. You may not reproduce, distribute, or use any content without explicit permission.",
  },
];

const TermsPage = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-green-50 py-16 px-4 md:px-24">
      {/* Header */}
      <header className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-green-500 mb-4">Terms & Conditions</h1>
        <p className="text-gray-700 text-lg md:text-xl">
          Welcome to Sukoon! Please read these terms carefully before using our healthcare services.
        </p>
      </header>

      {/* Sections */}
      <main className="max-w-5xl mx-auto space-y-6">
        {sections.map((section) => (
          <motion.section
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 rounded-xl shadow-md border border-green-200 hover:shadow-lg transition cursor-pointer"
          >
            <button
              onClick={() => toggleSection(section.id)}
              className="flex items-center w-full text-left font-semibold text-green-600 text-lg md:text-xl focus:outline-none"
            >
              {section.icon}
              {section.title}
              <span className="ml-auto text-green-400 text-2xl">
                {openSection === section.id ? "−" : "+"}
              </span>
            </button>
            {openSection === section.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="mt-4 text-gray-700 leading-relaxed text-sm md:text-base"
              >
                <p>{section.content}</p>
              </motion.div>
            )}
          </motion.section>
        ))}
      </main>

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} Sukoon. All rights reserved.</p>
        <p className="mt-1">
          <a href="/privacy" className="text-green-400 underline mx-2">
            Privacy Policy
          </a>
          |
          <a href="/" className="text-green-400 underline mx-2">
            Home
          </a>
        </p>
      </footer>
    </div>
  );
};

export default TermsPage;
