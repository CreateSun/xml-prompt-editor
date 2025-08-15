import Layout from '@/components/layout/Layout'
import Hero from '@/components/home/Hero'
import FullXMLEditor from '@/components/home/FullXMLEditor'
import HowToUseSection from '@/components/home/HowToUseSection'

export default function Home() {
  return (
    <Layout>
      <Hero />
      <FullXMLEditor />
      <HowToUseSection />
    </Layout>
  )
}
