'use client'

import { useState } from 'react'
import Layout from '../../../components/layout/Layout'
import { ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react'

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set([0]))

  const faqs = [
    {
      question: 'What is XML Prompt Editor?',
      answer: 'XML Prompt Editor is a professional tool designed for creating, editing, and managing XML prompts used in AI applications. It provides an intuitive interface with syntax highlighting, validation, and template management features.',
      category: 'general'
    },
    {
      question: 'How do I get started with the editor?',
      answer: 'Getting started is easy! Simply navigate to the Editor page, choose a template from our library, and start editing. You can also create your own XML from scratch. The editor includes real-time validation to help you create properly formatted XML prompts.',
      category: 'getting-started'
    },
    {
      question: 'What templates are available?',
      answer: 'We offer a variety of pre-built templates including basic prompts, image generation prompts, text processing prompts, and more. Each template is designed for specific use cases and can be customized to fit your needs. You can browse templates by category and preview them before use.',
      category: 'templates'
    },
    {
      question: 'Can I create my own templates?',
      answer: 'Yes! While we provide pre-built templates, you can create your own XML structures from scratch. The editor supports all standard XML syntax and provides validation to ensure your custom templates are properly formatted.',
      category: 'templates'
    },
    {
      question: 'How does the validation system work?',
      answer: 'Our validation system checks your XML in real-time for syntax errors, structural issues, and best practices. It provides detailed error messages with line numbers and suggestions for fixing issues. The system validates both basic XML syntax and prompt-specific structure requirements.',
      category: 'features'
    },
    {
      question: 'What export formats are supported?',
      answer: 'You can export your XML prompts in multiple formats including XML, JSON, and plain text. The editor also supports copying to clipboard and generating shareable links. All exports maintain the original formatting and structure of your prompts.',
      category: 'features'
    },
    {
      question: 'Is my data stored on your servers?',
      answer: 'No, your XML content is not stored on our servers. All editing happens locally in your browser, and exports are processed client-side. Your prompts remain private and under your control at all times.',
      category: 'privacy'
    },
    {
      question: 'Can I use the editor offline?',
      answer: 'The editor works best with an internet connection for features like template loading and validation. However, once loaded, you can continue editing your XML content even if you temporarily lose connection.',
      category: 'features'
    },
    {
      question: 'What browsers are supported?',
      answer: 'XML Prompt Editor works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version of your browser for the best experience and performance.',
      category: 'technical'
    },
    {
      question: 'How do I report bugs or request features?',
      answer: 'We welcome feedback and bug reports! You can submit issues and feature requests through our GitHub repository. We actively maintain the project and regularly release updates based on user feedback.',
      category: 'support'
    },
    {
      question: 'Are there any usage limits?',
      answer: 'There are no usage limits on the editor itself. You can create as many XML prompts as you need, edit them for as long as you want, and export them without restrictions. The tool is designed for both personal and professional use.',
      category: 'usage'
    },
    {
      question: 'Can I collaborate with others on prompts?',
      answer: 'Currently, the editor is designed for individual use. However, you can easily share your XML prompts by exporting them and sharing the files, or by copying the content to share via email, chat, or other communication tools.',
      category: 'collaboration'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Questions', count: faqs.length },
    { id: 'general', name: 'General', count: faqs.filter(f => f.category === 'general').length },
    { id: 'getting-started', name: 'Getting Started', count: faqs.filter(f => f.category === 'getting-started').length },
    { id: 'templates', name: 'Templates', count: faqs.filter(f => f.category === 'templates').length },
    { id: 'features', name: 'Features', count: faqs.filter(f => f.category === 'features').length },
    { id: 'privacy', name: 'Privacy & Security', count: faqs.filter(f => f.category === 'privacy').length },
    { id: 'technical', name: 'Technical', count: faqs.filter(f => f.category === 'technical').length },
    { id: 'support', name: 'Support', count: faqs.filter(f => f.category === 'support').length },
    { id: 'usage', name: 'Usage', count: faqs.filter(f => f.category === 'usage').length },
    { id: 'collaboration', name: 'Collaboration', count: faqs.filter(f => f.category === 'collaboration').length }
  ]

  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleItem = (index: number) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedItems(newExpanded)
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Header */}
          <div className="text-center mb-16">
            <div className="mx-auto w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
              <HelpCircle className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Find answers to common questions about XML Prompt Editor. 
              Can&apos;t find what you&apos;re looking for? Contact our support team.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-12">
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {/* FAQ List */}
          <div className="max-w-4xl mx-auto">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <HelpCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No questions found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Try adjusting your search terms or category filter.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white pr-4">
                        {faq.question}
                      </h3>
                      {expandedItems.has(index) ? (
                        <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                      )}
                    </button>
                    
                    {expandedItems.has(index) && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Contact Support */}
          <div className="mt-16 text-center">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">
                Still have questions?
              </h2>
              <p className="text-blue-800 dark:text-blue-200 mb-6">
                Can&apos;t find the answer you&apos;re looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://github.com/your-username/xml-prompt-editor/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Report an Issue
                </a>
                <a
                  href="mailto:support@xmlprompteditor.com"
                  className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 dark:text-blue-400 font-medium rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
