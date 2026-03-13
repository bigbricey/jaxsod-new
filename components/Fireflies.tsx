'use client'

import { useEffect, useRef } from 'react'

interface Firefly {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  glowSize: number
  phase: number
  pulseSpeed: number
  brightness: number
  targetBrightness: number
  blinkTimer: number
  blinkDuration: number
  blinkCooldown: number
  isBlinking: boolean
  hue: number
  warmth: number
}

const Fireflies = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let fireflies: Firefly[] = []
    let mouseX = -1000
    let mouseY = -1000
    let animId: number

    function resize() {
      w = canvas!.width = window.innerWidth
      h = canvas!.height = window.innerHeight
    }

    function init() {
      fireflies = []
      const count = 35
      for (let i = 0; i < count; i++) {
        fireflies.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: -0.3 + Math.random() * 0.6,
          vy: -0.3 + Math.random() * 0.6,
          size: 1.5 + Math.random() * 2.5,
          glowSize: 8 + Math.random() * 15,
          phase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.008 + Math.random() * 0.015,
          brightness: 0,
          targetBrightness: 0,
          blinkTimer: Math.random() * 400,
          blinkDuration: 60 + Math.random() * 120,
          blinkCooldown: 100 + Math.random() * 300,
          isBlinking: false,
          hue: 80 + Math.random() * 60,
          warmth: Math.random(),
        })
      }
    }

    function handleMouseMove(e: MouseEvent) {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, w, h)

      fireflies.forEach((ff) => {
        // Organic wandering movement
        ff.vx += (Math.random() - 0.5) * 0.05
        ff.vy += (Math.random() - 0.5) * 0.05
        ff.vx *= 0.99
        ff.vy *= 0.99

        // Gentle attraction toward mouse (curious fireflies)
        const dx = mouseX - ff.x
        const dy = mouseY - ff.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200 && dist > 30) {
          ff.vx += (dx / dist) * 0.02
          ff.vy += (dy / dist) * 0.02
        } else if (dist < 30) {
          // Scatter if too close
          ff.vx -= (dx / dist) * 0.1
          ff.vy -= (dy / dist) * 0.1
        }

        ff.x += ff.vx
        ff.y += ff.vy

        // Wrap around screen edges
        if (ff.x < -20) ff.x = w + 20
        if (ff.x > w + 20) ff.x = -20
        if (ff.y < -20) ff.y = h + 20
        if (ff.y > h + 20) ff.y = -20

        // Blink cycle
        ff.blinkTimer++
        if (!ff.isBlinking && ff.blinkTimer > ff.blinkCooldown) {
          ff.isBlinking = true
          ff.blinkTimer = 0
        }
        if (ff.isBlinking) {
          const progress = ff.blinkTimer / ff.blinkDuration
          if (progress < 0.3) {
            ff.targetBrightness = progress / 0.3
          } else if (progress < 0.7) {
            ff.targetBrightness = 1
          } else if (progress < 1) {
            ff.targetBrightness = 1 - (progress - 0.7) / 0.3
          } else {
            ff.targetBrightness = 0
            ff.isBlinking = false
            ff.blinkTimer = 0
            ff.blinkCooldown = 100 + Math.random() * 300
            ff.blinkDuration = 60 + Math.random() * 120
          }
        } else {
          ff.targetBrightness = 0.03
        }

        ff.brightness += (ff.targetBrightness - ff.brightness) * 0.1

        if (ff.brightness < 0.02) return

        // Outer glow
        const gradient = ctx.createRadialGradient(ff.x, ff.y, 0, ff.x, ff.y, ff.glowSize)
        const r = ff.warmth > 0.5 ? 180 : 100
        const g = 230
        const b = ff.warmth > 0.5 ? 50 : 100
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${ff.brightness * 0.25})`)
        gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${ff.brightness * 0.08})`)
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(ff.x, ff.y, ff.glowSize, 0, Math.PI * 2)
        ctx.fill()

        // Inner bright core
        ctx.beginPath()
        ctx.arc(ff.x, ff.y, ff.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(220, 255, 180, ${ff.brightness * 0.9})`
        ctx.fill()

        // Tiny white hot center
        ctx.beginPath()
        ctx.arc(ff.x, ff.y, ff.size * 0.4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 240, ${ff.brightness * 0.7})`
        ctx.fill()
      })

      animId = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', resize)
    resize()
    init()
    animate()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-50 pointer-events-none"
    />
  )
}

export default Fireflies
