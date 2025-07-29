import { Router } from "express";
import {
  deleteMessageById,
  getAllMessages,
  getMessageById,
  submitContactForm,
} from "../controllers/contact.controller.js";
import { protectRoute } from "../middleware/auth-check.js";

const router = Router();

// Public
router.post("/send", submitContactForm);

// Admin
router.get("/all", protectRoute, getAllMessages);
router.get("/:id", protectRoute, getMessageById);
router.delete("/:id", protectRoute, deleteMessageById);

export default router;
