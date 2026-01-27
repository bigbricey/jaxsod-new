'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section className="section-padding">
      <div className="container-custom text-center">
        <h1 className="heading-xl mb-4 text-primary-600">Oops</h1>
        <h2 className="heading-md mb-6">Something Went Wrong</h2>
        <p className="text-lg text-secondary-600 mb-8 max-w-2xl mx-auto">
          We&apos;re sorry, but something unexpected happened. Please try again
          or head back to the home page.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={reset} className="btn-primary">
            Try Again
          </button>
          <Link href="/" className="btn-secondary">
            Go Home
          </Link>
        </div>
      </div>
    </section>
  )
}
