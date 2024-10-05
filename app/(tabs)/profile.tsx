import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  RefreshControl,
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
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Profile from "@/interfaces/Profile";
import Post from "@/interfaces/Post";

import { getProfileFromStorage } from "@/functions/profileAsyncStorage";
import { getPostsByUsername } from "@/functions/postFunctions";

const ProfilePage: React.FC = () => {
  const theme = useTheme();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfileData = useCallback(async () => {
    try {
      const profileData = await getProfileFromStorage();
      setProfile(profileData);

      if (profileData?.userName) {
        const postsData = await getPostsByUsername(profileData.userName);
        setPosts(postsData);
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
        style={[styles.container, { backgroundColor: theme.colors.background }]}
        className="pt-10"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
          />
        }
      >
        <View style={styles.errorContainer}>
          <Text>{error || "Failed to load profile"}</Text>
        </View>
      </ScrollView>
    );
  }

  const renderActivity = (item: Profile["postsOrComments"][0]) => (
    <Card style={styles.activityCard} key={item._id}>
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

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      className="pt-10"
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[theme.colors.primary]}
        />
      }
    >
      <View style={styles.header}>
        {profile.profilePicture ? (
          <Image
            source={{ uri: `data:image/jpeg;base64,${profile.profilePicture}` }}
            className="rounded-full"
            width={120}
            height={120}
          />
        ) : (
          <Avatar.Text size={120} label={profile.name[0] || "U"} />
        )}
        <Text style={styles.name}>{profile.name}</Text>
        <Chip icon="tag" style={styles.tagChip}>
          {profile.tag || "No tag"}
        </Chip>
      </View>

      <View style={styles.section}>
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
        <Text style={styles.description}>
          {profile.profileDescription || "No description available."}
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{profile.noOfPosts || 0}</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {profile.postsOrComments?.length || 0}
          </Text>
          <Text style={styles.statLabel}>Activities</Text>
        </View>
      </View>

      <Button
        mode="contained"
        icon="pencil"
        onPress={() => console.log("Edit profile")}
        style={styles.editButton}
      >
        Edit Profile
      </Button>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Tags</Text>
        <View style={styles.tagsContainer}>
          {Object.entries(profile.postTags || {})
            .slice(0, 5)
            .map(([tag, count]) => (
              <Chip
                key={tag}
                style={styles.tagChip}
              >{`${tag} (${count})`}</Chip>
            ))}
        </View>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {profile.postsOrComments?.map(renderActivity) || (
          <Text>No recent activity</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  infoText: {
    marginLeft: 10,
  },
  description: {
    marginTop: 10,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
  },
  statLabel: {
    color: "gray",
  },
  editButton: {
    margin: 20,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tagChip: {
    margin: 5,
  },
  divider: {
    marginVertical: 10,
  },
  activityCard: {
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

export default ProfilePage;
