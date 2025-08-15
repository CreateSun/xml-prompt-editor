'use client'

import { useState, useEffect } from 'react'
import { AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react'

interface ValidationError {
  type: 'error' | 'warning' | 'info'
  message: string
  line?: number
  column?: number
  severity: 'error' | 'warning' | 'info'
}

interface ValidationPanelProps {
  content: string
  onErrorClick?: (line: number, column: number) => void
}

const ValidationPanel = ({ content, onErrorClick }: ValidationPanelProps) => {
  const [errors, setErrors] = useState<ValidationError[]>([])
  const [isValidating, setIsValidating] = useState(false)

  useEffect(() => {
    if (content) {
      validateXML(content)
    }
  }, [content])

  const validateXML = async (xmlContent: string) => {
    setIsValidating(true)
    const validationErrors: ValidationError[] = []

    try {
      // 基本语法验证
      const parser = new DOMParser()
      const doc = parser.parseFromString(xmlContent, 'text/xml')
      
      // 检查解析错误
      const parseErrors = doc.getElementsByTagName('parsererror')
      if (parseErrors.length > 0) {
        validationErrors.push({
          type: 'error',
          message: 'XML parsing error: Invalid XML syntax',
          severity: 'error',
        })
      }

      // 检查根元素
      const rootElement = doc.documentElement
      if (!rootElement || rootElement.tagName !== 'prompt') {
        validationErrors.push({
          type: 'error',
          message: 'Root element must be "prompt"',
          severity: 'error',
        })
      }

      // 检查必需元素
      const systemElement = doc.querySelector('system')
      if (!systemElement) {
        validationErrors.push({
          type: 'warning',
          message: 'Missing "system" element (recommended)',
          severity: 'warning',
        })
      }

      const inputElement = doc.querySelector('input')
      if (!inputElement) {
        validationErrors.push({
          type: 'error',
          message: 'Missing "input" element (required)',
          severity: 'error',
        })
      }

      const outputElement = doc.querySelector('output')
      if (!outputElement) {
        validationErrors.push({
          type: 'warning',
          message: 'Missing "output" element (recommended)',
          severity: 'warning',
        })
      }

      // 检查标签闭合
      const unclosedTags = findUnclosedTags(xmlContent)
      unclosedTags.forEach(tag => {
        validationErrors.push({
          type: 'error',
          message: `Unclosed tag: ${tag}`,
          severity: 'error',
        })
      })

      // 检查属性格式
      const invalidAttributes = findInvalidAttributes(xmlContent)
      invalidAttributes.forEach(attr => {
        validationErrors.push({
          type: 'warning',
          message: `Invalid attribute format: ${attr}`,
          severity: 'warning',
        })
      })

    } catch (error) {
      validationErrors.push({
        type: 'error',
        message: `Validation error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        severity: 'error',
      })
    }

    setErrors(validationErrors)
    setIsValidating(false)
  }

  const findUnclosedTags = (xmlContent: string): string[] => {
    const unclosed: string[] = []
    const tagRegex = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)/g
    const stack: string[] = []
    let match

    while ((match = tagRegex.exec(xmlContent)) !== null) {
      const isClosing = match[1] === '/'
      const tagName = match[2]

      if (isClosing) {
        if (stack.length === 0 || stack.pop() !== tagName) {
          unclosed.push(tagName)
        }
      } else {
        stack.push(tagName)
      }
    }

    // 检查未闭合的标签
    stack.forEach(tag => {
      unclosed.push(tag)
    })

    return unclosed
  }

  const findInvalidAttributes = (xmlContent: string): string[] => {
    const invalid: string[] = []
    const attrRegex = /<[^>]*\s+([a-zA-Z][a-zA-Z0-9]*)\s*=\s*[^>]*>/g
    let match

    while ((match = attrRegex.exec(xmlContent)) !== null) {
      const attributes = match[0].match(/([a-zA-Z][a-zA-Z0-9]*)\s*=\s*["'][^"']*["']/g)
      if (attributes) {
        attributes.forEach(attr => {
          const [name, value] = attr.split('=')
          if (!value || !value.match(/^["'][^"']*["']$/)) {
            invalid.push(attr.trim())
          }
        })
      }
    }

    return invalid
  }

  const getErrorIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case 'info':
        return <Info className="h-4 w-4 text-primary" />
      default:
        return <Info className="h-4 w-4 text-foreground-muted" />
    }
  }

  const getErrorColor = (type: string) => {
    switch (type) {
      case 'error':
        return 'border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800'
      case 'warning':
        return 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800'
      case 'info':
        return 'border-primary/20 bg-primary/10 dark:bg-primary/20 dark:border-primary/30'
      default:
        return 'border-border bg-background-secondary'
    }
  }

  const hasErrors = errors.some(e => e.severity === 'error')
  const hasWarnings = errors.some(e => e.severity === 'warning')
  const hasInfo = errors.some(e => e.severity === 'info')

  return (
    <div className="bg-background rounded-lg border border-border">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-foreground">Validation</h3>
          <div className="flex items-center space-x-2">
            {isValidating && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            )}
            {!isValidating && (
              <div className="flex items-center space-x-1">
                {hasErrors && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200">
                    {errors.filter(e => e.severity === 'error').length} Errors
                  </span>
                )}
                {hasWarnings && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200">
                    {errors.filter(e => e.severity === 'warning').length} Warnings
                  </span>
                )}
                {hasInfo && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {errors.filter(e => e.severity === 'info').length} Info
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-h-96 overflow-y-auto">
        {isValidating ? (
          <div className="px-4 py-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-foreground-muted">Validating XML...</p>
          </div>
        ) : errors.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <p className="text-green-600 dark:text-green-400 font-medium">XML is valid!</p>
            <p className="text-foreground-muted text-sm mt-1">No validation errors found</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {errors.map((error, index) => (
              <div
                key={index}
                className={`px-4 py-3 border-l-4 ${getErrorColor(error.type)}`}
              >
                <div className="flex items-start space-x-3">
                  {getErrorIcon(error.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">
                      {error.message}
                    </p>
                    {error.line && error.column && (
                      <p className="text-xs text-foreground-muted mt-1">
                        Line {error.line}, Column {error.column}
                      </p>
                    )}
                  </div>
                  {error.line && error.column && onErrorClick && (
                    <button
                      onClick={() => onErrorClick(error.line!, error.column!)}
                      className="text-xs text-primary hover:text-primary-hover"
                    >
                      Go to
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ValidationPanel
