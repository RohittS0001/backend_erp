import {
  getSettings as getSettingsFromDb,
  upsertSettings
} from "../../models/admin/Setting.js";

export const getSettingsHandler = async (req, res) => {
  try {
    let settings = await getSettingsFromDb();
    if (!settings) {
      // Create default settings if none exist
      settings = await upsertSettings({});
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch settings" });
  }
};

export const saveSettingsHandler = async (req, res) => {
  try {
    const updatedSettings = await upsertSettings(req.body);
    res.json(updatedSettings);
  } catch (err) {
    res.status(500).json({ error: "Failed to save settings" });
  }
};
