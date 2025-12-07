"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface TimerContextType {
  hours: number
  minutes: number
  seconds: number
  formatted: string
}

const TimerContext = createContext<TimerContextType>({
  hours: 0,
  minutes: 0,
  seconds: 0,
  formatted: "00:00:00",
})

export function useTimer() {
  return useContext(TimerContext)
}

function calculateTimeLeft() {
  const now = new Date()
  const utcNow = new Date(now.toISOString())

  // Next midnight UTC
  const nextMidnight = new Date(utcNow)
  nextMidnight.setUTCHours(24, 0, 0, 0)

  const diff = nextMidnight.getTime() - utcNow.getTime()

  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return { hours, minutes, seconds }
}

export function TimerProvider({ children }: { children: ReactNode }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatted = `${String(timeLeft.hours).padStart(2, "0")}:${String(timeLeft.minutes).padStart(2, "0")}:${String(timeLeft.seconds).padStart(2, "0")}`

  return <TimerContext.Provider value={{ ...timeLeft, formatted }}>{children}</TimerContext.Provider>
}
