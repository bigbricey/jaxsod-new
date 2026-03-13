'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import OpenChatButton from '@/components/OpenChatButton'

interface Blade {
  x: number
  y: number
  height: number
  width: number
  hue: number
  sat: number
  light: number
  speed: number
  phase: number
  layer: number
}

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  phase: number
}

interface AnimatedGrassHeroProps {
  title?: string
  highlightText?: string
  description?: string
  badgeText?: string
}

const AnimatedGrassHero = ({
  title = 'Beautiful Lawns',
  highlightText = 'Delivered.',
  description = 'Transform your property with expert sod installation. Nearly 40 years of excellence across Northeast Florida. From first assessment to final roll.',
  badgeText = 'Serving Jacksonville Since 1986',
}: AnimatedGrassHeroProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let blades: Blade[] = []
    let particles: Particle[] = []
    const mouse = { x: -1000, y: -1000 }
    let time = 0
    let animId: number

    function resize() {
      w = canvas!.width = canvas!.offsetWidth
      h = canvas!.height = canvas!.offsetHeight
      initBlades()
      initParticles()
    }

    function initBlades() {
      blades = []
      const count = Math.floor(w / 3)
      for (let i = 0; i < count; i++) {
        blades.push({
          x: Math.random() * w,
          y: h,
          height: 60 + Math.random() * 140,
          width: 1 + Math.random() * 2,
          hue: 100 + Math.random() * 40,
          sat: 50 + Math.random() * 30,
          light: 15 + Math.random() * 25,
          speed: 0.5 + Math.random() * 1.5,
          phase: Math.random() * Math.PI * 2,
          layer: Math.random(),
        })
      }
      blades.sort((a, b) => a.layer - b.layer)
    }

    function initParticles() {
      particles = []
      const count = 40
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h * 0.7,
          size: 1 + Math.random() * 3,
          speedX: -0.2 + Math.random() * 0.4,
          speedY: -0.1 - Math.random() * 0.3,
          opacity: 0.1 + Math.random() * 0.4,
          phase: Math.random() * Math.PI * 2,
        })
      }
    }

    function handleMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    function getMouseEffect(blade: Blade) {
      const dx = blade.x - mouse.x
      const dy = blade.y - blade.height * 0.5 - mouse.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 150) {
        const force = (1 - dist / 150) * 30
        return dx > 0 ? force : -force
      }
      return 0
    }

    function drawBlade(blade: Blade) {
      if (!ctx) return
      const wind = Math.sin(time * blade.speed * 0.01 + blade.phase) * 15
      const mouseEffect = getMouseEffect(blade)
      const sway = wind + mouseEffect

      ctx.beginPath()
      ctx.moveTo(blade.x - blade.width / 2, blade.y)

      const cp1x = blade.x + sway * 0.3
      const cp1y = blade.y - blade.height * 0.5
      const cp2x = blade.x + sway * 0.8
      const cp2y = blade.y - blade.height * 0.8
      const tipX = blade.x + sway
      const tipY = blade.y - blade.height

      ctx.quadraticCurveTo(cp1x, cp1y, cp2x, cp2y)
      ctx.lineTo(tipX, tipY)
      ctx.quadraticCurveTo(cp2x + blade.width, cp2y, cp1x + blade.width * 0.5, cp1y)
      ctx.lineTo(blade.x + blade.width / 2, blade.y)
      ctx.closePath()

      const alpha = 0.3 + blade.layer * 0.7
      ctx.fillStyle = `hsla(${blade.hue}, ${blade.sat}%, ${blade.light}%, ${alpha})`
      ctx.fill()
    }

    function drawParticles() {
      if (!ctx) return
      particles.forEach((p) => {
        p.x += p.speedX + Math.sin(time * 0.005 + p.phase) * 0.3
        p.y += p.speedY
        if (p.y < -10) {
          p.y = h * 0.8
          p.x = Math.random() * w
        }
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10

        const flicker = 0.5 + Math.sin(time * 0.02 + p.phase) * 0.5
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(34, 197, 94, ${p.opacity * flicker})`
        ctx!.fill()
      })
    }

    function animate() {
      if (!ctx) return
      time++
      ctx.clearRect(0, 0, w, h)

      // Dark gradient sky
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h)
      skyGrad.addColorStop(0, '#050805')
      skyGrad.addColorStop(0.5, '#0a100a')
      skyGrad.addColorStop(1, '#0d150d')
      ctx.fillStyle = skyGrad
      ctx.fillRect(0, 0, w, h)

      drawParticles()
      blades.forEach(drawBlade)

      // Ground fade
      const groundGrad = ctx.createLinearGradient(0, h - 30, 0, h)
      groundGrad.addColorStop(0, 'transparent')
      groundGrad.addColorStop(1, '#0a0f0a')
      ctx.fillStyle = groundGrad
      ctx.fillRect(0, h - 30, w, 30)

      animId = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', resize)
    resize()
    animate()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      {/* Radial overlay */}
      <div className="absolute inset-0 z-[1]" style={{
        background: 'radial-gradient(ellipse at center bottom, transparent 30%, #0a0f0a 75%)',
      }} />

      {/* Content */}
      <div className="relative z-[2] max-w-[900px] px-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 border border-[rgba(34,197,94,0.15)] rounded-full text-sm text-[#22c55e] font-medium mb-8 backdrop-blur-[10px] bg-[rgba(34,197,94,0.05)] animate-[fadeInUp_1s_ease_0.2s_both]">
          <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full animate-[pulse-dot_2s_ease_infinite]" />
          {badgeText}
        </div>

        {/* Heading */}
        <h1 className="text-[clamp(3rem,8vw,6rem)] font-black leading-[1.05] tracking-[-0.04em] mb-6 animate-[fadeInUp_1s_ease_0.4s_both]">
          {title}
          <br />
          <span className="text-[#22c55e]">{highlightText}</span>
        </h1>

        {/* Description */}
        <p className="text-[clamp(1rem,2vw,1.25rem)] text-[rgba(200,230,200,0.5)] max-w-[600px] mx-auto mb-10 leading-[1.7] animate-[fadeInUp_1s_ease_0.6s_both]">
          {description}
        </p>

        {/* Buttons */}
        <div className="flex gap-4 justify-center flex-wrap animate-[fadeInUp_1s_ease_0.8s_both]">
          <OpenChatButton className="btn-primary text-lg px-8 py-4">
            Get a Free Estimate
          </OpenChatButton>
          <Link href="/services" className="btn-secondary text-lg px-8 py-4">
            View Services
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2 animate-[fadeInUp_1s_ease_1.2s_both]">
        <div className="w-px h-10 bg-gradient-to-b from-[#22c55e] to-transparent animate-[scrollPulse_2s_ease_infinite]" />
      </div>
    </section>
  )
}

export default AnimatedGrassHero
