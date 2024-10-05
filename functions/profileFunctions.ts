// profileFunctions.ts

import Profile from "@/interfaces/Profile";

const BASE_URL = "https://activity-point-program-backend.onrender.com/api";

export const getAllProfiles = async (): Promise<Profile[]> => {
  const response = await fetch(`${BASE_URL}/profiles/`);
  if (!response.ok) throw new Error("Failed to fetch profiles");
  const data = await response.json();
  return data as Profile[];
};

export const getProfileById = async (id: string): Promise<Profile> => {
  const response = await fetch(`${BASE_URL}/profiles/${id}`);
  if (!response.ok) throw new Error("Failed to fetch profile");
  const data = await response.json();
  return data as Profile;
};

export const getProfileByUsername = async (
  username: string
): Promise<Profile> => {
  const response = await fetch(`${BASE_URL}/profiles/${username}`);
  if (!response.ok) throw new Error("Failed to fetch profile");
  const data = await response.json();
  return data as Profile;
};

export const createProfile = async (
  profileData: Omit<Profile, "id">
): Promise<Profile> => {
  const response = await fetch(`${BASE_URL}/profiles/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profileData),
  });
  if (!response.ok) throw new Error("Failed to create profile");
  const data = await response.json();
  return data as Profile;
};

export const updateProfile = async (
  id: string,
  profileData: Partial<Profile>
): Promise<Profile> => {
  const response = await fetch(`${BASE_URL}/profiles/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profileData),
  });
  if (!response.ok) throw new Error("Failed to update profile");
  const data = await response.json();
  return data as Profile;
};

export const deleteProfile = async (id: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/profiles/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete profile");
};
