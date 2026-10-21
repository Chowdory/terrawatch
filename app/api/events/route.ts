import { getDisasterEvents } from '@/lib/disasters'

export const revalidate = 300

export async function GET() {
  const data = await getDisasterEvents()
  return Response.json(data, {
    headers: { 'Cache-Control': 's-maxage=300, stale-while-revalidate=600' },
  })
}
