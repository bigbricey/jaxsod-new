'use client'

import { useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { FiPhone, FiMail, FiCheckCircle, FiInfo, FiArrowRight } from 'react-icons/fi'
import { PHONE, PHONE_HREF } from '@/lib/constants'

// ─── Types ───────────────────────────────────────────────────────────────────

type Shape = 'rectangle' | 'triangle' | 'circle' | 'lshape' | 'irregular'

interface SodType {
  name: string
  variety: string
  description: string
  best: string
}

// ─── Data ────────────────────────────────────────────────────────────────────

const SOD_TYPES: SodType[] = [
  {
    name: 'St. Augustine',
    variety: 'Floratam',
    description: 'The most popular sod in Jacksonville. Thick, lush, and shade-tolerant.',
    best: 'Best for: Most Jacksonville lawns, partial shade to full sun',
  },
  {
    name: 'Zoysia',
    variety: 'Empire / Emerald',
    description: 'Dense, carpet-like turf with excellent drought tolerance.',
    best: 'Best for: High-traffic areas, full sun, low maintenance',
  },
  {
    name: 'Bermuda',
    variety: 'Celebration / TifTuf',
    description: 'Fast-growing, durable grass that thrives in Jacksonville heat.',
    best: 'Best for: Sports areas, full sun, active families',
  },
  {
    name: 'Bahia',
    variety: 'Argentine',
    description: 'Hardy, low-maintenance grass with deep roots and excellent drought resistance.',
    best: 'Best for: Large areas, budget-friendly, sandy soils',
  },
]

const PALLET_SIZES = [
  { value: 0, label: "I don't know yet" },
  { value: 400, label: '400 sq ft' },
  { value: 450, label: '450 sq ft' },
  { value: 500, label: '500 sq ft' },
]

// ─── Shape Icons (SVG) ──────────────────────────────────────────────────────

function RectangleIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className="w-10 h-10" fill="none">
      <rect
        x="8" y="14" width="48" height="36" rx="2"
        className={`transition-colors duration-200 ${active ? 'stroke-white fill-white/20' : 'stroke-primary-600 fill-primary-50'}`}
        strokeWidth="2.5"
      />
    </svg>
  )
}

function TriangleIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className="w-10 h-10" fill="none">
      <polygon
        points="32,10 56,54 8,54"
        className={`transition-colors duration-200 ${active ? 'stroke-white fill-white/20' : 'stroke-primary-600 fill-primary-50'}`}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CircleIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className="w-10 h-10" fill="none">
      <circle
        cx="32" cy="32" r="24"
        className={`transition-colors duration-200 ${active ? 'stroke-white fill-white/20' : 'stroke-primary-600 fill-primary-50'}`}
        strokeWidth="2.5"
      />
    </svg>
  )
}

function LShapeIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className="w-10 h-10" fill="none">
      <path
        d="M8 8 H36 V32 H56 V56 H8 Z"
        className={`transition-colors duration-200 ${active ? 'stroke-white fill-white/20' : 'stroke-primary-600 fill-primary-50'}`}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IrregularIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className="w-10 h-10" fill="none">
      <path
        d="M16 12 C24 8, 44 10, 52 18 C58 28, 54 42, 48 50 C40 56, 24 58, 14 48 C8 38, 10 22, 16 12Z"
        className={`transition-colors duration-200 ${active ? 'stroke-white fill-white/20' : 'stroke-primary-600 fill-primary-50'}`}
        strokeWidth="2.5"
      />
    </svg>
  )
}

const SHAPE_OPTIONS: { id: Shape; label: string; icon: (p: { active: boolean }) => JSX.Element }[] = [
  { id: 'rectangle', label: 'Rectangle', icon: RectangleIcon },
  { id: 'triangle', label: 'Triangle', icon: TriangleIcon },
  { id: 'circle', label: 'Circle', icon: CircleIcon },
  { id: 'lshape', label: 'L-Shape', icon: LShapeIcon },
  { id: 'irregular', label: 'Irregular', icon: IrregularIcon },
]

