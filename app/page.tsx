import { Dashboard } from '@/components/dashboard'
import { getDisasterEvents } from '@/lib/disasters'

export const revalidate = 300

export default async function Page() {
  const initialData = await getDisasterEvents()
  return <Dashboard initialData={initialData} />
}
