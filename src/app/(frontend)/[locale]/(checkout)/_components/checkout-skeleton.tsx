export const CheckoutSkeleton = () => {
  return (
    <section className="w-section px-section flex gap-8 max-lg:flex-col">
      <div className="panel h-96 w-full animate-pulse lg:w-3/4" />
      <div className="panel bg-blue-light h-96 w-full animate-pulse self-start lg:w-1/4" />
      {/* <CheckoutSummary>
        <div className="h-12 w-full animate-pulse" />
      </CheckoutSummary> */}
    </section>
  )
}
