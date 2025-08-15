'use client'

import { useState, useEffect } from 'react'
import { XMLTemplate, presetTemplates } from '@/lib/templates/presets'
import XMLEditor from '@/components/editor/XMLEditor'
import TemplateSelector from '@/components/editor/TemplateSelector'
import ValidationPanel from '@/components/editor/ValidationPanel'

export default function FullXMLEditor() {
  const [xmlContent, setXmlContent] = useState('')
  const [currentTemplate, setCurrentTemplate] = useState<XMLTemplate | null>(null)
  const [showTemplates, setShowTemplates] = useState(false)

  // 加载默认模板
  useEffect(() => {
    const defaultTemplate = presetTemplates.find(t => t.id === 'chinese-qa-assistant')
    if (defaultTemplate) {
      setXmlContent(defaultTemplate.content)
      setCurrentTemplate(defaultTemplate)
    }
  }, [])

  const handleTemplateSelect = (template: XMLTemplate) => {
    setXmlContent(template.content)
    setCurrentTemplate(template)
    setShowTemplates(false)
  }

  const handleContentChange = (newContent: string) => {
    setXmlContent(newContent)
    // 清除当前模板（因为内容被修改了）
    if (currentTemplate && newContent !== currentTemplate.content) {
      setCurrentTemplate(null)
    }
  }

  const handleValidationErrorClick = (line: number, column: number) => {
    // 这里可以实现跳转到编辑器特定位置的功能
    console.log(`Navigate to line ${line}, column ${column}`)
  }

  return (
    <section id="xml-editor" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
            Professional XML Editor
          </h2>
          <p className="mt-4 text-lg text-foreground-muted">
            Create, edit, and validate XML prompts with our advanced editor
          </p>
        </div>

        {/* Main Editor Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Templates */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="mb-4">
                <button
                  onClick={() => setShowTemplates(!showTemplates)}
                  className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
                >
                  {showTemplates ? 'Hide' : 'Show'} Templates
                </button>
              </div>
              
              {showTemplates && (
                <TemplateSelector
                  onSelect={handleTemplateSelect}
                  currentTemplate={currentTemplate}
                />
              )}
            </div>
          </div>

          {/* Main Editor */}
          <div className="lg:col-span-2">
            <XMLEditor
              value={xmlContent}
              onChange={handleContentChange}
              height="600px"
              className="w-full"
            />
          </div>

          {/* Right Sidebar - Validation */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Current Template Info */}
              {currentTemplate && (
                <div className="bg-background-secondary rounded-lg border border-border p-4">
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Current Template
                  </h3>
                  <p className="text-sm text-foreground-muted mb-2">
                    {currentTemplate.name}
                  </p>
                  <p className="text-xs text-foreground-muted">
                    {currentTemplate.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {currentTemplate.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Validation Panel */}
              <ValidationPanel
                content={xmlContent}
                onErrorClick={handleValidationErrorClick}
              />

              {/* Quick Actions */}
              <div className="bg-background-secondary rounded-lg border border-border p-4">
                <h3 className="text-lg font-medium text-foreground mb-3">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      const formatted = xmlContent
                        .replace(/>\s+</g, '><')
                        .replace(/\n\s*/g, '\n')
                      setXmlContent(formatted)
                    }}
                    className="w-full px-3 py-2 text-sm text-foreground bg-background border border-border rounded hover:bg-background-secondary transition-colors"
                  >
                    Format XML
                  </button>
                  <button
                    onClick={() => {
                      const minified = xmlContent
                        .replace(/>\s+</g, '><')
                        .replace(/\n/g, '')
                        .replace(/\s+/g, ' ')
                      setXmlContent(minified)
                    }}
                    className="w-full px-3 py-2 text-sm text-foreground bg-background border border-border rounded hover:bg-background-secondary transition-colors"
                  >
                    Minify XML
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
