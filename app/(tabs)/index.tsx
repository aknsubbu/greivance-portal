// import React, { useState, useEffect, useCallback } from "react";
// import {
//   View,
//   ScrollView,
//   SafeAreaView,
//   Text,
//   RefreshControl,
//   Image,
// } from "react-native";
// import {
//   Avatar,
//   Button,
//   Chip,
//   Card,
//   Divider,
//   useTheme,
//   ActivityIndicator,
// } from "react-native-paper";
// import { Bell } from "lucide-react-native";
// import PostCard from "@/components/PostCard";
// import Post from "@/interfaces/Post";
// import Profile from "@/interfaces/Profile";
// import { getAllPosts } from "@/functions/postFunctions";
// import { getProfileFromStorage } from "@/functions/profileAsyncStorage";

// export default function HomeScreen() {
//   const theme = useTheme();
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [profile, setProfile] = useState<Profile | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   const loadData = useCallback(async () => {
//     try {
//       const [fetchedProfile] = await Promise.all([getProfileFromStorage()]);
//       setProfile(fetchedProfile);

//       const [fetchedPosts] = await Promise.all([getAllPosts()]);
//       setPosts(fetchedPosts);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadData();
//   }, [loadData]);

//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     loadData();
//   }, [loadData]);

//   if (loading) {
//     return (
//       <View className="flex-1 justify-center items-center">
//         <ActivityIndicator size="large" color={theme.colors.primary} />
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView className="flex-1 bg-[#EEEEEE]">
//       <View className="flex-row justify-between items-center px-4 py-2 bg-[#EEEEEE]">
//         <View className="items-center flex flex-row ">
//           {profile?.profilePicture ? (
//             <View className="flex flex-row justify-start items-center gap-4">
//               <Image
//                 source={{
//                   uri: `data:image/jpeg;base64,${profile.profilePicture}`,
//                 }}
//                 className="rounded-full w-15 h-315"
//                 width={60}
//                 height={60}
//               />
//               <Text className="text-2xl font-light">{profile?.name}</Text>
//             </View>
//           ) : (
//             <Avatar.Text size={120} label={profile?.name[0] || "U"} />
//           )}
//         </View>
//         <View>
//           <Bell size={24} color="#63519f" />
//         </View>
//       </View>
//       <ScrollView
//         className="flex-1"
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             colors={["#201E43"]}
//           />
//         }
//       >
//         <View className="p-4">
//           {loading ? (
//             <Text className="text-center text-gray-600 dark:text-gray-400">
//               Loading posts...
//             </Text>
//           ) : posts.length > 0 ? (
//             posts.map((post) => (
//               <View key={post._id} className="mb-4">
//                 <PostCard post={post} />
//               </View>
//             ))
//           ) : (
//             <Text className="text-center text-gray-600 dark:text-gray-400">
//               No posts available.
//             </Text>
//           )}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  Text,
  RefreshControl,
  Image,
  StyleSheet,
  StatusBar,
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: theme.colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.outlineVariant,
      elevation: 2,
    },
    profileContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
    },
    profileImage: {
      width: 60,
      height: 60,
      borderRadius: 30,
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },
    userName: {
      fontSize: 24,
      color: theme.colors.onSurface,
      fontWeight: "300",
    },
    scrollView: {
      flex: 1,
    },
    contentContainer: {
      padding: 16,
    },
    postContainer: {
      marginBottom: 16,
    },
    emptyText: {
      textAlign: "center",
      color: theme.colors.onSurfaceVariant,
      marginTop: 32,
    },
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={theme.colors.surface}
        barStyle="dark-content"
      />

      <View style={styles.header}>
        <View style={styles.profileContainer}>
          {profile?.profilePicture ? (
            <Image
              source={{
                uri: `data:image/jpeg;base64,${profile.profilePicture}`,
              }}
              style={styles.profileImage}
            />
          ) : (
            <Avatar.Text
              size={60}
              label={profile?.name?.[0] || "U"}
              color={theme.colors.onPrimary}
              style={{ backgroundColor: theme.colors.primary }}
            />
          )}
          <Text style={styles.userName}>{profile?.name}</Text>
        </View>

        <Bell size={24} color={theme.colors.primary} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
      >
        <View>
          {loading ? (
            <Text style={styles.emptyText}>Loading posts...</Text>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <View key={post._id} style={styles.postContainer}>
                <PostCard post={post} />
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No posts available.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
