import { ReactNode } from "react"

interface DefaultContainerProps {
  children: ReactNode
}

export function DefaultContainer({
  children
}: DefaultContainerProps) {
  return(
    <>
      {children}
    </>
  )
}