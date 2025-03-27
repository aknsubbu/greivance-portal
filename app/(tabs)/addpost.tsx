// import React, { useState, useEffect } from "react";
// import {
//   View,
//   ScrollView,
//   TextInput,
//   Image,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import { Button, Text, IconButton, Chip } from "react-native-paper";
// import * as ImagePicker from "expo-image-picker";
// import { useNavigation } from "@react-navigation/native";
// import { createPost } from "@/functions/postFunctions";
// import { getProfileFromStorage } from "@/functions/profileAsyncStorage";
// import { useLocation } from "@/hooks/useLocation";
// import Profile from "@/interfaces/Profile";

// const AddPost = () => {
//   const navigation = useNavigation();
//   const locationState = useLocation();

//   const [profile, setProfile] = useState<Profile | null>(null);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState<string | null>(null);
//   const [imageType, setImageType] = useState<string | null>(null);
//   const [tags, setTags] = useState<string[]>([]);
//   const [currentTag, setCurrentTag] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     getProfileFromStorage().then(setProfile);
//   }, []);

//   const pickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//       base64: true,
//     });

//     if (!result.canceled && result.assets[0].base64) {
//       setImage(result.assets[0].base64);
//       setImageType(result.assets[0].type || "image/jpeg");
//     }
//   };

//   const handleCreatePost = async () => {
//     if (!profile) {
//       Alert.alert("Error", "You must be logged in to create a post.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const newPost = {
//         postTitle: title || "Untitled",
//         postDescription: description,
//         postImage: image || "",
//         postImageType: imageType || "",
//         postDate: new Date(),
//         postAuthor: profile._id,
//         postComments: [],
//         postLikes: [],
//         postDislikes: [],
//         postTags: tags,
//         postLocation:
//           locationState.latitude && locationState.longitude
//             ? [locationState.latitude, locationState.longitude]
//             : [],
//         postView: [profile._id],
//         postViewCounter: 1,
//       };

//       await createPost(newPost);
//       Alert.alert("Success", "Post created successfully!");
//       navigation.goBack();
//     } catch (err) {
//       Alert.alert("Error", "Failed to create post. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTagInput = (text: string) => {
//     setCurrentTag(text);
//     if (text.endsWith(" ") && text.trim() !== "") {
//       setTags([...tags, text.trim()]);
//       setCurrentTag("");
//     }
//   };

//   const removeTag = (tagToRemove: string) => {
//     setTags(tags.filter((tag) => tag !== tagToRemove));
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       className="flex-1 bg-white"
//     >
//       <View className="flex-row justify-between items-center p-4 border-b border-gray-200 pt-10">
//         <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
//         <Text className="text-lg font-bold">Create New Post</Text>
//         <View style={{ width: 40 }} />
//       </View>
//       <ScrollView className="flex-1 p-4 pt-5 pb-5">
//         <Chip className="text-sm font-light mb-2" icon="google-maps">
//           You are at: {locationState.latitude},{locationState.longitude}
//         </Chip>
//         <Button onPress={pickImage} mode="outlined" className="mb-4">
//           {image ? "Change Image" : "Select Image"}
//         </Button>
//         {image && (
//           <Image
//             source={{ uri: image }}
//             style={{ width: "100%", height: 200, marginBottom: 16 }}
//             resizeMode="cover"
//           />
//         )}
//         <TextInput
//           className="p-4 border border-gray-900 rounded-xl mb-4"
//           value={title}
//           onChangeText={setTitle}
//           placeholder="Enter title..."
//         />
//         <TextInput
//           className="p-4 border border-gray-900 rounded-xl mb-4"
//           value={description}
//           onChangeText={setDescription}
//           placeholder="Write a description..."
//           multiline
//           numberOfLines={6}
//           textAlignVertical="top"
//         />
//         <View className="mb-4">
//           <TextInput
//             className="p-4 border border-gray-900 rounded-xl"
//             value={currentTag}
//             onChangeText={handleTagInput}
//             placeholder="Add tags (space-separated)"
//           />
//           <View className="flex-row flex-wrap mt-2">
//             {tags.map((tag, index) => (
//               <Chip key={index} onClose={() => removeTag(tag)} className="m-1">
//                 {tag}
//               </Chip>
//             ))}
//           </View>
//         </View>
//         <Button
//           mode="contained"
//           buttonColor="#201E43"
//           onPress={handleCreatePost}
//           loading={loading}
//           disabled={loading || !profile}
//           className="mt-4 mb-20"
//         >
//           Create Post
//         </Button>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// export default AddPost;
import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TextInput,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  StatusBar,
} from "react-native";
import {
  Button,
  Text,
  IconButton,
  Chip,
  useTheme,
  Surface,
  Divider,
  ActivityIndicator,
} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { createPost } from "@/functions/postFunctions";
import { getProfileFromStorage } from "@/functions/profileAsyncStorage";
import { useLocation } from "@/hooks/useLocation";
import Profile from "@/interfaces/Profile";

