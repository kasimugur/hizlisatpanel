'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import TrendyolConfig from './TrendyolConfig'
import N11Config from './N11Config'
import HepsiburadaConfig from './HepsiburadaConfig'
import { toast } from 'sonner'
import { useIntegrations } from '@/context/IntegrationsContext'



export default function MarketplaceIntegrations() {
  const { integrations, connect, disconnect, updateSettings } = useIntegrations()
  const [selected, setSelected] = useState<string | null>(null)

  const handleBack = () => setSelected(null)

  const handleConnect = (key: string) => {
    if (key === 'n11' || key === 'hepsiburada') {
      toast.info(`${key.toUpperCase()} şu an desteklenmiyor, yakında eklenecek.`)
      return
    }
    connect(key.charAt(0).toUpperCase() + key.slice(1), {}) // boş settings ile bağla
    setSelected(key)
  }

  const handleDisconnect = (key: string) => {
    disconnect(key.charAt(0).toUpperCase() + key.slice(1))
    toast.info(`${key} bağlantısı kaldırıldı`)
  }


  const renderConfig = () => {
    switch (selected) {
      case 'trendyol':
        return <TrendyolConfig onBack={handleBack} />
      case 'n11':
        return <N11Config onBack={handleBack} />
      case 'hepsiburada':
        return <HepsiburadaConfig onBack={handleBack} />
      default:
        return null
    }
  }

  return (
    <div>
      {!selected && (
        <div className="grid md:grid-cols-2 gap-4">
          {integrations.map(int => (
            <Card key={int.name} className={int.status === "connected" ? '' : 'opacity-50'}>
              <CardHeader>
                <CardTitle>
                  {int.name} {int.status === "connected" && '✅'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-x-2">
                {int.status === "connected" ? (
                  <>
                    <Button variant="outline" onClick={() => setSelected(int.name.toLowerCase())}>
                      Yönet
                    </Button>
                    <Button variant="outline" onClick={() => handleDisconnect(int.name)}>
                      Bağlantıyı Kaldır
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => handleConnect(int.name.toLowerCase())}>
                    Bağlan
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}

        </div>
      )}

      {selected && renderConfig()}
    </div>
  )
}
