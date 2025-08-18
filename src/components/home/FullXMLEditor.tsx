'use client'

import { useState, useEffect } from 'react'
import { XMLTemplate, presetTemplates } from '@/lib/templates/presets'
import XMLEditor from '@/components/editor/XMLEditor'
import TemplateSelector from '@/components/editor/TemplateSelector'

export default function FullXMLEditor() {
  const [xmlContent, setXmlContent] = useState('')
  const [currentTemplate, setCurrentTemplate] = useState<XMLTemplate | null>(null)
  const [showTemplates, setShowTemplates] = useState(true)

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
    // setShowTemplates(false)
  }

  const handleContentChange = (newContent: string) => {
    setXmlContent(newContent)
    // 清除当前模板（因为内容被修改了）
    if (currentTemplate && newContent !== currentTemplate.content) {
      setCurrentTemplate(null)
    }
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
              
              {showTemplates && (
                <TemplateSelector
                  onSelect={handleTemplateSelect}
                  currentTemplate={currentTemplate}
                />
              )}
            </div>
          </div>

          {/* Main Editor */}
          <div className="lg:col-span-3">
            <XMLEditor
              value={xmlContent}
              onChange={handleContentChange}
              height="600px"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
