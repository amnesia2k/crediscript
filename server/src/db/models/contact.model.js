import { createId } from "@paralleldrive/cuid2";
import { Schema, model } from "mongoose";

const contactSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => createId(),
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    serviceType: {
      type: String,
      enum: [
        "academic-writing",
        "assignment-help",
        "thesis-guidance",
        "project-research",
        "coursework-support",
      ],
      required: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    urgency: {
      type: String,
      enum: ["24-hours", "3-days", "1-week", "2-weeks", "flexible"],
      default: "flexible",
    },
  },
  { timestamps: true }
);

const Contact = model("Contact", contactSchema);

export default Contact;
