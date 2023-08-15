import * as React from "react"

const BottomScrollObserver: React.FC<{ onScrolledToBottom: () => void }> = ({
  onScrolledToBottom,
}) => {
  const ref = React.useRef(null as any)
  const mount = React.useRef(false)

  React.useEffect(() => {
    if (!mount.current) {
      const observer = new IntersectionObserver((entries) => {
        const entry = entries[0]
        if (entry.isIntersecting) {
          onScrolledToBottom()
        }
      })

      observer.observe(ref.current)
    }

    return () => {
      mount.current = true
    }
  }, [])

  return <div ref={ref} />
}

export default BottomScrollObserver
