import { useEffect, useRef, useState } from "react"

interface MarqueeAlongSvgPathProps {
  path: string
  viewBox: string
  baseVelocity?: number
  showPath?: boolean
  slowdownOnHover?: boolean
  draggable?: boolean
  dragAwareDirection?: boolean
  dragVelocityDecay?: number
  scrollAwareDirection?: boolean
  useScrollVelocity?: boolean
  scrollContainer?: React.RefObject<HTMLElement>
  repeat?: number
  enableRollingZIndex?: boolean
  dragSensitivity?: number
  className?: string
  responsive?: boolean
  grabCursor?: boolean
  children: React.ReactNode
}

interface ItemPosition {
  x: number
  y: number
  angle: number
}

export function MarqueeAlongSvgPath({
  path,
  viewBox,
  baseVelocity = 4,
  showPath = false,
  slowdownOnHover = true,
  draggable = true,
  dragAwareDirection = true,
  dragVelocityDecay = 0.98,
  scrollAwareDirection = true,
  useScrollVelocity = true,
  scrollContainer,
  repeat = 4,
  enableRollingZIndex = true,
  dragSensitivity = 0.01,
  className = "",
  responsive = false,
  grabCursor = false,
  children,
}: MarqueeAlongSvgPathProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const pathElementRef = useRef<SVGPathElement>(null)
  const [pathLength, setPathLength] = useState(0)
  const [items, setItems] = useState<Array<{ id: number; element: React.ReactElement }>>([])
  const [itemPositions, setItemPositions] = useState<ItemPosition[]>([])
  const velocityRef = useRef(baseVelocity)
  const positionRef = useRef(0)
  const dragVelocityRef = useRef(0)
  const lastScrollRef = useRef(0)
  const animationFrameRef = useRef<number>()
  const isHoveringRef = useRef(false)
  const [viewBoxWidth, setViewBoxWidth] = useState(1040)
  const [viewBoxHeight, setViewBoxHeight] = useState(570)

  // Parse viewBox
  useEffect(() => {
    const parts = viewBox.split(" ")
    if (parts.length === 4) {
      setViewBoxWidth(parseInt(parts[2]))
      setViewBoxHeight(parseInt(parts[3]))
    }
  }, [viewBox])

  // Extract SVG path length
  useEffect(() => {
    if (svgRef.current) {
      const pathElement = svgRef.current.querySelector("path") as SVGPathElement
      if (pathElement) {
        pathElementRef.current = pathElement
        const length = pathElement.getTotalLength()
        setPathLength(length)
      }
    }
  }, [path, viewBox])

  // Process children
  useEffect(() => {
    const childArray = Array.isArray(children) ? children : [children]
    const processedItems = childArray
      .filter((child) => child != null)
      .map((child, idx) => ({
        id: idx,
        element: child,
      }))
    setItems(processedItems)
  }, [children])

  // Handle scroll
  useEffect(() => {
    const container = scrollContainer?.current || window
    const handleScroll = () => {
      if (useScrollVelocity && scrollAwareDirection) {
        const currentScroll = container instanceof Window ? window.scrollY : container.scrollTop
        const scrollDelta = currentScroll - lastScrollRef.current
        dragVelocityRef.current += scrollDelta * dragSensitivity
        lastScrollRef.current = currentScroll
      }
    }

    if (container instanceof Window) {
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    } else if (container) {
      container.addEventListener("scroll", handleScroll)
      return () => container.removeEventListener("scroll", handleScroll)
    }
  }, [useScrollVelocity, scrollAwareDirection, scrollContainer, dragSensitivity])

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!draggable) return
    dragVelocityRef.current = 0
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!draggable || !dragAwareDirection) return
    dragVelocityRef.current += e.movementX * dragSensitivity
  }

  const handleMouseEnter = () => {
    isHoveringRef.current = true
  }

  const handleMouseLeave = () => {
    isHoveringRef.current = false
  }

  // Get point on path at given distance
  const getPointAtDistance = (distance: number): ItemPosition => {
    if (!pathElementRef.current || pathLength === 0) {
      return { x: 0, y: 0, angle: 0 }
    }

    const point = pathElementRef.current.getPointAtLength(distance)
    const pointBefore = pathElementRef.current.getPointAtLength(Math.max(0, distance - 1))

    const angle = Math.atan2(point.y - pointBefore.y, point.x - pointBefore.x)

    return { x: point.x, y: point.y, angle }
  }

  // Animation loop
  useEffect(() => {
    if (pathLength === 0 || items.length === 0) return

    const animate = () => {
      let currentVelocity = baseVelocity
      if (slowdownOnHover && isHoveringRef.current) {
        currentVelocity *= 0.5
      }

      currentVelocity += dragVelocityRef.current
      dragVelocityRef.current *= dragVelocityDecay

      positionRef.current += currentVelocity
      if (positionRef.current >= pathLength * repeat) {
        positionRef.current = 0
      }

      const itemSpacing = (pathLength * repeat) / items.length

      const newPositions = items.map((_, idx) => {
        const itemDistance = (positionRef.current + idx * itemSpacing) % (pathLength * repeat)
        const normalizedDistance = itemDistance % pathLength
        return getPointAtDistance(normalizedDistance)
      })

      setItemPositions(newPositions)
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [pathLength, items.length, baseVelocity, slowdownOnHover, dragVelocityDecay, repeat])

  const containerWidth = containerRef.current?.offsetWidth || 800
  const scale = containerWidth / viewBoxWidth

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${grabCursor ? "cursor-grab active:cursor-grabbing" : ""} ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <svg
        ref={svgRef}
        viewBox={viewBox}
        className="absolute inset-0 w-full h-full"
        style={{ display: showPath ? "block" : "none", opacity: 0.1 }}
      >
        <path d={path} fill="none" stroke="black" strokeWidth="2" />
      </svg>

      {items.map((item, idx) => {
        const pos = itemPositions[idx] || { x: 0, y: 0, angle: 0 }

        return (
          <div
            key={item.id}
            className="absolute"
            style={{
              left: `${(pos.x / viewBoxWidth) * 100}%`,
              top: `${(pos.y / viewBoxHeight) * 100}%`,
              transform: `translate(-50%, -50%) rotate(${(pos.angle * 180) / Math.PI}deg)`,
              zIndex: enableRollingZIndex ? Math.floor((idx / items.length) * 100) : idx,
              pointerEvents: "auto",
            }}
          >
            {item.element}
          </div>
        )
      })}
    </div>
  )
}
