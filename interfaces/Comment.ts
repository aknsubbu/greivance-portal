export interface Comment {
  _id?: string;
  parentPost: string;
  comment: string;
  commentDate: Date;
  commentAuthor: string;
  commentLikes?: number;
  commentDislikes?: number;
  commentTags?: string[];
  subComments?: string[];
}

export default Comment;
