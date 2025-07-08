import configPromise from '@payload-config'
import { getPayload } from 'payload'

/**
 * Asynchronously fetches all entries from the "categories" collection and renders them as formatted JSON within a React component.
 *
 * @returns A JSX element displaying the retrieved "categories" data as a formatted JSON string.
 */
export default async function Home() {
  const payload = await getPayload({
    config: configPromise,
  })

  const data = await payload.find({
    collection: "categories",
  })

  return (
    <div>
      {JSON.stringify(data,null, 2)}
    </div>
  );
}