// ─── Shape Diagrams ──────────────────────────────────────────────────────────

function RectangleDiagram({ length, width }: { length: number; width: number }) {
  return (
    <svg viewBox="0 0 260 200" className="w-full max-w-xs mx-auto">
      <defs>
        <linearGradient id="rectGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#16a34a" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <rect x="50" y="30" width="160" height="120" rx="4" fill="url(#rectGrad)" stroke="#16a34a" strokeWidth="2" />
      {/* Length label */}
      <line x1="50" y1="168" x2="210" y2="168" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" markerStart="url(#arrowR)" />
      <text x="130" y="188" textAnchor="middle" className="fill-secondary-700 text-sm font-semibold">{length || '?'} ft</text>
      {/* Width label */}
      <line x1="228" y1="30" x2="228" y2="150" stroke="#334155" strokeWidth="1.5" />
      <text x="248" y="95" textAnchor="middle" className="fill-secondary-700 text-sm font-semibold" transform="rotate(90 248 95)">{width || '?'} ft</text>
      {/* Arrows */}
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#334155" /></marker>
        <marker id="arrowR" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto"><path d="M8,0 L0,3 L8,6" fill="#334155" /></marker>
      </defs>
    </svg>
  )
}

function TriangleDiagram({ base, height }: { base: number; height: number }) {
  return (
    <svg viewBox="0 0 260 200" className="w-full max-w-xs mx-auto">
      <defs>
        <linearGradient id="triGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#16a34a" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <polygon points="130,25 220,165 40,165" fill="url(#triGrad)" stroke="#16a34a" strokeWidth="2" strokeLinejoin="round" />
      {/* Height line */}
      <line x1="130" y1="25" x2="130" y2="165" stroke="#334155" strokeWidth="1.5" strokeDasharray="5,3" />
      <text x="108" y="100" textAnchor="end" className="fill-secondary-700 text-sm font-semibold">{height || '?'} ft</text>
      {/* Base label */}
      <line x1="40" y1="180" x2="220" y2="180" stroke="#334155" strokeWidth="1.5" />
      <text x="130" y="197" textAnchor="middle" className="fill-secondary-700 text-sm font-semibold">{base || '?'} ft</text>
    </svg>
  )
}

function CircleDiagram({ radius }: { radius: number }) {
  return (
    <svg viewBox="0 0 260 220" className="w-full max-w-xs mx-auto">
      <defs>
        <linearGradient id="circGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#16a34a" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <circle cx="130" cy="105" r="80" fill="url(#circGrad)" stroke="#16a34a" strokeWidth="2" />
      {/* Radius line */}
      <line x1="130" y1="105" x2="210" y2="105" stroke="#334155" strokeWidth="1.5" />
      <circle cx="130" cy="105" r="3" fill="#334155" />
      <text x="170" y="98" textAnchor="middle" className="fill-secondary-700 text-sm font-semibold">{radius || '?'} ft</text>
    </svg>
  )
}

function LShapeDiagram({ l1, w1, l2, w2 }: { l1: number; w1: number; l2: number; w2: number }) {
  return (
    <svg viewBox="0 0 280 230" className="w-full max-w-xs mx-auto">
      <defs>
        <linearGradient id="lGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#16a34a" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <path d="M30 20 H130 V100 H220 V190 H30 Z" fill="url(#lGrad)" stroke="#16a34a" strokeWidth="2" strokeLinejoin="round" />
      {/* Section A labels */}
      <text x="80" y="14" textAnchor="middle" className="fill-primary-700 text-xs font-bold">A</text>
      <text x="80" y="210" textAnchor="middle" className="fill-secondary-600 text-xs font-semibold">{l1 || '?'} ft</text>
      <text x="16" y="110" textAnchor="middle" className="fill-secondary-600 text-xs font-semibold" transform="rotate(-90 16 110)">{w1 || '?'} ft</text>
      {/* Section B labels */}
      <text x="175" y="92" textAnchor="middle" className="fill-primary-700 text-xs font-bold">B</text>
      <text x="175" y="210" textAnchor="middle" className="fill-secondary-600 text-xs font-semibold">{l2 || '?'} ft</text>
      <text x="236" y="148" textAnchor="middle" className="fill-secondary-600 text-xs font-semibold" transform="rotate(-90 236 148)">{w2 || '?'} ft</text>
    </svg>
  )
}

// ─── Number Input Component ──────────────────────────────────────────────────

function NumberInput({
  label,
  value,
  onChange,
  placeholder,
  unit = 'ft',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  unit?: string
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-secondary-700 mb-1.5">{label}</label>
      <div className="relative">
        <input
          type="number"
          inputMode="decimal"
          min="0"
          step="0.1"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || '0'}
          className="w-full px-4 py-3 border-2 border-secondary-200 rounded-xl text-lg font-medium text-secondary-900 placeholder:text-secondary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all duration-200"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-400 font-medium text-sm">{unit}</span>
      </div>
    </div>
  )
}

