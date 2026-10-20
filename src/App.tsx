import { Route, Routes } from 'react-router'
import { AccessibilityProvider } from '@/context/AccessibilityContext'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import MeasureDetail from '@/pages/MeasureDetail'
import Places from '@/pages/Places'
import Faq from '@/pages/Faq'
import Links from '@/pages/Links'
import Contest from '@/pages/Contest'
import HeroesTeam from '@/pages/HeroesTeam'
import Multicenter from '@/pages/Multicenter'

export default function App() {
  return (
    <AccessibilityProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/measure/:id" element={<MeasureDetail />} />
          <Route path="/places" element={<Places />} />
          <Route path="/contest" element={<Contest />} />
          <Route path="/heroes-team" element={<HeroesTeam />} />
          <Route path="/multicenter" element={<Multicenter />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/links" element={<Links />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </AccessibilityProvider>
  )
}
