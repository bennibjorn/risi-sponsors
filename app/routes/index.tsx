import * as prismic from '@prismicio/client'
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

export const loader = async () => {
  const client = prismic.createClient(process.env.CMS_BASE_URL || '')
  const response = await client.get({
    predicates: [
      prismic.predicate.at("document.type", "sponsor"),
    ]
  });
  console.log(response)
  return json({
    docs: response.results
  })
} 

export default function Index() {
  const { docs } = useLoaderData()
  console.log(docs)
  return (
    <div>{JSON.stringify(docs)}</div>
  );
}
