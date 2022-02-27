import { NextApiRequest, NextApiResponse } from 'next'
import sanityClient from '@sanity/client'
type Data = {
  name: string
  email: string
  comment: string
}

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
}

const client = sanityClient(config)

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { _id, name, email, comment } = JSON.parse(req.body)
  try {
      await client.create({
          _type: 'comment',
          post: {
              _type: 'reference',
              _ref: _id,
          },
          name,
          email,
          comment
      })
  } catch (error) {
      return res.status(500).json({ message: "Error : " + error })
  }


  res.status(200).json({ name: 'ghello' })
}
