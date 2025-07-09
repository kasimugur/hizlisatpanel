'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import TrendyolConfig from './TrendyolConfig'
import N11Config from './N11Config'
import HepsiburadaConfig from './HepsiburadaConfig'
import { toast } from 'sonner'
import { mockIntegrations } from '@/constant/mockIntegrations'

type Integration = {
  key: string
  name: string
  connected: boolean
  settings: {};
}


export default function MarketplaceIntegrations() {
  const [integrations, setIntegrations] = useState<Integration>(mockIntegrations)
  const [selected, setSelected] = useState<string | null>(null)

  const handleBack = () => setSelected(null)

  const handleConnect = (key: string) => {
    if (key === 'n11' || key === 'hepsiburada') {
      toast.info(`${key.toUpperCase()} şu an desteklenmiyor, yakında eklenecek.`);
      return; // durdurur
    }
    setIntegrations(prev =>
      prev.map(i => (i.key === key ? { ...i, connected: true } : i))
    )
    setSelected(key)
  }

  const handleDisconnect = (key: string) => {
    setIntegrations(prev =>
      prev.map(i => (i.key === key ? { ...i, connected: false } : i))
    )
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
            <Card key={int.key} className={int.connected ? '' : 'opacity-50'}>
              <CardHeader>
                <CardTitle>
                  {int.name} {int.connected && '✅'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-x-2">
                {int.connected ? (
                  <>
                    <Button variant="outline" onClick={() => setSelected(int.key)}>
                      Yönet
                    </Button>
                    <Button variant="outline" onClick={() => handleDisconnect(int.key)}>
                      Bağlantıyı Kaldır
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => handleConnect(int.key)}>
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
