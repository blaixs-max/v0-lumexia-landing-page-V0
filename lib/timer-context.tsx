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

// 48-hour cycle anchor — must match the Edge Function and DB trigger.
// Sprint 8 token launch reset moved the anchor to 2026-05-09. See
// racing repo: supabase/migrations/20260509200000_cycle_reset_token_launch.sql.
const CYCLE_ANCHOR_DATE = "2026-05-09"
const MS_PER_DAY = 86_400_000
const MS_PER_CYCLE = 2 * MS_PER_DAY

// Returns the UTC timestamp at which the current 48h cycle ends (= start of
// the next cycle). Cycles tick at 00:00 UTC every other day from the anchor.
function nextCycleEnd(now: Date): Date {
  const anchor = new Date(`${CYCLE_ANCHOR_DATE}T00:00:00Z`)
  const elapsed = now.getTime() - anchor.getTime()
  const cyclesPassed = Math.floor(elapsed / MS_PER_CYCLE)
  return new Date(anchor.getTime() + (cyclesPassed + 1) * MS_PER_CYCLE)
}

function calculateTimeLeft() {
  const now = new Date()
  const cycleEnd = nextCycleEnd(now)
  const diff = Math.max(0, cycleEnd.getTime() - now.getTime())

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
