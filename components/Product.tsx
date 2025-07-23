"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import { useProducts } from "@/context/ProductContext"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "sonner"
import ProductDetailCard from "@/components/ProductDetailCard"
import { Product } from "@/types/product"


export default function ProductPage() {
  const { products, loading, fetchProducts } = useProducts()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [mode, setMode] = useState<"view" | "edit" | null>(null)
  const [open, setOpen] = useState(false)
  const [dialogProduct, setDialogProduct] = useState<Product | null>(null)

  const handleView = (product: Product) => {
    setSelectedProduct(product)
    setMode("view")
    setOpen(true)
  }

  const handleEdit = (product: Product) => {
    setSelectedProduct(product)
    setMode("edit")
    setOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Silme işlemi başarısız")
      toast.success("Ürün başarıyla silindi")
      fetchProducts()
    } catch (error) {
      toast.error("Silme sırasında hata oluştu")
    }
  }

  const columns: ColumnDef<Product>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      ),
    },
    {
      accessorKey: "image",
      header: "Görsel",
      cell: ({ row }) => (
        <img
          src={row.getValue("image")}
          alt="Görsel"
          className="w-14 h-14 object-cover rounded-md"
        />
      ),
    },
    {
      accessorKey: "name",
      header: "Ürün Adı",
    },
    {
      accessorKey: "price",
      header: "Fiyat",
      cell: ({ row }) => `₺${row.getValue("price")}`,
    },
    {
      accessorKey: "stock",
      header: "Stok",
    },
  {
    id: 'actions',
    header: 'İşlemler',
    cell: ({ row }) => {
      const product = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleView(product)}>Görüntüle</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEdit(product)}>Düzenle</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDialogProduct(product)}>Sil</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  ]

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
  })

  if (loading) return <div className="p-4">Ürünler yükleniyor...</div>

  return (
    <div className="w-full bg-white rounded-sm p-4">
      <div className="flex items-center py-4 gap-4">
        <Input
          placeholder="Ürün filtrele..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(e) => table.getColumn("name")?.setFilterValue(e.target.value)}
          className="max-w-sm"
        />
        <Button asChild>
          <Link href="/dashboard/products/new">+ Yeni Ürün</Link>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Sütunlar <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table.getAllColumns()
              .filter((col) => col.getCanHide())
              .map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  checked={col.getIsVisible()}
                  onCheckedChange={(value) => col.toggleVisibility(!!value)}
                >
                  {col.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Sonuç bulunamadı.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} / {table.getFilteredRowModel().rows.length} satır seçildi.
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Önceki
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Sonraki
          </Button>
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full md:w-1/2 bg-white overflow-y-auto">
          {selectedProduct && (
            <ProductDetailCard product={selectedProduct} mode={mode} closeSheet={() => setOpen(false)} />
          )}
        </SheetContent>
      </Sheet>

      <Dialog open={!!dialogProduct} onOpenChange={() => setDialogProduct(null)}>
        <DialogTrigger asChild><span /></DialogTrigger>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Silme Onayı</DialogTitle>
          </DialogHeader>
          <p>Bu ürünü silmek istediğinizden emin misiniz?</p>
          <DialogFooter>
            <Button variant="outline" className="hover:scale-110 shadow" onClick={() => setDialogProduct(null)}>İptal</Button>
            <Button variant="destructive" className="text-red-500 hover:scale-110 shadow" onClick={() => {
              if (dialogProduct) handleDelete(dialogProduct._id)
              setDialogProduct(null)
            }}>Sil</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
