import { useCallback, useRef } from 'react'

export function useScrollReveal(options?: {
  threshold?: number
  rootMargin?: string
}) {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return

    if (prefersReducedMotion) {
      node.classList.add('revealed')
      return
    }

    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed')
              observerRef.current?.unobserve(entry.target)
            }
          })
        },
        {
          threshold: options?.threshold ?? 0.1,
          rootMargin: options?.rootMargin ?? '0px 0px -50px 0px',
        }
      )
    }

    observerRef.current.observe(node)
  }, [prefersReducedMotion, options?.threshold, options?.rootMargin])

  return ref
}
