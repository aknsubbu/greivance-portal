// commentApi.ts

import Comment from "@/interfaces/Comment";

const BASE_URL = "https://activity-point-program-backend.onrender.com/api";

export const getAllComments = async (): Promise<Comment[]> => {
  const response = await fetch(`${BASE_URL}/comments/`);
  if (!response.ok) throw new Error("Failed to fetch comments");
  const data = await response.json();
  return data as Comment[];
};

export const getCommentById = async (id: string): Promise<Comment> => {
  const response = await fetch(`${BASE_URL}/comments/${id}`);
  if (!response.ok) throw new Error("Failed to fetch comment");
  const data = await response.json();
  return data as Comment;
};

export const getCommentsByUsername = async (
  username: string
): Promise<Comment[]> => {
  const response = await fetch(`${BASE_URL}/comments/${username}`);
  if (!response.ok) throw new Error("Failed to fetch comments");
  const data = await response.json();
  return data as Comment[];
};

export const createComment = async (
  commentData: Omit<Comment, "id">
): Promise<Comment> => {
  const response = await fetch(`${BASE_URL}/comments/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentData),
  });
  if (!response.ok) throw new Error("Failed to create comment");
  const data = await response.json();
  return data as Comment;
};

export const updateComment = async (
  id: string,
  commentData: Partial<Comment>
): Promise<Comment> => {
  const response = await fetch(`${BASE_URL}/comments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentData),
  });
  if (!response.ok) throw new Error("Failed to update comment");
  const data = await response.json();
  return data as Comment;
};

export const deleteComment = async (id: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/comments/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete comment");
};
