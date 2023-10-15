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
  //Doing this at server and optimization
  const html = marked(post.markdown);
  return json({title: post.title, html})
}

export default function post() {
  //You can call useLoaderData as much as we want; it's not what fetchs
  const {title, html} = useLoaderData<typeof loader>()

  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">
        {title}
      </h1>

      <div dangerouslySetInnerHTML={{ __html: html }} />

      {/* This doesn't work xss; react, angular etc: escape it for us */}
      {/* <div>{html}</div> */}
      {/* <div>{`<script>alert("Gotcha!")</script>`}</div> */}
    </main>
  );
}
