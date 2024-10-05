import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Text } from "react-native";
import { Bell } from "lucide-react-native"; // Ensure correct import
import PostCard from "@/components/PostCard";
import Post from "@/interfaces/Post";

const fetchPosts = (): Promise<Post[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          _id: "1",
          postTitle: "My First Post",
          postDescription: "This is the content of my first post. #excited",
          postImage: "https://picsum.photos/400/300",
          postDate: new Date("2023-06-01T12:00:00Z"),
          postAuthor: "user123",
          postComments: ["comment1", "comment2"],
          postLikes: ["user1", "user2", "user3"],
          postDislikes: [],
          postTags: ["firstpost", "newbie"],
          postLocation: [40.7128, -74.006],
          postView: ["viewer1", "viewer2"],
          postViewCounter: 10,
        },
        {
          _id: "2",
          postTitle: "Beautiful Sunset",
          postDescription:
            "Captured this amazing sunset today! 🌅 #nature #photography",
          postImage: "https://picsum.photos/400/300?random=1",
          postDate: new Date("2023-06-02T18:30:00Z"),
          postAuthor: "photoEnthusiast",
          postComments: ["comment1"],
          postLikes: ["user1", "user2", "user3", "user4", "user5"],
          postDislikes: ["user6"],
          postTags: ["sunset", "nature", "photography"],
          postLocation: [34.0522, -118.2437],
          postView: ["viewer1", "viewer2", "viewer3"],
          postViewCounter: 25,
        },
      ]);
    }, 1000);
  });
};

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const userName = "John"; // This should be fetched from your user state or context

  useEffect(() => {
    fetchPosts()
      .then((fetchedPosts: Post[]) => {
        setPosts(fetchedPosts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-100 dark:bg-gray-900">
      <View className="flex-row justify-between items-center px-4 py-2 bg-blue-100 dark:bg-gray-900/20">
        <View className="flex flex-col">
          <Text className="text-xl font-bold text-gray-800 dark:text-gray-200">
            Hi,
          </Text>
          <Text className="text-2xl font-light text-gray-800 dark:text-gray-200">
            {userName}
          </Text>
        </View>
        <View>
          <Bell size={24} className="text-gray-800 dark:text-gray-200" />
        </View>
      </View>
      <ScrollView className="flex-1">
        <View className="p-4">
          {loading ? (
            <Text className="text-center text-gray-600 dark:text-gray-400">
              Loading posts...
            </Text>
          ) : (
            posts.map((post) => (
              <View key={post._id} className="mb-4">
                <PostCard post={post} />
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
