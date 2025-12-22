// controllers/immersionController.js
import {
  createIndustryApplication,
  getIndustryApplications,
  createAcademicApplication,
  getAcademicApplications
} from "../../models/user/Immersion.js";

// ----- Industry Application -----

export async function addIndustryApplication(req, res) {
  try {
    const resumePath = req.file ? req.file.path : null;

    const {
      industryName,
      industryEmail,
      industrySkypeId,
      industryContact,
      industryLocation,
      industrySkillsSubjects,
      industryExperienceLookingFor,
      industryDescription
    } = req.body;

    if (
      !industryName ||
      !industryEmail ||
      !industryContact ||
      !industryLocation ||
      !industrySkillsSubjects ||
      !industryExperienceLookingFor
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const created = await createIndustryApplication({
      industryName,
      industryEmail,
      industrySkypeId,
      industryContact,
      industryLocation,
      industrySkillsSubjects,
      industryExperienceLookingFor,
      industryDescription,
      resumePath
    });

    res.status(201).json(created);
  } catch (err) {
    console.error("Error creating industry application:", err);
    res.status(500).json({ message: "Failed to create industry application" });
  }
}

export async function listIndustryApplications(req, res) {
  try {
    const data = await getIndustryApplications();
    res.json(data);
  } catch (err) {
    console.error("Error fetching industry applications:", err);
    res.status(500).json({ message: "Failed to fetch industry applications" });
  }
}

// ----- Academic Application -----

export async function addAcademicApplication(req, res) {
  try {
    const {
      academicName,
      academicContact,
      academicEmail,
      academicLocation,
      academicPrograms,
      academicSpecialization,
      academicSubject,
      academicSkypeId
    } = req.body;

    if (
      !academicName ||
      !academicContact ||
      !academicEmail ||
      !academicLocation ||
      !academicPrograms ||
      !academicSpecialization ||
      !academicSubject
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const created = await createAcademicApplication({
      academicName,
      academicContact,
      academicEmail,
      academicLocation,
      academicPrograms,
      academicSpecialization,
      academicSubject,
      academicSkypeId
    });

    res.status(201).json(created);
  } catch (err) {
    console.error("Error creating academic application:", err);
    res.status(500).json({ message: "Failed to create academic application" });
  }
}

export async function listAcademicApplications(req, res) {
  try {
    const data = await getAcademicApplications();
    res.json(data);
  } catch (err) {
    console.error("Error fetching academic applications:", err);
    res.status(500).json({ message: "Failed to fetch academic applications" });
  }
}
