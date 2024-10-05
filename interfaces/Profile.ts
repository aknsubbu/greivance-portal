interface Profile {
  _id: string;
  name: string;
  dateOfBirth: Date;
  aadharNumber: number;
  phoneNumber?: number;
  userName: string;
  password: string;
  tag?: string;
  location: string;
  profilePicture?: string;
  profileDescription?: string;
  noOfPosts: number;
  postsOrComments: Array<{
    _id: string;
    type: "post" | "comment";
    content: string;
    createdAt: Date;
  }>;
  blockedUsers: string[];
  postTags: { [key: string]: number };
  createdAt: Date;
  updatedAt: Date;
}

export default Profile;
