import Contact from "../db/models/contact.model.js";

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, serviceType, subject, message, urgency } =
      req.body;

    if (!name || !email || !serviceType || !subject || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      serviceType,
      subject,
      message,
      urgency,
    });

    return res.status(201).json({
      message: "Contact form submitted successfully",
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error("❌ Contact Submission failed:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllMessages = async (_req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });

    return res.status(200).json({
      message: `${messages.length} messages fetched successfully`,
      success: true,
      data: { messages },
    });
  } catch (err) {
    console.error("❌ Failed to get messages:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Contact.findById(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: { message },
    });
  } catch (err) {
    console.error("❌ Failed to get message by ID:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Contact.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Message not found or already deleted",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (err) {
    console.error("❌ Failed to delete message:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
