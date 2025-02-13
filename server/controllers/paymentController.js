import paypal from "@paypal/checkout-server-sdk";
import dotenv from "dotenv";

dotenv.config();

// Setup PayPal environment
const environment = new paypal.core.LiveEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_SECRET_KEY
);


const client = new paypal.core.PayPalHttpClient(environment);

// Create a new order
export const createOrder = async (req, res) => {
  const { amount } = req.body; // Amount sent from frontend
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: amount.toFixed(2),
        },
      },
    ],
  });

  try {
    const order = await client.execute(request);
    res.status(201).json({ id: order.result.id });
  } catch (error) {
    console.error("Error creating PayPal order: ", error);
    res.status(500).json({ message: "Could not create PayPal order" });
  }
};

// Capture an existing order
export const captureOrder = async (req, res) => {
  const { orderId } = req.body; // Order ID sent from frontend
  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});

  try {
    const capture = await client.execute(request);
    res.status(200).json({ status: "COMPLETED", capture: capture.result });
  } catch (error) {
    console.error("Error capturing PayPal order: ", error);
    res.status(500).json({ message: "Could not capture PayPal order" });
  }
};
