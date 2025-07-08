import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const GET = async () => {

 try {
     const payload = await getPayload({
       config: configPromise,
     })
    
     const data = await payload.find({
       collection: 'categories',
       limit: 5,
     })
    
     return Response.json({
       message: 'This is an example of a custom route.',
       data: data.docs,
     })
   } catch (error) {
     return Response.json({ error }, { status: 500 });
   }
}
