import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TextInput,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Button, Text, IconButton, Chip } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { createPost } from "@/functions/postFunctions";
import { getProfileFromStorage } from "@/functions/profileAsyncStorage";
import { useLocation } from "@/hooks/useLocation";
import Profile from "@/interfaces/Profile";

const AddPost = () => {
  const navigation = useNavigation();
  const locationState = useLocation();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [imageType, setImageType] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProfileFromStorage().then(setProfile);
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImageType(result.assets[0].type || "image/jpeg");
    }
  };

  const handleCreatePost = async () => {
    if (!profile) {
      Alert.alert("Error", "You must be logged in to create a post.");
      return;
    }

    setLoading(true);
    try {
      const newPost = {
        postTitle: title || "Untitled",
        postDescription: description,
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
      navigation.goBack();
    } catch (err) {
      Alert.alert("Error", "Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTagInput = (text: string) => {
    setCurrentTag(text);
    if (text.endsWith(" ") && text.trim() !== "") {
      setTags([...tags, text.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <View className="flex-row justify-between items-center p-4 border-b border-gray-200 pt-10">
        <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
        <Text className="text-lg font-bold">Create New Post</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView className="flex-1 p-4 pt-5 pb-5">
        <Chip className="text-sm font-light mb-2" icon="google-maps">
          You are at: {locationState.latitude},{locationState.longitude}
        </Chip>
        <Button onPress={pickImage} mode="outlined" className="mb-4">
          {image ? "Change Image" : "Select Image"}
        </Button>
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: "100%", height: 200, marginBottom: 16 }}
            resizeMode="cover"
          />
        )}
        <TextInput
          className="p-4 border border-gray-900 rounded-xl mb-4"
          value={title}
          onChangeText={setTitle}
          placeholder="Enter title..."
        />
        <TextInput
          className="p-4 border border-gray-900 rounded-xl mb-4"
          value={description}
          onChangeText={setDescription}
          placeholder="Write a description..."
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />
        <View className="mb-4">
          <TextInput
            className="p-4 border border-gray-900 rounded-xl"
            value={currentTag}
            onChangeText={handleTagInput}
            placeholder="Add tags (space-separated)"
          />
          <View className="flex-row flex-wrap mt-2">
            {tags.map((tag, index) => (
              <Chip key={index} onClose={() => removeTag(tag)} className="m-1">
                {tag}
              </Chip>
            ))}
          </View>
        </View>
        <Button
          mode="contained"
          buttonColor="#201E43"
          onPress={handleCreatePost}
          loading={loading}
          disabled={loading || !profile}
          className="mt-4"
        >
          Create Post
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddPost;
