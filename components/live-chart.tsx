"use client"

import { useEffect, useRef, useState } from "react"

export function LiveChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [data, setData] = useState<number[]>([])

  useEffect(() => {
    // Initialize with random data
    const initial = Array.from({ length: 50 }, () => 0.08 + Math.random() * 0.01)
    setData(initial)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const newData = [...prev.slice(1), prev[prev.length - 1] + (Math.random() - 0.48) * 0.002]
        return newData
      })
    }, 500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || data.length === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const min = Math.min(...data) * 0.99
    const max = Math.max(...data) * 1.01
    const range = max - min

    ctx.clearRect(0, 0, width, height)

    // Draw gradient area
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, "rgba(212, 175, 55, 0.3)")
    gradient.addColorStop(1, "rgba(212, 175, 55, 0)")

    ctx.beginPath()
    ctx.moveTo(0, height)

    data.forEach((value, index) => {
      const x = (index / (data.length - 1)) * width
      const y = height - ((value - min) / range) * height
      ctx.lineTo(x, y)
    })

    ctx.lineTo(width, height)
    ctx.closePath()
    ctx.fillStyle = gradient
    ctx.fill()

    // Draw line
    ctx.beginPath()
    data.forEach((value, index) => {
      const x = (index / (data.length - 1)) * width
      const y = height - ((value - min) / range) * height
      if (index === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.strokeStyle = "#D4AF37"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw current price dot
    const lastX = width
    const lastY = height - ((data[data.length - 1] - min) / range) * height
    ctx.beginPath()
    ctx.arc(lastX - 2, lastY, 4, 0, Math.PI * 2)
    ctx.fillStyle = "#D4AF37"
    ctx.fill()
  }, [data])

  return (
    <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm text-gray-400">LMX/USDT</h3>
          <p className="text-2xl font-mono font-bold text-white">
            ${data.length > 0 ? data[data.length - 1].toFixed(4) : "0.0847"}
          </p>
        </div>
        <div className="text-right">
          <span className="text-green-500 text-sm font-mono">+12.45%</span>
          <p className="text-xs text-gray-500">24h Change</p>
        </div>
      </div>
      <canvas ref={canvasRef} width={400} height={120} className="w-full h-[120px]" />
      <div className="flex justify-between mt-2 text-xs text-gray-600">
        <span>24h ago</span>
        <span>12h ago</span>
        <span>Now</span>
      </div>
    </div>
  )
}
