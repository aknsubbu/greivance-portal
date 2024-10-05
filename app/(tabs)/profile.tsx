import React from "react";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import {
  Text,
  Avatar,
  Button,
  Chip,
  Card,
  Divider,
  useTheme,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Profile from "@/interfaces/Profile";

const ProfilePage: React.FC = () => {
  const theme = useTheme();

  // Mock profile data
  const profile: Profile = {
    _id: "1",
    name: "John Doe",
    dateOfBirth: new Date("1990-01-01"),
    aadharNumber: 123456789012,
    userName: "johndoe",
    password: "hashedpassword",
    location: "Chennai, Tamil Nadu",
    tag: "Developer",
    profilePicture: "https://example.com/profile.jpg",
    profileDescription: "Passionate developer and tech enthusiast.",
    noOfPosts: 42,
    postsOrComments: [
      {
        _id: "1",
        type: "post",
        content: "Just launched my new app!",
        createdAt: new Date("2023-06-01"),
      },
      {
        _id: "2",
        type: "comment",
        content: "Great article, thanks for sharing!",
        createdAt: new Date("2023-05-28"),
      },
      {
        _id: "3",
        type: "post",
        content: "Working on an exciting new project. Stay tuned!",
        createdAt: new Date("2023-05-25"),
      },
      {
        _id: "4",
        type: "comment",
        content: "This is a game-changer. Well done!",
        createdAt: new Date("2023-05-20"),
      },
      {
        _id: "5",
        type: "post",
        content: "Just attended an amazing tech conference. Learned so much!",
        createdAt: new Date("2023-05-15"),
      },
    ],
    blockedUsers: [],
    postTags: { react: 10, javascript: 8, mobile: 5, web: 3, design: 2 },
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-06-01"),
  };

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
    >
      <View style={styles.header}>
        {profile.profilePicture ? (
          <Image
            source={{ uri: profile.profilePicture }}
            style={styles.profileImage}
          />
        ) : (
          <Avatar.Text size={120} label={profile.name[0]} />
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
          <Text style={styles.infoText}>{profile.location}</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialCommunityIcons
            name="calendar"
            size={20}
            color={theme.colors.primary}
          />
          <Text style={styles.infoText}>
            {profile.dateOfBirth.toLocaleDateString()}
          </Text>
        </View>
        <Text style={styles.description}>
          {profile.profileDescription || "No description available."}
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{profile.noOfPosts}</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {profile.postsOrComments.length}
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
          {Object.entries(profile.postTags)
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
        {profile.postsOrComments.map(renderActivity)}
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
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
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
});

export default ProfilePage;
