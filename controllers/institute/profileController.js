import {
  getProfile,
  createProfile,
  updateProfileDB
} from "../../models/institute/profile.js";

// GET profile
export const getProfileController = async (req, res) => {
  try {
    const profile = await getProfile();
    res.json(profile || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE or CREATE profile
export const updateProfile = async (req, res) => {
  try {
    const existing = await getProfile();

    if (!existing) {
      const id = await createProfile(req.body);
      return res.json({ message: "Profile created", id });
    }

    await updateProfileDB(req.body);
    res.json({ message: "Profile updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
