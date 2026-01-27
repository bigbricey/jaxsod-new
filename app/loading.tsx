export default function Loading() {
  return (
    <section className="section-padding">
      <div className="container-custom flex flex-col items-center justify-center">
        <div
          className="h-12 w-12 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600"
          role="status"
          aria-label="Loading"
        />
        <p className="mt-4 text-secondary-600 text-lg">Loading...</p>
      </div>
    </section>
  )
}
