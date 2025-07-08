import configPromise from '@payload-config'
import { getPayload } from 'payload'

/**
 * Asynchronously fetches all entries from the "categories" collection and renders them as formatted JSON within a React component.
 *
 * @returns A JSX element displaying the retrieved "categories" data as a formatted JSON string.
 */
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


