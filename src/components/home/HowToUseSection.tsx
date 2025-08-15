import { BookOpen, Code, Download, Share, CheckCircle } from 'lucide-react'

export default function HowToUseSection() {
  const steps = [
    {
      icon: BookOpen,
      title: 'Choose a Template',
      description: 'Start with one of our pre-built templates or create your own from scratch. We offer templates for various use cases including basic prompts, image generation, text processing, and more.',
      details: [
        'Browse templates by category (Basic, Image, Text, Writer, Video)',
        'Preview template structure and variables',
        'Select the template that best fits your needs'
      ]
    },
    {
      icon: Code,
      title: 'Edit Your XML',
      description: 'Use our professional XML editor with syntax highlighting, auto-completion, and real-time validation. The editor provides a familiar coding experience with XML-specific features.',
      details: [
        'Syntax highlighting for XML elements and attributes',
        'Auto-completion for common XML tags',
        'Real-time validation and error detection',
        'Format and minify XML with one click'
      ]
    },
    {
      icon: CheckCircle,
      title: 'Validate & Test',
      description: 'Ensure your XML is properly formatted and follows the correct structure. Our validation system checks for syntax errors, missing elements, and structural issues.',
      details: [
        'Automatic XML syntax validation',
        'Structural validation for prompt templates',
        'Real-time error reporting with line numbers',
        'Warning system for best practices'
      ]
    },
    {
      icon: Download,
      title: 'Export & Share',
      description: 'Download your XML prompt in various formats or copy it to your clipboard. Share your templates with others or integrate them into your AI workflows.',
      details: [
        'Export as XML, JSON, or plain text',
        'Copy to clipboard for quick sharing',
        'Generate shareable links',
        'Save templates for future use'
      ]
    }
  ]

  const features = [
    {
      title: 'Professional XML Editor',
      description: 'Advanced code editor with XML-specific features including syntax highlighting, validation, and formatting.',
      icon: Code
    },
    {
      title: 'Template Library',
      description: 'Comprehensive collection of pre-built templates for various AI prompt scenarios.',
      icon: BookOpen
    },
    {
      title: 'Real-time Validation',
      description: 'Instant feedback on XML structure and syntax with detailed error reporting.',
      icon: CheckCircle
    },
    {
      title: 'Multiple Export Formats',
      description: 'Export your prompts in XML, JSON, or plain text formats for maximum compatibility.',
      icon: Download
    }
  ]

  return (
    <section id="how-to-use" className="py-16 bg-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            How to Use XML Prompt Editor
          </h2>
          <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
            Learn how to create, edit, and manage XML prompts with our intuitive editor. 
            Follow these simple steps to get started with professional XML prompt creation.
          </p>
        </div>

        {/* Steps */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-foreground text-center mb-12">
            Getting Started
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-background rounded-lg p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-foreground">
                      {index + 1}. {step.title}
                    </h4>
                  </div>
                </div>
                <p className="text-foreground-muted mb-4">
                  {step.description}
                </p>
                <ul className="space-y-2">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-sm text-foreground-muted">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-foreground text-center mb-12">
            Key Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h4>
                <p className="text-foreground-muted text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Start Guide */}
        <div className="bg-background rounded-lg p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-foreground mb-6">
            Quick Start Guide
          </h3>
          <div className="space-y-6">
            <div className="border-l-4 border-primary pl-6">
              <h4 className="text-lg font-semibold text-foreground mb-2">
                1. Access the Editor
              </h4>
              <p className="text-foreground-muted">
                The editor is now directly available on this page. No need to navigate elsewhere!
              </p>
            </div>
            
            <div className="border-l-4 border-green-500 pl-6">
              <h4 className="text-lg font-semibold text-foreground mb-2">
                2. Select a Template
              </h4>
              <p className="text-foreground-muted">
                Click &quot;Show Templates&quot; to browse available templates. Choose one that matches your use case.
              </p>
            </div>
            
            <div className="border-l-4 border-yellow-500 pl-6">
              <h4 className="text-lg font-semibold text-foreground mb-2">
                3. Customize Content
              </h4>
              <p className="text-foreground-muted">
                Edit the XML content in the editor. Use the validation panel to check for errors.
              </p>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-6">
              <h4 className="text-lg font-semibold text-foreground mb-2">
                4. Export & Use
              </h4>
              <p className="text-foreground-muted">
                Download your XML prompt or copy it to clipboard for use in your AI applications.
              </p>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-16 bg-primary/10 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-primary mb-4">
            Pro Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-primary mb-2">Use Variables</h4>
              <p className="text-primary/80 text-sm">
                Leverage template variables like {'{query}'} to make your prompts dynamic and reusable.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-2">Validate Regularly</h4>
              <p className="text-primary/80 text-sm">
                Check the validation panel frequently to ensure your XML is properly structured.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-2">Format Your Code</h4>
              <p className="text-primary/80 text-sm">
                Use the format button to maintain clean, readable XML structure.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-2">Save Templates</h4>
              <p className="text-primary/80 text-sm">
                Save frequently used templates for quick access in future projects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
