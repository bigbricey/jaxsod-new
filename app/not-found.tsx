import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="section-padding mt-[100px]">
      <div className="container-custom text-center">
        <h1 className="heading-xl mb-4 text-[#22c55e]">404</h1>
        <h2 className="heading-md mb-6">Page Not Found</h2>
        <p className="text-lg text-[rgba(200,230,200,0.5)] mb-8 max-w-2xl mx-auto">
          Sorry, the page you&apos;re looking for doesn&apos;t exist. It may have been moved or
          removed. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary">
            Go Home
          </Link>
          <Link href="/contact" className="btn-secondary">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  )
}
