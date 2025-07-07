import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react"

export const useClickAway = <
  T extends HTMLElement = HTMLElement,
  Y extends HTMLElement = HTMLElement,
>(): [boolean, Dispatch<SetStateAction<boolean>>, RefObject<T | null>, RefObject<Y | null>] => {
  const [open, setOpen] = useState(false)
  const ref = useRef<T>(null)
  const triggerRef = useRef<Y>(null)

  useEffect(() => {
    if (!open) {
      return
    }

    const clickAwayListener = (event: MouseEvent | TouchEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener("touchstart", clickAwayListener)
    document.addEventListener("mousedown", clickAwayListener)

    return () => {
      document.removeEventListener("touchstart", clickAwayListener)
      document.removeEventListener("mousedown", clickAwayListener)
    }
  }, [open, ref])

  return [open, setOpen, ref, triggerRef]
}
