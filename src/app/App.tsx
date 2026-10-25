import { AnimatePresence, motion } from 'motion/react'
import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router'

import { EnterGate } from './components/EnterGate'
import { Footer } from './components/Footer'
import { Profile } from './pages/Profile'
import { Work } from './pages/Work'

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash)
      if (target) {
        window.setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 50)
        return
      }
    }
    window.scrollTo({ top: 0 })
  }, [pathname, hash])
  return null
}

function Pages() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      >
        <Routes location={location}>
          <Route index element={<Profile />} />
          <Route path="work/:slug" element={<Work />} />
          <Route path="about" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  )
}

export function App() {
  // `entered` keeps the gate in the tree until its fade-out completes;
  // EnterGate owns the visibility itself.
  function enter() {
    // Profiles can hook this to start audio after the visitor's first click.
    window.dispatchEvent(new Event('app:entered'))
  }

  return (
    <BrowserRouter>
      <ScrollManager />
      <Pages />
      <Footer />
      <EnterGate onEnter={enter} />
    </BrowserRouter>
  )
}
