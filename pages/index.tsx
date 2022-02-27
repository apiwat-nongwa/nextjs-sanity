import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import { urlFor } from '../lib/sanity'
import { sanityClient } from '../lib/sanity.server'
import { Post } from '../typings'

interface Props {
  posts: [Post]
}

export default function Home({ posts }: Props) {
  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>Medium 2.0 Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="flex items-center justify-between border-y border-black bg-yellow-400 py-10 lg:py-0">
        <div className="space-y-5 px-10">
          <h1 className="max-w-xl font-serif text-6xl">
            <span className="underline decoration-black decoration-4">
              Medium
            </span>{' '}
            is a place to write, read, and connect
          </h1>
          <h2>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum
            quibusdam error{' '}
          </h2>
        </div>
        <img
          className="hidden h-32 md:inline-flex lg:h-full"
          src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
          alt="Medium logo"
        />
      </div>

      {/* Posts. */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 p-2 md:p-6">
        {posts.map((post) => {
          return (
            <Link key={post._id} href={`/post/${post.slug.current}`}>
              <div className='border rounded-lg cursor-pointer group overflow-hidden'>
                <img className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out' src={urlFor(post.mainImage).url()!} alt={post.title} />
                <div className='flex justify-between p-5 bg-white'>
                  <div>
                    <p className='text-lg font-bold'>{post.title}</p>
                    <p>
                      {post.description} by {post.author.name}
                    </p>
                  </div>
                  <img
                    className='h-12 w-12 rounded-full'
                    src={urlFor(post.author.image).url()!}
                    alt={post.author.name}
                  />
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `*[_type == 'post']{
    _id,
    title,
    slug,
    author -> {
    name,
    image
  },
  _createdAt,
  description,
  mainImage
}`

  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts: posts,
    },
  }
}
