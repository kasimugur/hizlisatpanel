'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { MoveLeft } from 'lucide-react'

export default function N11Config({ onBack }: { onBack: () => void }) {
  const [appKey, setAppKey] = useState('')
  const [appSecret, setAppSecret] = useState('')

  const handleSave = () => {
    console.log('N11 Config Saved:', { appKey, appSecret })
    toast.success('N11 ayarları kaydedildi')
  }

  return (
    <Card className="max-w-md">
      <CardContent className="space-y-4 py-6">
        <div className="flex justify-between">
          <Button variant="ghost" onClick={onBack}>
            <MoveLeft />
          </Button>
          <h2 className="text-lg font-semibold">N11 Entegrasyonu</h2>
        </div>
        <div className="space-y-1">
          <Label>App Key</Label>
          <Input value={appKey} onChange={(e) => setAppKey(e.target.value)} placeholder="App key giriniz" />
        </div>

        <div className="space-y-1">
          <Label>App Secret</Label>
          <Input value={appSecret} onChange={(e) => setAppSecret(e.target.value)} placeholder="App secret giriniz" />
        </div>

        <Button onClick={handleSave} className="mt-2">Kaydet</Button>
      </CardContent>
    </Card>
  )
}
