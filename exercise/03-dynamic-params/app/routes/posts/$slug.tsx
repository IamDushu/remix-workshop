import { LoaderArgs } from '@remix-run/server-runtime';
import { json } from "@remix-run/node"
import { getPost } from '~/models/post.server';
import { useLoaderData } from '@remix-run/react';
import { marked } from "marked";


export async function loader({params}: LoaderArgs) {
  if(!params.slug){
    throw new Error("Missing Slug")
  }
  const post =  await getPost(params.slug)
  if(!post) {
    throw new Error("Post not found")
  }
  return json({post: post})
}

export default function post() {
  const data = useLoaderData<typeof loader>()
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{data.post.title}</h1>
    </main>
  )
}
