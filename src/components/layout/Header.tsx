'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Sun, Moon, Monitor } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system')

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Templates', href: '/editor/templates' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Blog', href: '/blog' },
  ]

  const toggleTheme = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme)
    // 这里可以添加主题切换逻辑
  }

  return (
    <header className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-foreground">
                XML Prompt Editor
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground-muted hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Theme Toggle */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={() => toggleTheme('light')}
              className={`p-2 rounded-md ${
                theme === 'light'
                  ? 'bg-secondary text-foreground'
                  : 'text-foreground-muted hover:text-foreground'
              }`}
            >
              <Sun className="h-5 w-5" />
            </button>
            <button
              onClick={() => toggleTheme('dark')}
              className={`p-2 rounded-md ${
                theme === 'dark'
                  ? 'bg-secondary text-foreground'
                  : 'text-foreground-muted hover:text-foreground'
              }`}
            >
              <Moon className="h-5 w-5" />
            </button>
            <button
              onClick={() => toggleTheme('system')}
              className={`p-2 rounded-md ${
                theme === 'system'
                  ? 'bg-secondary text-foreground'
                  : 'text-foreground-muted hover:text-foreground'
              }`}
            >
              <Monitor className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground-muted hover:text-foreground p-2 rounded-md"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-foreground-muted hover:text-foreground block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
