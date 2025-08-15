'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { Save, Download, Copy, RotateCcw } from 'lucide-react'

// 动态导入 Monaco Editor 以避免 SSR 问题
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="h-96 bg-background-secondary rounded-lg flex items-center justify-center">
      <div className="text-foreground-muted">Loading editor...</div>
    </div>
  ),
})

interface XMLEditorProps {
  value: string
  onChange: (value: string) => void
  onValidate?: (errors: any[]) => void
  theme?: 'vs' | 'vs-dark' | 'hc-black'
  height?: string | number
  className?: string
}

const XMLEditor = ({
  value,
  onChange,
  onValidate,
  theme = 'vs',
  height = '600px',
  className = '',
}: XMLEditorProps) => {
  const [isDirty, setIsDirty] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const editorRef = useRef<any>(null)

  useEffect(() => {
    // 检查内容是否被修改
    setIsDirty(false)
  }, [value])

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor
    
    // 配置 XML 语言支持
    if (typeof window !== 'undefined' && (window as any).monaco) {
      const monaco = (window as any).monaco
      try {
        if (monaco.languages.xml?.xmlDefaults) {
          monaco.languages.xml.xmlDefaults.setDiagnosticsOptions({
            validate: true,
            schemaValidation: 'warning',
            enableSchemaRequest: false,
          })
        } else {
          console.warn('XML language support not fully initialized, skipping diagnostics configuration')
        }
      } catch (error) {
        console.warn('Failed to configure XML language support:', error)
      }
    }

    // 设置编辑器选项
    editor.updateOptions({
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      fontSize: 14,
      lineNumbers: 'on',
      roundedSelection: false,
      automaticLayout: true,
    })
  }

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      onChange(value)
      setIsDirty(true)
    }
  }

  const handleSave = () => {
    // 这里可以实现保存逻辑
    setIsDirty(false)
    setLastSaved(new Date())
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      // 可以添加复制成功的提示
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const handleDownload = () => {
    const blob = new Blob([value], { type: 'text/xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'prompt.xml'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleFormat = () => {
    if (editorRef.current) {
      editorRef.current.getAction('editor.action.formatDocument').run()
    }
  }

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* Editor Header */}
      <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">prompt.xml</span>
          <div className="flex items-center space-x-2">
            {isDirty && (
              <span className="text-xs text-orange-600 dark:text-orange-400 px-2 py-1 bg-orange-100 dark:bg-orange-900/30 rounded">
                Modified
              </span>
            )}
            {lastSaved && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Last saved: {lastSaved.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Editor Toolbar */}
      <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleFormat}
              className="px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              title="Format XML"
            >
              <RotateCcw className="h-3 w-3 inline mr-1" />
              Format
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              title="Copy to clipboard"
            >
              <Copy className="h-3 w-3 inline mr-1" />
              Copy
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              title="Download file"
            >
              <Download className="h-3 w-3 inline mr-1" />
              Download
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors"
              title="Save changes"
            >
              <Save className="h-3 w-3 inline mr-1" />
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="p-4">
        <MonacoEditor
          height={height}
          language="xml"
          theme={theme}
          value={value}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={{
            selectOnLineNumbers: true,
            roundedSelection: false,
            readOnly: false,
            cursorStyle: 'line',
            automaticLayout: true,
            scrollBeyondLastLine: false,
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            folding: true,
            wordWrap: 'on',
          }}
        />
      </div>
    </div>
  )
}

export default XMLEditor
