'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { MoveLeft } from 'lucide-react'
import { useSettings } from '@/context/SettingsContext'

export default function TrendyolConfig({ onBack }: { onBack: () => void }) {
const { settings, updateSettings } = useSettings()

  const [apiKey, setApiKey] = useState(settings?.integrations.trendyol.apiKey || '')
  const [apiSecret, setApiSecret] = useState(settings?.integrations.trendyol.apiSecret || '')
  const [supplierId, setSupplierId] = useState(settings?.integrations.trendyol.supplierId || '')
  const [connected, setConnected] = useState(settings?.integrations.trendyol.connected || false)

  const handleSave = async () => {
    try {
      await updateSettings({
        integrations: {
          ...settings?.integrations,
          trendyol: {
            connected: true,
            apiKey,
            apiSecret,
            supplierId,
          }
        }
      })
      toast.info('Trendyol ayarları kaydedildi')
      onBack()
    } catch (error) {
      toast.error('Ayarlar kaydedilemedi',error)
    }
  }

  return (
    <Card className="max-w-md">
      <CardContent className="space-y-4 py-6">
        <div className="flex justify-between">
          <Button variant="ghost" onClick={onBack}>
            <MoveLeft  />
          </Button>
          <h2 className="text-lg font-semibold">Trendyol Entegrasyonu</h2>
        </div>
        <div className="space-y-1">
          <Label>API Key</Label>
          <Input value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="API key giriniz" />
        </div>

        <div className="space-y-1">
          <Label>API Secret</Label>
          <Input value={apiSecret} onChange={(e) => setApiSecret(e.target.value)} placeholder="API secret giriniz" />
        </div>

        <div className="space-y-1">
          <Label>Tedarikçi ID (Supplier ID)</Label>
          <Input value={supplierId} onChange={(e) => setSupplierId(e.target.value)} placeholder="123456" />
        </div>

        <Button variant={'outline'} onClick={handleSave} className="mt-2">Kaydet</Button>
      </CardContent>
    </Card>
  )
}
