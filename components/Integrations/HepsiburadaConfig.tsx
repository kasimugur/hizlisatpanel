'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { MoveLeft } from 'lucide-react'

export default function HepsiburadaConfig({ onBack }: { onBack: () => void }) {
  const [clientId, setClientId] = useState('')
  const [clientSecret, setClientSecret] = useState('')

  const handleSave = () => {
    console.log('Hepsiburada Config Saved:', { clientId, clientSecret })
    toast.success('Hepsiburada ayarları kaydedildi')
  }

  return (
    <Card className="max-w-md">
      <CardContent className="space-y-4 py-6">
        <div className="flex justify-between">
          <Button variant="ghost" onClick={onBack}>
            <MoveLeft />
          </Button>
          <h2 className="text-lg font-semibold">Hepsiburada Entegrasyonu</h2>
        </div>
        <div className="space-y-1">
          <Label>Client ID</Label>
          <Input value={clientId} onChange={(e) => setClientId(e.target.value)} placeholder="Client ID" />
        </div>

        <div className="space-y-1">
          <Label>Client Secret</Label>
          <Input value={clientSecret} onChange={(e) => setClientSecret(e.target.value)} placeholder="Client Secret" />
        </div>

        <Button onClick={handleSave} className="mt-2">Kaydet</Button>
      </CardContent>
    </Card>
  )
}
