// profileFunctions.ts

import axios from "axios";

const BASE_URL = "https://activity-point-program-backend.onrender.com/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllProfiles = async (): Promise<any> => {
  try {
    const response = await api.get("/profile/");
    console.log("All profiles response");
    return response.data;
  } catch (error) {
    console.error("Error in getAllProfiles:", error);
    throw error;
  }
};

export const getProfileById = async (id: string): Promise<any> => {
  try {
    const response = await api.get(`/profile/${id}`);
    console.log("Profile by ID response");
    console.log(response.data["profilePicture"]);
    return response.data;
  } catch (error) {
    console.error("Error in getProfileById:", error);
    throw error;
  }
};

export const getProfileByUsername = async (username: string): Promise<any> => {
  try {
    const response = await api.get(`/profile/username/${username}`);
    console.log("Profile by username response:", response);
    return response.data;
  } catch (error) {
    console.error("Error in getProfileByUsername:", error);
    throw error;
  }
};

export const createProfile = async (profileData: any): Promise<any> => {
  try {
    const response = await api.post("/profile/", profileData);
    console.log("Create profile response:", response);
    return response.data;
  } catch (error) {
    console.error("Error in createProfile:", error);
    throw error;
  }
};

export const updateProfile = async (
  id: string,
  profileData: any
): Promise<any> => {
  try {
    const response = await api.put(`/profile/${id}`, profileData);
    console.log("Update profile response:", response);
    return response.data;
  } catch (error) {
    console.error("Error in updateProfile:", error);
    throw error;
  }
};

export const deleteProfile = async (id: string): Promise<void> => {
  try {
    const response = await api.delete(`/profile/${id}`);
    console.log("Delete profile response:", response);
  } catch (error) {
    console.error("Error in deleteProfile:", error);
    throw error;
  }
};
