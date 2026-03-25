import { axiosInstance } from "./axios";

export const signup = async (signUpData) => {
  const response = await axiosInstance.post("/auth/signup", signUpData);
  return response.data;
};

export const login = async (logInData) => {
  const response = await axiosInstance.post("/auth/login", logInData);
  return response.data;
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log("Error in getAuth", error);
    return null;
  }
};

export const completeOnboarding = async (userData) => {
  const response = await axiosInstance.post("/auth/onboarding", userData);
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export const getUserFriends = async () => {
  const response = await axiosInstance.get("/user/friends");
  return response.data;
};

export const getRecommendedUsers = async () => {
  const response = await axiosInstance.get("/user");
  return response.data;
};

export const getOutgoingFriendReqs = async () => {
  const response = await axiosInstance.get("/user/outgoing-friend-requests");
  return response.data;
};

export const sendFriendRequest = async (userId) => {
  const response = await axiosInstance.post(`/user/friend-request/${userId}`);
  return response.data;
};

export const getFriendRequests = async () => {
  const response = await axiosInstance.get("/user/friend-requests");
  return response.data;
};

export const acceptFriendRequest = async (requestId) => {
  const response = await axiosInstance.put(
    `/user/friend-request/${requestId}/accept`,
  );
  return response.data;
};

export const getStreamToken = async () => {
  const response = await axiosInstance.get("/chat/token");
  return response.data;
};

export const getSearchedUsers = async (input) => {
  const response = await axiosInstance.get("/user/search-friends", {
    params: { q: input },
  });
  return response.data;
};

export const uploadProfilePic = async (file) => {
  if (!file) throw new Error("No file provided for profile picture upload");

  const formData = new FormData();
  formData.append("image", file);

  const response = await axiosInstance.post(
    "/user/upload-profile-pic",
    formData,
  );

  return response.data;
};

export const getDeveloper = async () => {
  const response = await axiosInstance.get("/user/get-developer");
  return response.data;
};