const AddPost = () => {
  const router = useRouter();
  const locationState = useLocation();
  const theme = useTheme();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [imageType, setImageType] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);

  // Create styles with the theme
  const styles = createStyles(theme);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setProfileLoading(true);
        const profileData = await getProfileFromStorage();
        setProfile(profileData);
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setProfileLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8, // Reduced for better performance
        base64: true,
      });

      if (!result.canceled && result.assets[0]?.base64) {
        setImage(result.assets[0].base64);
        setImageType(result.assets[0].type || "image/jpeg");
      }
    } catch (error) {
      console.error("Image picker error:", error);
      Alert.alert("Error", "Failed to select image. Please try again.");
    }
  };

  const handleCreatePost = async () => {
    if (!profile) {
      Alert.alert("Error", "You must be logged in to create a post.");
      return;
    }

    if (!title.trim()) {
      Alert.alert("Error", "Please enter a title for your post.");
      return;
    }

    setLoading(true);
    try {
      const newPost = {
        postTitle: title.trim() || "Untitled",
        postDescription: description.trim(),
        postImage: image || "",
        postImageType: imageType || "",
        postDate: new Date(),
        postAuthor: profile._id,
        postComments: [],
        postLikes: [],
        postDislikes: [],
        postTags: tags,
        postLocation:
          locationState.latitude && locationState.longitude
            ? [locationState.latitude, locationState.longitude]
            : [],
        postView: [profile._id],
        postViewCounter: 1,
      };

      await createPost(newPost);
      Alert.alert("Success", "Post created successfully!");
      router.back();
    } catch (err) {
      console.error("Create post error:", err);
      Alert.alert("Error", "Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTagInput = (text: string) => {
    setCurrentTag(text);
    if (text.endsWith(" ") && text.trim() !== "") {
      // Check if tag already exists
      if (!tags.includes(text.trim())) {
        setTags([...tags, text.trim()]);
      }
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  if (profileLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle="dark-content"
      />

      {/* Header */}
      <Surface style={styles.header} elevation={1}>
        <IconButton
          icon="arrow-left"
          iconColor={theme.colors.onSurface}
          size={24}
          onPress={() => router.back()}
          style={styles.backButton}
        />
        <Text variant="titleLarge" style={styles.headerTitle}>
          Create New Post
        </Text>
        <View style={styles.headerSpacer} />
      </Surface>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Location info */}
        {locationState.latitude && locationState.longitude && (
          <Chip
            icon="map-marker"
            style={styles.locationChip}
            textStyle={styles.chipText}
          >
            {locationState.latitude.toFixed(6)},{" "}
            {locationState.longitude.toFixed(6)}
          </Chip>
        )}

        {/* Image picker */}
        <Surface style={styles.section} elevation={1}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Post Image
          </Text>
          <Divider style={styles.divider} />

          <Button
            mode="outlined"
            icon="image"
            onPress={pickImage}
            style={styles.imageButton}
            contentStyle={styles.buttonContent}
          >
            {image ? "Change Image" : "Select Image"}
          </Button>

          {image && (
            <Image
              source={{ uri: `data:${imageType};base64,${image}` }}
              style={styles.imagePreview}
              resizeMode="cover"
            />
          )}
        </Surface>

        {/* Post details */}
        <Surface style={styles.section} elevation={1}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Post Details
          </Text>
          <Divider style={styles.divider} />

          <Text variant="labelLarge" style={styles.inputLabel}>
            Title
          </Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter a compelling title..."
            placeholderTextColor={theme.colors.onSurfaceDisabled}
            maxLength={100}
          />

          <Text variant="labelLarge" style={styles.inputLabel}>
            Description
          </Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Write a detailed description of your post..."
            placeholderTextColor={theme.colors.onSurfaceDisabled}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        </Surface>

        {/* Tags */}
        <Surface style={styles.section} elevation={1}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Tags
          </Text>
          <Divider style={styles.divider} />

          <TextInput
            style={styles.input}
            value={currentTag}
            onChangeText={handleTagInput}
            placeholder="Add tags (space-separated)"
            placeholderTextColor={theme.colors.onSurfaceDisabled}
          />

          <View style={styles.tagsContainer}>
            {tags.length > 0 ? (
              tags.map((tag, index) => (
                <Chip
                  key={index}
                  onClose={() => removeTag(tag)}
                  style={styles.tag}
                  textStyle={styles.tagText}
                >
                  {tag}
                </Chip>
              ))
            ) : (
              <Text style={styles.emptyTagsText}>
                No tags added yet. Tags help others discover your post.
              </Text>
            )}
          </View>
        </Surface>

        {/* Submit button */}
        <Button
          mode="contained"
          onPress={handleCreatePost}
          loading={loading}
          disabled={loading || !profile || !title.trim()}
          style={styles.submitButton}
          contentStyle={styles.submitButtonContent}
        >
          {loading ? "Creating Post..." : "Create Post"}
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Create styles with theme to ensure consistent theming
const createStyles = (theme: any) =>
  StyleSheet.create({
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
    loadingText: {
      marginTop: 16,
      color: theme.colors.onSurface,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: 50, // Adjust for status bar
      paddingBottom: 16,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.surface,
    },
    backButton: {
      margin: 0,
    },
    headerTitle: {
      color: theme.colors.onSurface,
      fontWeight: "bold",
    },
    headerSpacer: {
      width: 40,
    },
    scrollView: {
      flex: 1,
    },
    contentContainer: {
      padding: 16,
      paddingBottom: 32,
    },
    section: {
      marginBottom: 16,
      padding: 16,
      borderRadius: 8,
      backgroundColor: theme.colors.surface,
    },
    sectionTitle: {
      marginBottom: 8,
      color: theme.colors.onSurface,
      fontWeight: "bold",
    },
    divider: {
      marginBottom: 16,
      backgroundColor: theme.colors.outlineVariant,
    },
    locationChip: {
      marginBottom: 16,
      backgroundColor: theme.colors.secondaryContainer,
    },
    chipText: {
      color: theme.colors.onSecondaryContainer,
    },
    imageButton: {
      marginBottom: Image ? 16 : 0,
      borderColor: theme.colors.primary,
    },
    buttonContent: {
      paddingVertical: 6,
    },
    imagePreview: {
      width: "100%",
      height: 200,
      borderRadius: 8,
      marginBottom: 8,
    },
    inputLabel: {
      marginBottom: 8,
      color: theme.colors.onSurface,
    },
    input: {
      backgroundColor: theme.colors.surfaceVariant,
      color: theme.colors.onSurface,
      borderRadius: 8,
      padding: 12,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: theme.colors.outline,
    },
    textArea: {
      minHeight: 120,
    },
    tagsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 8,
    },
    tag: {
      margin: 4,
      backgroundColor: theme.colors.primaryContainer,
    },
    tagText: {
      color: theme.colors.onPrimaryContainer,
    },
    emptyTagsText: {
      color: theme.colors.onSurfaceVariant,
      fontStyle: "italic",
      textAlign: "center",
      marginTop: 8,
    },
    submitButton: {
      marginTop: 16,
      marginBottom: 24,
      borderRadius: 8,
      backgroundColor: theme.colors.primary,
    },
    submitButtonContent: {
      paddingVertical: 8,
    },
  });

export default AddPost;
