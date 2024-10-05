interface Post {
  _id: string;
  postTitle: string;
  postDescription: string;
  postImage?: string;
  postImageType?: string;
  postDate: Date;
  postAuthor: string; // Assuming we'll use the author's name or ID
  postComments: string[];
  postLikes: string[];
  postDislikes: string[];
  postTags: string[];
  postLocation: number[];
  postView: string[];
  postViewCounter: number;
}

export default Post;
