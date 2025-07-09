'use client'
import { createContext, useContext, useState, ReactNode } from "react"

type IntegrationStatus = "connected" | "disconnected" | "error"

type IntegrationConfig = {
  name: string
  status: IntegrationStatus
  settings: Record<string, any>
}

type IntegrationsContextType = {
  integrations: IntegrationConfig[]
  connect: (name: string, settings: Record<string, any>) => void
  disconnect: (name: string) => void
  updateSettings: (name: string, settings: Record<string, any>) => void
}

const IntegrationsContext = createContext<IntegrationsContextType | undefined>(undefined)

export const IntegrationsProvider = ({ children }: { children: ReactNode }) => {
  const [integrations, setIntegrations] = useState<IntegrationConfig[]>([
    {
      name: "Trendyol",
      status: "disconnected",
      settings: {},
    },
    {
      name: "N11",
      status: "disconnected",
      settings: {},
    },
    {
      name: "Hepsiburada",
      status: "disconnected",
      settings: {},
    },
  ])

  const connect = (name: string, settings: Record<string, any>) => {
    setIntegrations(prev =>
      prev.map(i =>
        i.name === name ? { ...i, status: "connected", settings } : i
      )
    )
  }

  const disconnect = (name: string) => {
    setIntegrations(prev =>
      prev.map(i =>
        i.name === name ? { ...i, status: "disconnected", settings: {} } : i
      )
    )
  }

  const updateSettings = (name: string, settings: Record<string, any>) => {
    setIntegrations(prev =>
      prev.map(i =>
        i.name === name ? { ...i, settings } : i
      )
    )
  }

  return (
    <IntegrationsContext.Provider value={{ integrations, connect, disconnect, updateSettings }}>
      {children}
    </IntegrationsContext.Provider>
  )
}

export const useIntegrations = () => {
  const context = useContext(IntegrationsContext)
  if (!context) throw new Error("useIntegrations must be used within an IntegrationsProvider")
  return context
}
