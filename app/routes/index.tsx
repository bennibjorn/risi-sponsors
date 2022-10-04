import { useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import * as prismic from '@prismicio/client'
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
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
    <Fade arrows={false} pauseOnHover={false} >
      {sponsors.map((sponsor, index) => (
        <img key={index} src={sponsor.logo.url} />
      ))}
    </Fade>
  );
}
