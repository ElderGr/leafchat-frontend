'use client'
import Private from "../components/Layout/Private";
import PostProvider from "../context/post";
import FeedContainer from "./components/_container";

export default function FeedPage() {
  return (
    <Private>
      <PostProvider>
        <FeedContainer />
      </PostProvider>
    </Private>
  )
}