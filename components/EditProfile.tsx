import React, { useState } from "react";
import {
  View,
  Modal,
  ScrollView,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { updateProfile } from "@/functions/profileFunctions";
import { saveProfile } from "@/functions/profileAsyncStorage";
import { useLocation } from "@/hooks/useLocation";
import Profile from "@/interfaces/Profile";

interface EditProfileModalProps {
  visible: boolean;
  onDismiss: () => void;
  profile: Profile;
  onProfileUpdate: (updatedProfile: Profile) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  visible,
  onDismiss,
  profile,
  onProfileUpdate,
}) => {
  const [name, setName] = useState(profile.name);
  const [tag, setTag] = useState(profile.tag || "");
  const locationState = useLocation();
  const [dateOfBirth, setDateOfBirth] = useState(
    profile.dateOfBirth ? new Date(profile.dateOfBirth) : new Date()
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [profileDescription, setProfileDescription] = useState(
    profile.profileDescription || ""
  );
  const [profilePicture, setProfilePicture] = useState(
    profile.profilePicture || ""
  );
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result.assets[0].base64) {
      setProfilePicture(result.assets[0].base64);
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(Platform.OS === "ios");
    setDateOfBirth(currentDate);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const updatedProfileData = {
        ...profile,
        name,
        tag,
        location,
        dateOfBirth: dateOfBirth.toISOString(),
        profileDescription,
        profilePicture,
      };

      const updatedProfile = await updateProfile(
        profile._id,
        updatedProfileData
      );
      await saveProfile(updatedProfile);
      onProfileUpdate(updatedProfile);
      onDismiss();
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <ScrollView className="flex-1 bg-white pt-10 px-4">
        <Text className="text-2xl font-bold mb-4">Edit Profile</Text>

        <View className="items-center mb-4">
          {profilePicture ? (
            <Image
              source={{
                uri: `data:image/jpeg;base64,${profile.profilePicture}`,
              }}
              className="rounded-full w-30 h-30"
              width={120}
              height={120}
            />
          ) : (
            <View className="w-32 h-32 rounded-full bg-gray-300 items-center justify-center">
              <Text>No Image</Text>
            </View>
          )}
          <Button onPress={pickImage} mode="outlined" className="mt-2">
            Change Photo
          </Button>
        </View>

        <TextInput
          label="Name"
          value={name}
          onChangeText={setName}
          mode="outlined"
          className="mb-4"
        />
        <TextInput
          label="Tag"
          value={tag}
          onChangeText={setTag}
          mode="outlined"
          className="mb-4"
        />
        <TextInput
          label="Location"
          value={[locationState.latitude, locationState.longitude].join(", ")}
          mode="outlined"
          className="mb-4"
        />
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          className="mb-4"
        >
          <View pointerEvents="none">
            <TextInput
              label="Date of Birth"
              value={dateOfBirth.toDateString()}
              mode="outlined"
              editable={false}
            />
          </View>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={dateOfBirth}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        <TextInput
          label="Profile Description"
          value={profileDescription}
          onChangeText={setProfileDescription}
          mode="outlined"
          multiline
          numberOfLines={4}
          className="mb-4"
        />
        <View className="flex-row justify-end">
          <Button onPress={onDismiss} mode="outlined" className="mr-2">
            Cancel
          </Button>
          <Button onPress={handleSave} mode="contained" loading={loading}>
            Save
          </Button>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default EditProfileModal;
