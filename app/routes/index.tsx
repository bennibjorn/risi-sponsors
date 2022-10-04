import * as prismic from '@prismicio/client'
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Sponsor } from '../models/sponsors.interface'

export const loader = async () => {
  const client = prismic.createClient(process.env.CMS_BASE_URL || '')

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  const response = await client.get({
    predicates: [
      prismic.predicate.at("document.type", "sponsor"),
      prismic.predicate.dateBefore('my.sponsor.valid_from', tomorrow),
      prismic.predicate.dateAfter('my.sponsor.valid_to', yesterday),
      prismic.predicate.at('my.sponsor.enabled', true)
    ]
  });
  return json(response.results.map((doc) => {
    return doc.data
  }))
} 

export default function Index() {
  const sponsors = useLoaderData<Sponsor[]>()
  return (
    <div>{JSON.stringify(sponsors)}</div>
  );
}
