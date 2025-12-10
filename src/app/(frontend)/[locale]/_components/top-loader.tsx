import NextTopLoader from "nextjs-toploader"

export const TopLoader = async () => {
  return (
    <NextTopLoader
      height={2}
      color={"var(--color-blue-grey)"}
      shadow="rgb(27 27 27 / .5)"
      showSpinner={false}
      speed={2000}
    />
  )
}
