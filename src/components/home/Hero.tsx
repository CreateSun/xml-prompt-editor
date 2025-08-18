'use client'

import Link from 'next/link'
import { ArrowRight, Code, Zap, Shield } from 'lucide-react'

const Hero = () => {
  const features = [
    {
      name: 'Professional Editor',
      description: 'Advanced XML editor with syntax highlighting and validation',
      icon: Code,
    },
    {
      name: 'Lightning Fast',
      description: 'Optimized for performance with instant feedback',
      icon: Zap,
    },
    {
      name: 'Secure & Reliable',
      description: 'Your data stays local, no cloud dependencies',
      icon: Shield,
    },
  ]

  return (
    <div className="from-background bg-gradient-to-r from-50% to-50% to-background-secondary ">
      <div className="grid lg:grid-cols-2 min-h-[calc(100vh-100px)] max-w-7xl mx-auto">
        {/* 左侧内容区域 */}
        <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-xl">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-foreground sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Professional</span>{' '}
                <span className="block text-primary xl:inline">XML Prompt Editor</span>
              </h1>
              <p className="mt-3 text-base text-foreground sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Create, edit, and manage XML prompts with our intuitive editor. Perfect for AI developers, content creators, and anyone working with structured prompts.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <button
                    onClick={() => {
                      document.getElementById('xml-editor')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-hover md:py-4 md:text-lg md:px-10 transition-colors"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button
                    onClick={() => {
                      document.getElementById('how-to-use')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="w-full flex items-center justify-center px-8 py-3 border border-border text-base font-medium rounded-md text-foreground bg-secondary hover:bg-secondary-hover md:py-4 md:text-lg md:px-10 transition-colors"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧装饰区域 */}
        <div className=" flex items-center justify-center px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center text-foreground max-w-xl">
            <Code className="mx-auto h-24 w-24 mb-6 opacity-90" />
            <h3 className="text-3xl font-bold mb-3">XML Editor</h3>
            <p className="text-xl opacity-80 mb-6">Professional & Intuitive</p>
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <feature.icon className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">{feature.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
