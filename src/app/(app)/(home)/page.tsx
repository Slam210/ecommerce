import configPromise from '@payload-config'
import { getPayload } from 'payload'

export default async function Home() {
  
  try {
      const payload = await getPayload({
        config: configPromise,
      })
  
      const data = await payload.find({
        collection: "categories",
      })
  
      return (
        <div>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )
    } catch (error) {
      return (
        <div>
          <p>Error loading categories: {error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      )
    }
}