// ─── Main Calculator Component ───────────────────────────────────────────────

export default function SodCalculator() {
  const [shape, setShape] = useState<Shape>('rectangle')
  const [dims, setDims] = useState({
    length: '', width: '',
    base: '', height: '',
    radius: '',
    l1: '', w1: '', l2: '', w2: '',
    totalSqft: '',
  })
  const [selectedSod, setSelectedSod] = useState(0)
  const [wasteToggle, setWasteToggle] = useState(true)
  const [palletSize, setPalletSize] = useState(0)
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)

  const setDim = useCallback((key: string, value: string) => {
    setDims((prev) => ({ ...prev, [key]: value }))
  }, [])

  // When switching shapes, carry over dimension values so users don't lose their numbers
  const handleShapeChange = useCallback((newShape: Shape) => {
    setDims((prev) => {
      // Get the "primary" and "secondary" values from current inputs
      const primary = prev.length || prev.base || prev.l1 || prev.radius || ''
      const secondary = prev.width || prev.height || prev.w1 || ''

      return {
        ...prev,
        // Map values to all shape fields so they persist across switches
        length: prev.length || primary,
        width: prev.width || secondary,
        base: prev.base || primary,
        height: prev.height || secondary,
        radius: prev.radius || primary,
        l1: prev.l1 || primary,
        w1: prev.w1 || secondary,
        // Keep l2/w2 and totalSqft as-is
      }
    })
    setShape(newShape)
  }, [])

  // Calculate square footage
  const rawSqFt = useMemo(() => {
    const n = (s: string) => parseFloat(s) || 0
    switch (shape) {
      case 'rectangle':
        return n(dims.length) * n(dims.width)
      case 'triangle':
        return (n(dims.base) * n(dims.height)) / 2
      case 'circle':
        return Math.PI * Math.pow(n(dims.radius), 2)
      case 'lshape':
        return n(dims.l1) * n(dims.w1) + n(dims.l2) * n(dims.w2)
      case 'irregular':
        return n(dims.totalSqft)
      default:
        return 0
    }
  }, [shape, dims])

  const wasteFactor = wasteToggle ? 1.1 : 1.0
  const totalSqFt = Math.ceil(rawSqFt * wasteFactor)
  const pallets = (palletSize > 0 && totalSqFt > 0) ? Math.ceil(totalSqFt / palletSize) : 0
  const sod = SOD_TYPES[selectedSod]

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEmailSent(true)
    setTimeout(() => setEmailSent(false), 4000)
  }

  return (
    <div className="space-y-8 lg:space-y-12">
      {/* ── Calculator Card ────────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-xl border border-secondary-100 overflow-hidden">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-primary-700 to-primary-600 px-6 py-5 sm:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Calculate Your Sod Needs</h2>
          <p className="text-primary-100 text-sm mt-1">Select your lawn shape and enter dimensions below</p>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* ─ Step 1: Shape Selector ──────────────────────────── */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-7 h-7 rounded-full bg-primary-600 text-white text-sm font-bold flex items-center justify-center">1</span>
              <h3 className="text-lg font-bold text-secondary-900">Select Your Lawn Shape</h3>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {SHAPE_OPTIONS.map((s) => {
                const active = shape === s.id
                const Icon = s.icon
                return (
                  <button
                    key={s.id}
                    onClick={() => handleShapeChange(s.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer
                      ${active
                        ? 'border-primary-600 bg-primary-600 text-white shadow-lg shadow-primary-600/25 scale-[1.02]'
                        : 'border-secondary-200 bg-white text-secondary-700 hover:border-primary-300 hover:bg-primary-50'
                      }`}
                    aria-pressed={active}
                  >
                    <Icon active={active} />
                    <span className="text-xs sm:text-sm font-semibold">{s.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* ─ Step 2: Dimensions ──────────────────────────────── */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-7 h-7 rounded-full bg-primary-600 text-white text-sm font-bold flex items-center justify-center">2</span>
              <h3 className="text-lg font-bold text-secondary-900">Enter Dimensions</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Input Fields */}
              <div className="space-y-4">
                {shape === 'rectangle' && (
                  <>
                    <NumberInput label="Length" value={dims.length} onChange={(v) => setDim('length', v)} placeholder="e.g. 50" />
                    <NumberInput label="Width" value={dims.width} onChange={(v) => setDim('width', v)} placeholder="e.g. 30" />
                  </>
                )}
                {shape === 'triangle' && (
                  <>
                    <NumberInput label="Base" value={dims.base} onChange={(v) => setDim('base', v)} placeholder="e.g. 40" />
                    <NumberInput label="Height" value={dims.height} onChange={(v) => setDim('height', v)} placeholder="e.g. 25" />
                  </>
                )}
                {shape === 'circle' && (
                  <NumberInput label="Radius" value={dims.radius} onChange={(v) => setDim('radius', v)} placeholder="e.g. 20" />
                )}
                {shape === 'lshape' && (
                  <>
                    <p className="text-sm text-secondary-500 -mt-1">Break your L-shape into two rectangles (A and B).</p>
                    <div className="bg-secondary-50 rounded-xl p-4 space-y-3">
                      <p className="text-xs font-bold text-primary-700 uppercase tracking-wide">Rectangle A</p>
                      <NumberInput label="Length A" value={dims.l1} onChange={(v) => setDim('l1', v)} placeholder="e.g. 30" />
                      <NumberInput label="Width A" value={dims.w1} onChange={(v) => setDim('w1', v)} placeholder="e.g. 50" />
                    </div>
                    <div className="bg-secondary-50 rounded-xl p-4 space-y-3">
                      <p className="text-xs font-bold text-primary-700 uppercase tracking-wide">Rectangle B</p>
                      <NumberInput label="Length B" value={dims.l2} onChange={(v) => setDim('l2', v)} placeholder="e.g. 20" />
                      <NumberInput label="Width B" value={dims.w2} onChange={(v) => setDim('w2', v)} placeholder="e.g. 25" />
                    </div>
                  </>
                )}
                {shape === 'irregular' && (
                  <>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                      <FiInfo className="inline mr-1.5 -mt-0.5" />
                      For irregular shapes, measure the area by dividing it into smaller rectangles, calculating each, and adding them together. Or enter the total if you already know it.
                    </div>
                    <NumberInput label="Total Square Footage" value={dims.totalSqft} onChange={(v) => setDim('totalSqft', v)} placeholder="e.g. 1200" unit="sq ft" />
                  </>
                )}

                {/* Waste Factor Toggle */}
                <div className="flex items-center justify-between bg-secondary-50 rounded-xl p-4 mt-2">
                  <div>
                    <span className="text-sm font-semibold text-secondary-800">Add 10% Waste Factor</span>
                    <p className="text-xs text-secondary-500 mt-0.5">Recommended for edges, curves, and cuts</p>
                  </div>
                  <button
                    onClick={() => setWasteToggle(!wasteToggle)}
                    className={`relative w-12 h-7 rounded-full transition-colors duration-200 ${wasteToggle ? 'bg-primary-600' : 'bg-secondary-300'}`}
                    role="switch"
                    aria-checked={wasteToggle}
                    aria-label="Toggle 10% waste factor"
                  >
                    <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform duration-200 ${wasteToggle ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>

              {/* Visual Diagram */}
              <div className="hidden md:block">
                <div className="bg-secondary-50 rounded-xl p-6 border border-secondary-100">
                  <p className="text-xs font-bold text-secondary-500 uppercase tracking-wider mb-4 text-center">Preview</p>
                  {shape === 'rectangle' && <RectangleDiagram length={parseFloat(dims.length) || 0} width={parseFloat(dims.width) || 0} />}
                  {shape === 'triangle' && <TriangleDiagram base={parseFloat(dims.base) || 0} height={parseFloat(dims.height) || 0} />}
                  {shape === 'circle' && <CircleDiagram radius={parseFloat(dims.radius) || 0} />}
                  {shape === 'lshape' && <LShapeDiagram l1={parseFloat(dims.l1) || 0} w1={parseFloat(dims.w1) || 0} l2={parseFloat(dims.l2) || 0} w2={parseFloat(dims.w2) || 0} />}
                  {shape === 'irregular' && (
                    <div className="flex items-center justify-center h-40">
                      <IrregularIcon active={false} />
                      <p className="ml-3 text-secondary-500 text-sm">Enter total square footage</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ─ Step 3: Sod Type ────────────────────────────────── */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-7 h-7 rounded-full bg-primary-600 text-white text-sm font-bold flex items-center justify-center">3</span>
              <h3 className="text-lg font-bold text-secondary-900">Choose Your Sod Type</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {SOD_TYPES.map((s, i) => {
                const active = selectedSod === i
                return (
                  <button
                    key={s.name}
                    onClick={() => setSelectedSod(i)}
                    className={`text-left p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer
                      ${active
                        ? 'border-primary-600 bg-primary-50 shadow-md'
                        : 'border-secondary-200 bg-white hover:border-primary-300'
                      }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className={`font-bold text-base ${active ? 'text-primary-700' : 'text-secondary-900'}`}>{s.name}</p>
                        <p className="text-xs text-secondary-500 mt-0.5">{s.variety}</p>
                      </div>
                      {active && (
                        <FiCheckCircle className="text-primary-600 text-xl flex-shrink-0 mt-0.5" />
                      )}
                    </div>
                    <p className="text-xs text-secondary-600 mt-2 leading-relaxed">{s.description}</p>
                    <p className="text-xs font-semibold text-primary-700 mt-1.5">{s.best}</p>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* ─ Results Section ──────────────────────────────────── */}
        <div className={`transition-all duration-500 ${totalSqFt > 0 ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
          <div className="bg-gradient-to-br from-primary-700 via-primary-700 to-primary-800 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-white/20 text-white text-sm font-bold flex items-center justify-center">✓</span>
              Your Estimate
            </h3>
            <div className="mb-6">
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center mb-4">
                <p className="text-primary-200 text-xs font-semibold uppercase tracking-wider">Total Area Needed</p>
                <p className="text-4xl font-bold text-white mt-1">{totalSqFt.toLocaleString()}</p>
                <p className="text-primary-200 text-sm">square feet{wasteToggle && rawSqFt > 0 ? ' (incl. 10% waste)' : ''}</p>
              </div>

              {/* Optional pallet calculator */}
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <p className="text-white text-sm font-semibold mb-2">Know your pallet size? (Optional)</p>
                <p className="text-primary-200 text-xs mb-3">
                  Pallet sizes vary by sod type and supplier — commonly 400, 450, or 500 sq ft. Check with your supplier for exact sizes.
                </p>
                <div className="flex flex-wrap gap-2">
                  {PALLET_SIZES.map((ps) => (
                    <button
                      key={ps.value}
                      onClick={() => setPalletSize(ps.value)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        palletSize === ps.value
                          ? 'bg-white text-primary-700'
                          : 'bg-white/15 text-white hover:bg-white/25'
                      }`}
                    >
                      {ps.label}
                    </button>
                  ))}
                </div>
                {pallets > 0 && (
                  <div className="mt-3 text-center">
                    <p className="text-white text-lg font-bold">
                      ≈ {pallets} pallet{pallets !== 1 ? 's' : ''} <span className="text-primary-200 text-sm font-normal">at {palletSize} sq ft each</span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            <p className="text-primary-200 text-xs mb-6">
              Ready for an exact quote? Contact us — we&apos;ll assess your yard and give you a free, no-obligation estimate.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="flex-1 bg-white text-primary-700 px-6 py-4 rounded-xl font-bold text-center hover:bg-gray-50 transition-colors duration-200 text-lg shadow-lg shadow-black/10 flex items-center justify-center gap-2"
              >
                Get a Free Quote <FiArrowRight />
              </Link>
              <a
                href={PHONE_HREF}
                className="flex-1 bg-white/15 text-white border-2 border-white/30 px-6 py-4 rounded-xl font-bold text-center hover:bg-white/25 transition-colors duration-200 text-lg flex items-center justify-center gap-2"
              >
                <FiPhone /> {PHONE}
              </a>
            </div>
          </div>
        </div>

        {/* ─ Email Capture ────────────────────────────────────── */}
        <div className="bg-secondary-50 border-t border-secondary-100 px-6 py-6 sm:px-8">
          <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
            <div className="flex-1 w-full">
              <label className="text-sm font-semibold text-secondary-700 mb-1.5 flex items-center gap-1.5">
                <FiMail className="text-primary-600" /> Get Your Estimate Emailed to You
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-3 border-2 border-secondary-200 rounded-xl text-secondary-900 placeholder:text-secondary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all duration-200"
              />
            </div>
            <button
              type="submit"
              className="btn-primary whitespace-nowrap px-8 py-3 rounded-xl"
            >
              {emailSent ? '✓ Sent!' : 'Send Estimate'}
            </button>
          </form>
        </div>
      </div>

      {/* ── Sod Types Info Card ───────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-lg border border-secondary-100 overflow-hidden">
        <div className="px-6 py-5 sm:px-8 border-b border-secondary-100">
          <h2 className="heading-sm text-secondary-900">Jacksonville Sod Types</h2>
          <p className="text-secondary-600 text-sm mt-1">Popular grass varieties for the Jacksonville, FL area</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary-50">
              <tr>
                <th className="text-left px-6 py-3 font-semibold text-secondary-700">Sod Type</th>
                <th className="text-left px-6 py-3 font-semibold text-secondary-700">Description</th>
                <th className="text-left px-6 py-3 font-semibold text-secondary-700 hidden sm:table-cell">Best For</th>
              </tr>
            </thead>
            <tbody>
              {SOD_TYPES.map((s) => (
                <tr key={s.name} className="border-b border-secondary-100 hover:bg-primary-50/30 transition-colors">
                  <td className="px-6 py-4 font-semibold text-secondary-900">{s.name}<br /><span className="font-normal text-xs text-secondary-500">{s.variety}</span></td>
                  <td className="px-6 py-4 text-secondary-700">{s.description}</td>
                  <td className="px-6 py-4 text-secondary-600 hidden sm:table-cell">{s.best.replace('Best for: ', '')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 sm:px-8 bg-primary-50 border-t border-primary-100">
          <p className="text-sm text-primary-800 font-medium">
            Not sure which sod type is right for your yard? <Link href="/contact" className="underline font-bold hover:text-primary-900">Contact us</Link> or call <a href={PHONE_HREF} className="underline font-bold hover:text-primary-900">{PHONE}</a> for a free recommendation.
          </p>
        </div>
      </div>
    </div>
  )
}
