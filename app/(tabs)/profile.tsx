// import React, { useState, useEffect, useCallback } from "react";
// import { View, ScrollView, Image, RefreshControl } from "react-native";
// import {
//   Text,
//   Avatar,
//   Button,
//   Chip,
//   Card,
//   Divider,
//   useTheme,
//   ActivityIndicator,
// } from "react-native-paper";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import Profile from "@/interfaces/Profile";
// import Post from "@/interfaces/Post";
// import EditProfileModal from "@/components/EditProfile";

// import { getProfileFromStorage } from "@/functions/profileAsyncStorage";
// import { getPostsByUsername } from "@/functions/postFunctions";

// const ProfilePage: React.FC = () => {
//   const theme = useTheme();
//   const [profile, setProfile] = useState<Profile | null>(null);
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [editModalVisible, setEditModalVisible] = useState(false);

//   const fetchProfileData = useCallback(async () => {
//     try {
//       const profileData = await getProfileFromStorage();
//       setProfile(profileData);

//       if (profileData?.userName) {
//         const postsData = await getPostsByUsername(profileData.userName);
//         setPosts(postsData);
//         console.log(posts);
//       }
//     } catch (err) {
//       setError("Failed to fetch profile data");
//       console.error(err);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchProfileData();
//   }, [fetchProfileData]);

//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     fetchProfileData();
//   }, [fetchProfileData]);

//   const handleProfileUpdate = (updatedProfile: Profile) => {
//     setProfile(updatedProfile);
//   };

//   if (loading) {
//     return (
//       <View className="flex-1 justify-center items-center">
//         <ActivityIndicator size="large" color={theme.colors.primary} />
//       </View>
//     );
//   }

//   if (error || !profile) {
//     return (
//       <ScrollView
//         className="flex-1 bg-white pt-10"
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             colors={[theme.colors.primary]}
//           />
//         }
//       >
//         <View className="flex-1 justify-center items-center p-5">
//           <Text>{error || "Failed to load profile"}</Text>
//         </View>
//       </ScrollView>
//     );
//   }

//   const renderActivity = (item: Profile["postsOrComments"][0]) => (
//     <Card className="mb-4" key={item._id}>
//       <Card.Title
//         title={item.type === "post" ? "Posted" : "Commented"}
//         subtitle={new Date(item.createdAt).toLocaleDateString()}
//         left={(props) => (
//           <Avatar.Icon
//             {...props}
//             icon={item.type === "post" ? "post" : "comment-text-outline"}
//           />
//         )}
//       />
//       <Card.Content>
//         <Text numberOfLines={2}>{item.content}</Text>
//       </Card.Content>
//     </Card>
//   );

//   const renderPostCard = (post: Post) => (
//     <Card className="mb-4" key={post._id}>
//       <Card.Title
//         title={post.postTitle}
//         subtitle={new Date(post.postDate).toLocaleDateString()}
//         className="m-1"
//       />
//       {post.postImage && (
//         <Card.Cover source={{ uri: post.postImage }} className="m-2" />
//       )}
//       <Card.Content className="mt-5">
//         <Text numberOfLines={3} className="mb-2">
//           {post.postDescription}
//         </Text>
//         <View className="flex-row justify-around">
//           <View className="flex-row items-center">
//             <MaterialCommunityIcons
//               name="heart"
//               size={20}
//               color={theme.colors.primary}
//             />
//             <Text className="ml-1">{post.postLikes.length}</Text>
//           </View>
//           <View className="flex-row items-center">
//             <MaterialCommunityIcons
//               name="eye"
//               size={20}
//               color={theme.colors.primary}
//             />
//             <Text className="ml-1">{post.postViewCounter}</Text>
//           </View>
//           <View className="flex-row items-center">
//             <MaterialCommunityIcons
//               name="comment"
//               size={20}
//               color={theme.colors.primary}
//             />
//             <Text className="ml-1">{post.postComments.length}</Text>
//           </View>
//         </View>
//       </Card.Content>
//     </Card>
//   );

