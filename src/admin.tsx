import { Admin } from './components/Admin'
import { Toaster } from './components/ui/sonner'

export default function AdminPage() {
  return (
    <>
      <Admin />
      <Toaster position="top-right" />
    </>
  )
}