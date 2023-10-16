import { Outlet } from "@remix-run/react";

export default function PhotosRoute() {
  return (
    <div>
      <h1>Your Photos</h1>
      <Outlet /> {/* 👈 This is where any children will be rendered */}
    </div>
  );
}
