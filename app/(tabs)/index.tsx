import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  Text,
  RefreshControl,
} from "react-native";
import { Bell } from "lucide-react-native";
import PostCard from "@/components/PostCard";
import Post from "@/interfaces/Post";
import Profile from "@/interfaces/Profile";
import { getProfileFromStorage } from "@/functions/profileAsyncStorage";

// Mock function to fetch posts (replace with actual API call)
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
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const [fetchedProfile, fetchedPosts] = await Promise.all([
        getProfileFromStorage(),
        fetchPosts(),
      ]);
      setProfile(fetchedProfile);
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadData();
  }, [loadData]);

  return (
    <SafeAreaView className="flex-1 bg-[#EEEEEE]">
      <View className="flex-row justify-between items-center px-4 py-2 bg-[#201E43]">
        <View className="flex flex-col">
          <Text className="text-xl font-bold text-gray-200">Hi,</Text>
          <Text className="text-2xl font-light text-gray-200">
            {profile?.userName || "Guest"}
          </Text>
        </View>
        <View>
          <Bell size={24} color="#F1F1F1" />
        </View>
      </View>
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#201E43"]}
          />
        }
      >
        <View className="p-4">
          {loading ? (
            <Text className="text-center text-gray-600 dark:text-gray-400">
              Loading posts...
            </Text>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <View key={post._id} className="mb-4">
                <PostCard post={post} />
              </View>
            ))
          ) : (
            <Text className="text-center text-gray-600 dark:text-gray-400">
              No posts available.
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
