'use client'

import { useState } from 'react'
import { XMLTemplate, templateCategories } from '@/lib/templates/presets'
import { Search, Filter, Eye, Check } from 'lucide-react'

interface TemplateSelectorProps {
  onSelect: (template: XMLTemplate) => void
  currentTemplate?: XMLTemplate | null
}

const TemplateSelector = ({ onSelect, currentTemplate }: TemplateSelectorProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [previewTemplate, setPreviewTemplate] = useState<XMLTemplate | null>(null)

  const filteredTemplates = templateCategories
    .filter(category => selectedCategory === 'all' || category.id === selectedCategory)
    .flatMap(category => category.templates)
    .filter(template =>
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )

  const handleTemplateSelect = (template: XMLTemplate) => {
    onSelect(template)
  }

  const handlePreview = (template: XMLTemplate) => {
    setPreviewTemplate(template)
  }

  return (
    <div className="bg-background rounded-lg border border-border">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border">
        <h3 className="text-lg font-medium text-foreground">Templates</h3>
        <p className="text-sm text-foreground-muted">Choose from our pre-built templates</p>
      </div>

      {/* Search and Filter */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground-muted" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background text-foreground placeholder-foreground-muted focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground-muted" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {templateCategories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Templates List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredTemplates.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <p className="text-foreground-muted">No templates found</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className={`px-4 py-3 hover:bg-background-secondary transition-colors ${
                  currentTemplate?.id === template.id ? 'bg-primary/10' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-medium text-foreground">
                        {template.name}
                      </h4>
                      {currentTemplate?.id === template.id && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <p className="text-sm text-foreground-muted mb-2">
                      {template.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {template.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handlePreview(template)}
                      className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      title="Preview template"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleTemplateSelect(template)}
                      className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 rounded-md transition-colors"
                    >
                      Use
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {previewTemplate.name}
                </h3>
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ×
                </button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {previewTemplate.description}
              </p>
            </div>
            <div className="px-6 py-4">
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-100 overflow-x-auto">
                <pre className="whitespace-pre-wrap">{previewTemplate.content}</pre>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Variables:</h4>
                <div className="space-y-2">
                  {previewTemplate.variables.map((variable) => (
                    <div key={variable.name} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        {variable.name} {variable.required && <span className="text-red-500">*</span>}
                      </span>
                      <span className="text-gray-500 dark:text-gray-500">
                        {variable.type} - {variable.defaultValue}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleTemplateSelect(previewTemplate)
                    setPreviewTemplate(null)
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                >
                  Use Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TemplateSelector
