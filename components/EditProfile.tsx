// import React, { useState } from "react";
// import {
//   View,
//   Modal,
//   ScrollView,
//   Image,
//   Platform,
//   TouchableOpacity,
// } from "react-native";
// import { TextInput, Button, Text } from "react-native-paper";
// import * as ImagePicker from "expo-image-picker";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { updateProfile } from "@/functions/profileFunctions";
// import { saveProfile } from "@/functions/profileAsyncStorage";
// import { useLocation } from "@/hooks/useLocation";
// import Profile from "@/interfaces/Profile";

// interface EditProfileModalProps {
//   visible: boolean;
//   onDismiss: () => void;
//   profile: Profile;
//   onProfileUpdate: (updatedProfile: Profile) => void;
// }

// const EditProfileModal: React.FC<EditProfileModalProps> = ({
//   visible,
//   onDismiss,
//   profile,
//   onProfileUpdate,
// }) => {
//   const [name, setName] = useState(profile.name);
//   const [tag, setTag] = useState(profile.tag || "");
//   const locationState = useLocation();
//   const [dateOfBirth, setDateOfBirth] = useState(
//     profile.dateOfBirth ? new Date(profile.dateOfBirth) : new Date()
//   );
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [profileDescription, setProfileDescription] = useState(
//     profile.profileDescription || ""
//   );
//   const [profilePicture, setProfilePicture] = useState(
//     profile.profilePicture || ""
//   );
//   const [loading, setLoading] = useState(false);

//   const location = [locationState.latitude, locationState.longitude].join(", ");

//   const pickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//       base64: true,
//     });

//     if (!result.canceled && result.assets[0].base64) {
//       setProfilePicture(result.assets[0].base64);
//     }
//   };

//   const handleDateChange = (event: any, selectedDate?: Date) => {
//     const currentDate = selectedDate || dateOfBirth;
//     setShowDatePicker(Platform.OS === "ios");
//     setDateOfBirth(currentDate);
//   };

//   const handleSave = async () => {
//     setLoading(true);
//     try {
//       const updatedProfileData = {
//         ...profile,
//         name,
//         tag,
//         location,
//         dateOfBirth: dateOfBirth,
//         profileDescription,
//         profilePicture,
//       };

//       const updatedProfile = await updateProfile(
//         profile._id,
//         updatedProfileData
//       );
//       await saveProfile(updatedProfile);
//       onProfileUpdate(updatedProfile);
//       onDismiss();
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal
//       visible={visible}
//       onDismiss={onDismiss}
//       animationType="slide"
//       presentationStyle="pageSheet"
//     >
//       <ScrollView className="flex-1 bg-white pt-10 px-4">
//         <Text className="text-2xl font-bold mb-4">Edit Profile</Text>

//         <View className="items-center mb-4">
//           {profilePicture ? (
//             <Image
//               source={{
//                 uri: `data:image/jpeg;base64,${profile.profilePicture}`,
//               }}
//               className="rounded-full w-30 h-30"
//               width={120}
//               height={120}
//             />
//           ) : (
//             <View className="w-32 h-32 rounded-full bg-gray-300 items-center justify-center">
//               <Text>No Image</Text>
//             </View>
//           )}
//           <Button onPress={pickImage} mode="outlined" className="mt-2">
//             Change Photo
//           </Button>
//         </View>

//         <TextInput
//           label="Name"
//           value={name}
//           onChangeText={setName}
//           mode="outlined"
//           className="mb-4"
//         />
//         <TextInput
//           label="Tag"
//           value={tag}
//           onChangeText={setTag}
//           mode="outlined"
//           className="mb-4"
//         />
//         <TextInput
//           label="Location"
//           value={location}
//           mode="outlined"
//           className="mb-4"
//         />
//         <TouchableOpacity
//           onPress={() => setShowDatePicker(true)}
//           className="mb-4"
//         >
//           <View pointerEvents="none">
//             <TextInput
//               label="Date of Birth"
//               value={dateOfBirth.toDateString()}
//               mode="outlined"
//               editable={false}
//             />
//           </View>
//         </TouchableOpacity>
//         {showDatePicker && (
//           <DateTimePicker
//             value={dateOfBirth}
//             mode="date"
//             display="default"
//             onChange={handleDateChange}
//           />
//         )}
//         <TextInput
//           label="Profile Description"
//           value={profileDescription}
//           onChangeText={setProfileDescription}
//           mode="outlined"
//           multiline
//           numberOfLines={4}
//           className="mb-4"
//         />
//         <View className="flex-row justify-end">
//           <Button onPress={onDismiss} mode="outlined" className="mr-2">
//             Cancel
//           </Button>
//           <Button onPress={handleSave} mode="contained" loading={loading}>
//             Save
//           </Button>
//         </View>
//       </ScrollView>
//     </Modal>
//   );
// };

// export default EditProfileModal;

import React, { useState } from "react";
import {
  View,
  Modal,
  ScrollView,
  Image,
  Platform,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import {
  TextInput,
  Button,
  Text,
  useTheme,
  IconButton,
  Surface,
  Divider,
} from "react-native-paper";
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
  const theme = useTheme();
  const styles = createStyles(theme);

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

  const location = [locationState.latitude, locationState.longitude].join(", ");

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8, // Slightly reduced for better performance
        base64: true,
      });

      if (!result.canceled && result.assets[0].base64) {
        setProfilePicture(result.assets[0].base64);
      }
    } catch (error) {
      console.error("Error picking image:", error);
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
        dateOfBirth: dateOfBirth,
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
      <StatusBar
        backgroundColor={theme.colors.surface}
        barStyle="dark-content"
      />

      <Surface style={styles.header} elevation={2}>
        <View style={styles.headerContent}>
          <IconButton
            icon="close"
            size={24}
            onPress={onDismiss}
            iconColor={theme.colors.onSurface}
          />
          <Text variant="headlineSmall" style={styles.headerTitle}>
            Edit Profile
          </Text>
          <View style={styles.spacer} />
        </View>
      </Surface>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Surface style={styles.photoSection} elevation={1}>
          <View style={styles.photoContainer}>
            {profilePicture ? (
              <Image
                source={{
                  uri: `data:image/jpeg;base64,${profilePicture}`,
                }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.noImageContainer}>
                <IconButton
                  icon="account"
                  size={50}
                  iconColor={theme.colors.onSurfaceVariant}
                />
              </View>
            )}
          </View>
          <Button
            onPress={pickImage}
            mode="outlined"
            style={styles.photoButton}
            icon="camera"
          >
            Change Photo
          </Button>
        </Surface>

        <Surface style={styles.formSection} elevation={1}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Personal Information
          </Text>
          <Divider style={styles.divider} />

          <TextInput
            label="Name"
            value={name}
            onChangeText={setName}
            mode="outlined"
            outlineStyle={styles.inputOutline}
            style={styles.input}
          />

          <TextInput
            label="Tag"
            value={tag}
            onChangeText={setTag}
            mode="outlined"
            outlineStyle={styles.inputOutline}
            style={styles.input}
          />

          <TextInput
            label="Location"
            value={location}
            mode="outlined"
            outlineStyle={styles.inputOutline}
            style={styles.input}
            disabled
          />

          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.datePickerContainer}
          >
            <View pointerEvents="none">
              <TextInput
                label="Date of Birth"
                value={dateOfBirth.toDateString()}
                mode="outlined"
                outlineStyle={styles.inputOutline}
                style={styles.input}
                editable={false}
                right={<TextInput.Icon icon="calendar" />}
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
        </Surface>

        <Surface style={styles.formSection} elevation={1}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            About You
          </Text>
          <Divider style={styles.divider} />

          <TextInput
            label="Profile Description"
            value={profileDescription}
            onChangeText={setProfileDescription}
            mode="outlined"
            outlineStyle={styles.inputOutline}
            style={[styles.input, styles.textArea]}
            multiline
            numberOfLines={4}
          />
        </Surface>

        <View style={styles.buttonContainer}>
          <Button
            onPress={onDismiss}
            mode="outlined"
            style={styles.cancelButton}
            contentStyle={styles.buttonContent}
          >
            Cancel
          </Button>
          <Button
            onPress={handleSave}
            mode="contained"
            loading={loading}
            style={styles.saveButton}
            contentStyle={styles.buttonContent}
          >
            Save Changes
          </Button>
        </View>
      </ScrollView>
    </Modal>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    contentContainer: {
      padding: 16,
      paddingBottom: 40,
    },
    header: {
      paddingTop: 50, // Account for status bar
      paddingBottom: 16,
      backgroundColor: theme.colors.surface,
    },
    headerContent: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 8,
    },
    headerTitle: {
      color: theme.colors.onSurface,
      fontWeight: "bold",
    },
    spacer: {
      width: 40, // To balance the close icon on the left
    },
    photoSection: {
      padding: 24,
      alignItems: "center",
      borderRadius: 12,
      marginBottom: 16,
      backgroundColor: theme.colors.surface,
    },
    photoContainer: {
      borderRadius: 60,
      overflow: "hidden",
      marginBottom: 16,
      elevation: 2,
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
    },
    noImageContainer: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: theme.colors.surfaceVariant,
      alignItems: "center",
      justifyContent: "center",
    },
    photoButton: {
      marginTop: 8,
      borderColor: theme.colors.primary,
    },
    formSection: {
      padding: 16,
      borderRadius: 12,
      marginBottom: 16,
      backgroundColor: theme.colors.surface,
    },
    sectionTitle: {
      marginBottom: 8,
      color: theme.colors.onSurface,
      fontWeight: "500",
    },
    divider: {
      marginBottom: 16,
      backgroundColor: theme.colors.outlineVariant,
    },
    input: {
      marginBottom: 16,
      backgroundColor: theme.colors.surface,
    },
    inputOutline: {
      borderRadius: 8,
      borderColor: theme.colors.outline,
    },
    datePickerContainer: {
      marginBottom: 16,
    },
    textArea: {
      minHeight: 100,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      marginTop: 8,
    },
    cancelButton: {
      marginRight: 12,
      borderColor: theme.colors.outline,
    },
    saveButton: {
      backgroundColor: theme.colors.primary,
    },
    buttonContent: {
      paddingHorizontal: 16,
      paddingVertical: 6,
    },
  });

export default EditProfileModal;