//   return (
//     <>
//       <ScrollView
//         className="flex-1 bg-white pt-10"
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             colors={[theme.colors.primary]}
//           />
//         }
//       >
//         <View className="items-center p-5">
//           {profile.profilePicture ? (
//             <Image
//               source={{
//                 uri: `data:image/jpeg;base64,${profile.profilePicture}`,
//               }}
//               className="rounded-full w-30 h-30"
//               width={120}
//               height={120}
//             />
//           ) : (
//             <Avatar.Text size={120} label={profile.name[0] || "U"} />
//           )}
//           <Text className="text-2xl font-bold mt-2">{profile.name}</Text>
//           <Chip icon="account" className="mt-2">
//             {profile.userName || "No tag"}
//           </Chip>
//         </View>

//         <View className="p-5">
//           <Text className="text-xl font-bold mb-2">About</Text>
//           <View className="flex-row items-center mb-1">
//             <MaterialCommunityIcons
//               name="map-marker"
//               size={20}
//               color={theme.colors.primary}
//             />
//             <Text className="ml-2">
//               {profile.location || "No location set"}
//             </Text>
//           </View>
//           <View className="flex-row items-center mb-1">
//             <MaterialCommunityIcons
//               name="calendar"
//               size={20}
//               color={theme.colors.primary}
//             />
//             <Text className="ml-2">
//               {profile.dateOfBirth
//                 ? new Date(profile.dateOfBirth).toLocaleDateString()
//                 : "No birth date set"}
//             </Text>
//           </View>
//           <Text className="mt-2">
//             {profile.profileDescription || "No description available."}
//           </Text>
//         </View>

//         <View className="flex-row justify-around p-5">
//           <View className="items-center">
//             <Text className="text-xl font-bold">{posts.length || 0}</Text>
//             <Text className="text-gray-600">Posts</Text>
//           </View>
//           <View className="items-center">
//             <Text className="text-xl font-bold">
//               {profile.postsOrComments?.length || 0}
//             </Text>
//             <Text className="text-gray-600">Activities</Text>
//           </View>
//         </View>

//         <Button
//           mode="contained"
//           icon="pencil"
//           onPress={() => setEditModalVisible(true)}
//           className="mx-5 mb-5 "
//         >
//           Edit Profile
//         </Button>

//         <View className="p-5">
//           <Text className="text-xl font-bold mb-2">Popular Tags</Text>
//           <View className="flex-row flex-wrap">
//             {Object.entries(profile.postTags || {})
//               .slice(0, 6)
//               .map(([tag, count]) => (
//                 <Chip key={tag} className="m-1">{`${tag} (${count})`}</Chip>
//               ))}
//           </View>
//         </View>

//         <Divider className="my-2" />

//         <View className="p-5 pb-20">
//           <Text className="text-xl font-bold mb-2">User Posts</Text>
//           {posts.length > 0 ? (
//             posts.map(renderPostCard)
//           ) : (
//             <Text>No posts available</Text>
//           )}
//         </View>
//       </ScrollView>

//       <EditProfileModal
//         visible={editModalVisible}
//         onDismiss={() => setEditModalVisible(false)}
//         profile={profile}
//         onProfileUpdate={handleProfileUpdate}
//       />
//     </>
//   );
// };

