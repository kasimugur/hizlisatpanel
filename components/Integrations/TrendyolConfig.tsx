'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { MoveLeft } from 'lucide-react'

export default function TrendyolConfig({ onBack }: { onBack: () => void }) {
  const [apiKey, setApiKey] = useState('')
  const [apiSecret, setApiSecret] = useState('')
  const [supplierId, setSupplierId] = useState('')

  const handleSave = async () => {
    try {
      // API isteği buradan yapılabilir (mock olarak console)
      console.log('Trendyol Config Saved:', {
        apiKey,
        apiSecret,
        supplierId,
      })
      toast.success('Trendyol ayarları kaydedildi')
    } catch (err) {
      toast.error('Ayarlar kaydedilemedi')
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
