'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, FileText, Printer, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

const invoices = [
  { no: "#INV-00123", customer: "Ayşe K.", total: 320, date: "2025-05-20" },
  { no: "#INV-00124", customer: "Mehmet Y.", total: 180, date: "2025-05-19" },
];

export default function FaturaListesi() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="p-6 space-y-6 bg-white rounded-md">
      {/* Üst Araçlar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
          📤 Yeni Fatura Kes
        </Button>
        <div className="flex gap-3 w-full md:w-auto">
          <Input placeholder="🔍 Ara..." className="max-w-xs" />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <CalendarIcon size={18} />
                {selectedDate ? format(selectedDate, "dd.MM.yyyy") : "Tarihe Göre Filtrele"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar style={{ backgroundColor: '#f0f0f0', color: '#333' }}  mode="single" selected={selectedDate!} onSelect={setSelectedDate} />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Fatura Tablosu */}
      <Card>
        <CardContent className="p-3">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-700">
                <th className="p-3">Fatura No</th>
                <th className="p-3">Müşteri</th>
                <th className="p-3">Tutar</th>
                <th className="p-3">Tarih</th>
                <th className="p-3">PDF</th>
                <th className="p-3 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((fatura) => (
                <tr key={fatura.no} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{fatura.no}</td>
                  <td className="p-3">{fatura.customer}</td>
                  <td className="p-3 text-green-700 font-semibold">₺{fatura.total}</td>
                  <td className="p-3">{format(new Date(fatura.date), "dd.MM.yyyy")}</td>
                  <td className="p-3">
                    <Button variant="link" className="p-0 text-blue-600 font-medium">
                      Görüntüle
                    </Button>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <Button size="icon" variant="ghost">
                      <Printer size={16} />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Trash2 size={16} className="text-red-500" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
