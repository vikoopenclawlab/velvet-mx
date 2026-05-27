import Stripe from "stripe";

// Stripe is stubbed for MVP - no real payments
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_stubbed", {
  apiVersion: "2023-10-16",
});

export async function createCheckoutSession(amount: number, metadata: Record<string, string>) {
  // Stubbed - returns mock session
  return {
    id: `cs_mock_${Date.now()}`,
    url: `/booking/confirmation?session_id=cs_mock_${Date.now()}`,
  };
}

export async function constructWebhookEvent(payload: string, signature: string) {
  // Stubbed
  return {} as Stripe.Event;
}
