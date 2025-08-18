import Layout from '@/components/layout/Layout'

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      {children}
    </Layout>
  )
}
