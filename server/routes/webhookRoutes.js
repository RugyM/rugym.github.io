import express from "express";
import Quiz from "../models/Quiz.js";

const router = express.Router();

router.post("/paypal", async (req, res) => {
  try {
    const { event_type, resource } = req.body;

    if (event_type === "PAYMENT.CAPTURE.COMPLETED") {
      const { invoice_id } = resource;
      await Quiz.findOneAndUpdate(
        { orderId: invoice_id },
        { paymentRequired: false },
      );
      console.log(`Payment successful for Order ID: ${invoice_id}`);
    } else {
      console.log(`Unhandled event type: ${event_type}`);
    }

    res.status(200).send("Webhook received");
    console.log("Webhook payload received:", req.body);
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
