import { useEffect, useState } from "react";

import type { Post } from "../../models/Post";

import "./BlogList.css";

function BlogList() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/posts/")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div className="post-container">
      {posts.map((post) => (
        <div key={post.id} className="post-entry">
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

export default BlogList;