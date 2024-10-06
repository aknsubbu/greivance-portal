import React, { useState, useEffect, useCallback } from "react";
import { View, ScrollView, Image, RefreshControl } from "react-native";
import {
  Text,
  Avatar,
  Button,
  Chip,
  Card,
  Divider,
  useTheme,
  ActivityIndicator,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Profile from "@/interfaces/Profile";
import Post from "@/interfaces/Post";
import EditProfileModal from "@/components/EditProfile";

import { getProfileFromStorage } from "@/functions/profileAsyncStorage";
import { getPostsByUsername } from "@/functions/postFunctions";

const ProfilePage: React.FC = () => {
  const theme = useTheme();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const fetchProfileData = useCallback(async () => {
    try {
      const profileData = await getProfileFromStorage();
      setProfile(profileData);

      if (profileData?.userName) {
        const postsData = await getPostsByUsername(profileData.userName);
        setPosts(postsData);
        console.log(posts);
      }
    } catch (err) {
      setError("Failed to fetch profile data");
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProfileData();
  }, [fetchProfileData]);

  const handleProfileUpdate = (updatedProfile: Profile) => {
    setProfile(updatedProfile);
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error || !profile) {
    return (
      <ScrollView
        className="flex-1 bg-white pt-10"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
          />
        }
      >
        <View className="flex-1 justify-center items-center p-5">
          <Text>{error || "Failed to load profile"}</Text>
        </View>
      </ScrollView>
    );
  }

  const renderActivity = (item: Profile["postsOrComments"][0]) => (
    <Card className="mb-4" key={item._id}>
      <Card.Title
        title={item.type === "post" ? "Posted" : "Commented"}
        subtitle={new Date(item.createdAt).toLocaleDateString()}
        left={(props) => (
          <Avatar.Icon
            {...props}
            icon={item.type === "post" ? "post" : "comment-text-outline"}
          />
        )}
      />
      <Card.Content>
        <Text numberOfLines={2}>{item.content}</Text>
      </Card.Content>
    </Card>
  );

  const renderPostCard = (post: Post) => (
    <Card className="mb-4" key={post._id}>
      <Card.Title
        title={post.postTitle}
        subtitle={new Date(post.postDate).toLocaleDateString()}
        className="m-1"
      />
      {post.postImage && (
        <Card.Cover source={{ uri: post.postImage }} className="m-2" />
      )}
      <Card.Content className="mt-5">
        <Text numberOfLines={3} className="mb-2">
          {post.postDescription}
        </Text>
        <View className="flex-row justify-around">
          <View className="flex-row items-center">
            <MaterialCommunityIcons
              name="heart"
              size={20}
              color={theme.colors.primary}
            />
            <Text className="ml-1">{post.postLikes.length}</Text>
          </View>
          <View className="flex-row items-center">
            <MaterialCommunityIcons
              name="eye"
              size={20}
              color={theme.colors.primary}
            />
            <Text className="ml-1">{post.postViewCounter}</Text>
          </View>
          <View className="flex-row items-center">
            <MaterialCommunityIcons
              name="comment"
              size={20}
              color={theme.colors.primary}
            />
            <Text className="ml-1">{post.postComments.length}</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <>
      <ScrollView
        className="flex-1 bg-white pt-10"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
          />
        }
      >
        <View className="items-center p-5">
          {profile.profilePicture ? (
            <Image
              source={{
                uri: `data:image/jpeg;base64,${profile.profilePicture}`,
              }}
              className="rounded-full w-30 h-30"
              width={120}
              height={120}
            />
          ) : (
            <Avatar.Text size={120} label={profile.name[0] || "U"} />
          )}
          <Text className="text-2xl font-bold mt-2">{profile.name}</Text>
          <Chip icon="account" className="mt-2">
            {profile.userName || "No tag"}
          </Chip>
        </View>

        <View className="p-5">
          <Text className="text-xl font-bold mb-2">About</Text>
          <View className="flex-row items-center mb-1">
            <MaterialCommunityIcons
              name="map-marker"
              size={20}
              color={theme.colors.primary}
            />
            <Text className="ml-2">
              {profile.location || "No location set"}
            </Text>
          </View>
          <View className="flex-row items-center mb-1">
            <MaterialCommunityIcons
              name="calendar"
              size={20}
              color={theme.colors.primary}
            />
            <Text className="ml-2">
              {profile.dateOfBirth
                ? new Date(profile.dateOfBirth).toLocaleDateString()
                : "No birth date set"}
            </Text>
          </View>
          <Text className="mt-2">
            {profile.profileDescription || "No description available."}
          </Text>
        </View>

        <View className="flex-row justify-around p-5">
          <View className="items-center">
            <Text className="text-xl font-bold">{posts.length || 0}</Text>
            <Text className="text-gray-600">Posts</Text>
          </View>
          <View className="items-center">
            <Text className="text-xl font-bold">
              {profile.postsOrComments?.length || 0}
            </Text>
            <Text className="text-gray-600">Activities</Text>
          </View>
        </View>

        <Button
          mode="contained"
          icon="pencil"
          onPress={() => setEditModalVisible(true)}
          className="mx-5 mb-5 "
        >
          Edit Profile
        </Button>

        <View className="p-5">
          <Text className="text-xl font-bold mb-2">Popular Tags</Text>
          <View className="flex-row flex-wrap">
            {Object.entries(profile.postTags || {})
              .slice(0, 6)
              .map(([tag, count]) => (
                <Chip key={tag} className="m-1">{`${tag} (${count})`}</Chip>
              ))}
          </View>
        </View>

        <Divider className="my-2" />

        <View className="p-5 pb-20">
          <Text className="text-xl font-bold mb-2">User Posts</Text>
          {posts.length > 0 ? (
            posts.map(renderPostCard)
          ) : (
            <Text>No posts available</Text>
          )}
        </View>
      </ScrollView>

      <EditProfileModal
        visible={editModalVisible}
        onDismiss={() => setEditModalVisible(false)}
        profile={profile}
        onProfileUpdate={handleProfileUpdate}
      />
    </>
  );
};

export default ProfilePage;
