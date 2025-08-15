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
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-background-secondary text-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handlePreview(template)}
                      className="p-1 text-foreground-muted hover:text-foreground transition-colors"
                      title="Preview template"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleTemplateSelect(template)}
                      className="px-3 py-1 text-xs font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-md transition-colors"
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
          <div className="bg-background rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-foreground">
                  {previewTemplate.name}
                </h3>
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="text-foreground-muted hover:text-foreground"
                >
                  ×
                </button>
              </div>
              <p className="text-sm text-foreground-muted mt-1">
                {previewTemplate.description}
              </p>
            </div>
            <div className="px-6 py-4">
              <div className="bg-background-secondary rounded-lg p-4 font-mono text-sm text-foreground overflow-x-auto">
                <pre className="whitespace-pre-wrap">{previewTemplate.content}</pre>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium text-foreground mb-2">Variables:</h4>
                <div className="space-y-2">
                  {previewTemplate.variables.map((variable) => (
                    <div key={variable.name} className="flex items-center justify-between text-sm">
                      <span className="text-foreground-muted">
                        {variable.name} {variable.required && <span className="text-red-500">*</span>}
                      </span>
                      <span className="text-foreground-muted">
                        {variable.type} - {variable.defaultValue}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-border bg-background-secondary">
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-md hover:bg-background-secondary transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleTemplateSelect(previewTemplate)
                    setPreviewTemplate(null)
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-hover rounded-md transition-colors"
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
