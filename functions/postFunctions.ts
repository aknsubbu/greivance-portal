// postFunctions.ts

import Post from "@/interfaces/Post";

const BASE_URL = "https://activity-point-program-backend.onrender.com/api";

export const getAllPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${BASE_URL}/posts/`);
  if (!response.ok) throw new Error("Failed to fetch posts");
  const data = await response.json();
  return data as Post[];
};

export const getPostById = async (id: string): Promise<Post> => {
  const response = await fetch(`${BASE_URL}/posts/${id}`);
  if (!response.ok) throw new Error("Failed to fetch post");
  const data = await response.json();
  return data as Post;
};

export const getPostByLocation = async (
  xposition: number,
  yposition: number
): Promise<Post[]> => {
  const response = await fetch(
    `${BASE_URL}/posts/pbpos/${xposition}/${yposition}`
  );
  if (!response.ok) throw new Error("Failed to fetch post by location");
  const data = await response.json();
  return data as Post[];
};

export const getPostsByUsername = async (username: string): Promise<Post[]> => {
  const response = await fetch(`${BASE_URL}/posts/username/${username}`);
  if (!response.ok) throw new Error("Failed to fetch posts");
  const data = await response.json();
  return data as Post[];
};

export const createPost = async (
  postData: Omit<Post, "_id">
): Promise<Post> => {
  const response = await fetch(`${BASE_URL}/posts/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });
  if (!response.ok) throw new Error("Failed to create post");
  const data = await response.json();
  return data as Post;
};

export const updatePost = async (
  id: string,
  postData: Partial<Post>
): Promise<Post> => {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });
  if (!response.ok) throw new Error("Failed to update post");
  const data = await response.json();
  return data as Post;
};

export const deletePost = async (id: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete post");
};

export const trackPostView = async (
  userId: string,
  postId: string
): Promise<void> => {
  const response = await fetch(`${BASE_URL}/posts/view/${userId}/${postId}`);
  if (!response.ok) throw new Error("Failed to track post view");
};
