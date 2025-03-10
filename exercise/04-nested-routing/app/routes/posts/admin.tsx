import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getPostListItems } from "~/models/post.server";

export async function loader() {
  return json({
    posts: await getPostListItems(),
  });
}

export default function AdminRoute() {
  const {posts} = useLoaderData<typeof loader>()
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="my-6 mb-2 border-b-2 text-center text-3xl">Blog Admin</h1>
      <div className="grid grid-cols-4 gap-6">
        <nav className="col-span-4 md:col-span-1">
          <ul>
            {posts.map((post) => (
              <li key={post.slug}>
                <Link to={post.slug} className="text-blue-600 underline">
                  {post.title}
                </Link>
              </li>
            ))}
            <li>
              <Link to="new" className="text-blue-600 underline">
                ➕ Create New Post
              </Link>
            </li>
          </ul>
        </nav>
        <main className="col-span-4 md:col-span-3">
          {/* 🐨 your job is to add an Outlet component here */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