// export default ProfilePage;

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  Image,
  RefreshControl,
  StyleSheet,
} from "react-native";
import {
  Text,
  Avatar,
  Button,
  Chip,
  Card,
  Divider,
  useTheme,
  ActivityIndicator,
  Surface,
  IconButton,
  MD3Theme,
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
  const [postsLoading, setPostsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const styles = createStyles(theme);

  const fetchProfileData = useCallback(async () => {
    try {
      setError(null);
      const profileData = await getProfileFromStorage();

      if (!profileData) {
        setError("Profile not found");
        return;
      }

      setProfile(profileData);

      if (profileData?.userName) {
        setPostsLoading(true);
        try {
          const postsData = await getPostsByUsername(profileData.userName);
          setPosts(postsData);
        } catch (postErr) {
          console.error("Error fetching posts:", postErr);
          // Don't set error state to allow profile to display even if posts fail
        } finally {
          setPostsLoading(false);
        }
      }
    } catch (err) {
      setError("Failed to fetch profile data");
      console.error("Profile fetch error:", err);
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error || !profile) {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.centerContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
          />
        }
      >
        <Surface style={styles.errorSurface} elevation={1}>
          <MaterialCommunityIcons
            name="alert-circle-outline"
            size={36}
            color={theme.colors.error}
          />
          <Text style={styles.errorText}>
            {error || "Failed to load profile"}
          </Text>
          <Button
            mode="contained"
            onPress={onRefresh}
            style={styles.retryButton}
          >
            Retry
          </Button>
        </Surface>
      </ScrollView>
    );
  }

  const renderPostCard = (post: Post) => (
    <Card style={styles.card} key={post._id}>
      <Card.Title
        title={post.postTitle}
        titleStyle={styles.cardTitle}
        subtitle={new Date(post.postDate).toLocaleDateString()}
        subtitleStyle={styles.cardSubtitle}
      />
      {post.postImage && (
        <Card.Cover source={{ uri: post.postImage }} style={styles.cardImage} />
      )}
      <Card.Content style={styles.cardContent}>
        <Text numberOfLines={3} style={styles.descriptionText}>
          {post.postDescription}
        </Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <MaterialCommunityIcons
              name="heart"
              size={20}
              color={theme.colors.primary}
            />
            <Text style={styles.statText}>{post.postLikes.length}</Text>
          </View>
          <View style={styles.statItem}>
            <MaterialCommunityIcons
              name="eye"
              size={20}
              color={theme.colors.primary}
            />
            <Text style={styles.statText}>{post.postViewCounter}</Text>
          </View>
          <View style={styles.statItem}>
            <MaterialCommunityIcons
              name="comment"
              size={20}
              color={theme.colors.primary}
            />
            <Text style={styles.statText}>{post.postComments.length}</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
          />
        }
      >
        <Surface style={styles.headerSurface} elevation={1}>
          <View style={styles.profileImageContainer}>
            {profile.profilePicture ? (
              <Image
                source={{
                  uri: `data:image/jpeg;base64,${profile.profilePicture}`,
                }}
                style={styles.profileImage}
                width={120}
                height={120}
              />
            ) : (
              <Avatar.Text
                size={120}
                label={profile.name[0] || "U"}
                color={theme.colors.onPrimary}
                style={styles.avatarText}
              />
            )}
          </View>

          <Text style={styles.profileName}>{profile.name}</Text>
          <Chip
            icon="account"
            style={styles.usernameChip}
            textStyle={styles.chipText}
          >
            {profile.userName || "No username"}
          </Chip>

          <Button
            mode="contained"
            icon="pencil"
            onPress={() => setEditModalVisible(true)}
            style={styles.editButton}
            labelStyle={styles.editButtonLabel}
          >
            Edit Profile
          </Button>
        </Surface>

        <Surface style={styles.section} elevation={1}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons
              name="map-marker"
              size={20}
              color={theme.colors.primary}
            />
            <Text style={styles.infoText}>
              {profile.location || "No location set"}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons
              name="calendar"
              size={20}
              color={theme.colors.primary}
            />
            <Text style={styles.infoText}>
              {profile.dateOfBirth
                ? new Date(profile.dateOfBirth).toLocaleDateString()
                : "No birth date set"}
            </Text>
          </View>
          <Text style={styles.descriptionText}>
            {profile.profileDescription || "No description available."}
          </Text>
        </Surface>

        <Surface style={styles.statsSection} elevation={1}>
          <View style={styles.statBlock}>
            <Text style={styles.statCount}>{posts.length || 0}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <Divider style={styles.verticalDivider} />
          <View style={styles.statBlock}>
            <Text style={styles.statCount}>
              {profile.postsOrComments?.length || 0}
            </Text>
            <Text style={styles.statLabel}>Activities</Text>
          </View>
        </Surface>

        <Surface style={styles.section} elevation={1}>
          <Text style={styles.sectionTitle}>Popular Tags</Text>
          <View style={styles.tagsContainer}>
            {Object.entries(profile.postTags || {}).length > 0 ? (
              Object.entries(profile.postTags || {})
                .slice(0, 6)
                .map(([tag, count]) => (
                  <Chip
                    key={tag}
                    style={styles.tagChip}
                    textStyle={styles.chipText}
                  >
                    {`${tag} (${count})`}
                  </Chip>
                ))
            ) : (
              <Text style={styles.noContentText}>No tags available</Text>
            )}
          </View>
        </Surface>

        <Surface style={[styles.section, styles.postsSection]} elevation={1}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>User Posts</Text>
            {postsLoading && (
              <ActivityIndicator size="small" color={theme.colors.primary} />
            )}
          </View>

          {posts.length > 0 ? (
            posts.map(renderPostCard)
          ) : (
            <View style={styles.emptyStateContainer}>
              <MaterialCommunityIcons
                name="post-outline"
                size={48}
                color={theme.colors.onSurfaceDisabled}
              />
              <Text style={styles.noContentText}>
                {postsLoading ? "Loading posts..." : "No posts available"}
              </Text>
            </View>
          )}
        </Surface>
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

// Move styles to a separate function to use theme values
const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 25,
      backgroundColor: theme.colors.background,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.background,
    },
    centerContent: {
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
    },
    errorSurface: {
      padding: 24,
      borderRadius: 8,
      alignItems: "center",
      backgroundColor: theme.colors.errorContainer,
      width: "80%",
    },
    errorText: {
      color: theme.colors.error,
      marginTop: 12,
      textAlign: "center",
      fontSize: 16,
    },
    retryButton: {
      marginTop: 16,
      backgroundColor: theme.colors.primary,
    },
    headerSurface: {
      padding: 24,
      alignItems: "center",
      backgroundColor: theme.colors.elevation.level1,
      marginBottom: 12,
      borderRadius: 0,
    },
    profileImageContainer: {
      marginBottom: 16,
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 3,
      borderColor: theme.colors.primary,
    },
    avatarText: {
      backgroundColor: theme.colors.primary,
    },
    profileName: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.colors.onSurface,
      marginBottom: 8,
    },
    usernameChip: {
      backgroundColor: theme.colors.primaryContainer,
      marginBottom: 16,
    },
    chipText: {
      color: theme.colors.onPrimaryContainer,
    },
    section: {
      padding: 16,
      backgroundColor: theme.colors.surface,
      marginBottom: 12,
      borderRadius: 8,
      marginHorizontal: 12,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.colors.onSurface,
      marginBottom: 12,
    },
    infoRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
    infoText: {
      marginLeft: 8,
      color: theme.colors.onSurface,
      fontSize: 16,
    },
    descriptionText: {
      color: theme.colors.onSurfaceVariant,
      fontSize: 16,
      marginTop: 8,
      lineHeight: 22,
    },
    statsSection: {
      flexDirection: "row",
      marginBottom: 12,
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 8,
      marginHorizontal: 12,
      backgroundColor: theme.colors.elevation.level1,
    },
    statBlock: {
      flex: 1,
      alignItems: "center",
    },
    statCount: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.colors.onSurface,
    },
    statLabel: {
      fontSize: 14,
      color: theme.colors.onSurfaceVariant,
    },
    verticalDivider: {
      height: "80%",
      width: 1,
      backgroundColor: theme.colors.outlineVariant,
      alignSelf: "center",
    },
    tagsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    tagChip: {
      margin: 4,
      backgroundColor: theme.colors.secondaryContainer,
    },
    editButton: {
      marginTop: 8,
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 24,
    },
    editButtonLabel: {
      fontSize: 14,
      fontWeight: "bold",
    },
    postsSection: {
      marginBottom: 24,
    },
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    card: {
      marginBottom: 16,
      backgroundColor: theme.colors.elevation.level1,
      borderRadius: 8,
    },
    cardTitle: {
      color: theme.colors.onSurface,
      fontWeight: "bold",
    },
    cardSubtitle: {
      color: theme.colors.onSurfaceVariant,
    },
    cardImage: {
      borderRadius: 0,
      marginHorizontal: 8,
    },
    cardContent: {
      paddingTop: 16,
    },
    statsContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginTop: 16,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: theme.colors.outlineVariant,
    },
    statItem: {
      flexDirection: "row",
      alignItems: "center",
    },
    statText: {
      marginLeft: 4,
      color: theme.colors.onSurfaceVariant,
    },
    noContentText: {
      color: theme.colors.onSurfaceVariant,
      textAlign: "center",
      marginTop: 8,
    },
    emptyStateContainer: {
      alignItems: "center",
      padding: 24,
    },
  });

export default ProfilePage;
