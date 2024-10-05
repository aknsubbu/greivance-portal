import React, { useState } from "react";
import { Modal, View, TextInput } from "react-native";
import { Button, Text } from "react-native-paper";
import Profile from "@/interfaces/Profile";
import { updateProfile } from "@/functions/profileFunctions";

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (updatedProfile: Profile) => void;
  profile: Profile;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  visible,
  onClose,
  onSave,
  profile,
}) => {
  const [name, setName] = useState(profile.name);
  const [tag, setTag] = useState(profile.tag || "");
  const [location, setLocation] = useState(profile.location || "");
  const [description, setDescription] = useState(
    profile.profileDescription || ""
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const updatedProfile = await updateProfile(profile._id, {
        name,
        tag,
        location,
        profileDescription: description,
      });
      onSave(updatedProfile);
      onClose();
    } catch (err) {
      console.error("Failed to update profile:", err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="bg-white p-5 rounded-lg w-5/6">
          <Text className="text-xl font-bold mb-4">Edit Profile</Text>
          <TextInput
            className="border border-gray-300 p-2 rounded mb-2"
            value={name}
            onChangeText={setName}
            placeholder="Name"
          />
          <TextInput
            className="border border-gray-300 p-2 rounded mb-2"
            value={tag}
            onChangeText={setTag}
            placeholder="Tag"
          />
          <TextInput
            className="border border-gray-300 p-2 rounded mb-2"
            value={location}
            onChangeText={setLocation}
            placeholder="Location"
          />
          <TextInput
            className="border border-gray-300 p-2 rounded mb-4"
            value={description}
            onChangeText={setDescription}
            placeholder="Description"
            multiline
          />
          {error && <Text className="text-red-500 mb-2">{error}</Text>}
          <View className="flex-row justify-end">
            <Button onPress={onClose} className="mr-2">
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handleSave}
              loading={loading}
              disabled={loading}
            >
              Save
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditProfileModal;
