import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  Text,
  RefreshControl,
  Image,
} from "react-native";
import {
  Avatar,
  Button,
  Chip,
  Card,
  Divider,
  useTheme,
  ActivityIndicator,
} from "react-native-paper";
import { Bell } from "lucide-react-native";
import PostCard from "@/components/PostCard";
import Post from "@/interfaces/Post";
import Profile from "@/interfaces/Profile";
import { getAllPosts } from "@/functions/postFunctions";
import { getProfileFromStorage } from "@/functions/profileAsyncStorage";

export default function HomeScreen() {
  const theme = useTheme();
  const [posts, setPosts] = useState<Post[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const [fetchedProfile] = await Promise.all([getProfileFromStorage()]);
      setProfile(fetchedProfile);

      const [fetchedPosts] = await Promise.all([getAllPosts()]);
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

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#EEEEEE]">
      <View className="flex-row justify-between items-center px-4 py-2 bg-[#EEEEEE]">
        <View className="items-center flex flex-row ">
          {profile?.profilePicture ? (
            <View className="flex flex-row justify-start items-center gap-4">
              <Image
                source={{
                  uri: `data:image/jpeg;base64,${profile.profilePicture}`,
                }}
                className="rounded-full w-30 h-30"
                width={60}
                height={60}
              />
              <Text className="text-2xl font-light">{profile?.name}</Text>
            </View>
          ) : (
            <Avatar.Text size={120} label={profile?.name[0] || "U"} />
          )}
        </View>
        <View>
          <Bell size={24} color="#63519f" />
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
