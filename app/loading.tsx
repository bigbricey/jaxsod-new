export default function Loading() {
  return (
    <section className="section-padding mt-[100px]">
      <div className="container-custom flex flex-col items-center justify-center">
        <div
          className="h-12 w-12 animate-spin rounded-full border-4 border-[rgba(34,197,94,0.15)] border-t-[#22c55e]"
          role="status"
          aria-label="Loading"
        />
        <p className="mt-4 text-[rgba(200,230,200,0.5)] text-lg">Loading...</p>
      </div>
    </section>
  )
}
