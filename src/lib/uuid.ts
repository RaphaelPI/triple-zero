export const uuid = () => {
  return `${Math.random().toString(36).split(".")[1]}`
}
