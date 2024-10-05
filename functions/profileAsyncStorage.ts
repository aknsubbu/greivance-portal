import AsyncStorage from "@react-native-async-storage/async-storage";
import Profile from "@/interfaces/Profile";

export const getProfileFromStorage = async (): Promise<Profile | null> => {
  try {
    const storedProfile = await AsyncStorage.getItem("userProfile");
    if (storedProfile) {
      return JSON.parse(storedProfile);
    }
  } catch (error) {
    console.error("Failed to get profile from AsyncStorage:", error);
  }
  return null;
};

export const saveProfile = async (newProfile: Profile) => {
  try {
    await AsyncStorage.setItem("userProfile", JSON.stringify(newProfile));
    console.log("Profile saved in AsyncStorage");
  } catch (error) {
    console.error("Failed to update profile:", error);
  }
};
