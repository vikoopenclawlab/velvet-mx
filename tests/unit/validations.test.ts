import { test, expect } from "vitest";
import { loginSchema, registerSchema, bookingSchema, contactSchema } from "@/lib/validations";

test("loginSchema should validate correct input", () => {
  const result = loginSchema.safeParse({
    email: "test@example.com",
    password: "password123",
  });
  expect(result.success).toBe(true);
});

test("loginSchema should reject invalid email", () => {
  const result = loginSchema.safeParse({
    email: "invalid-email",
    password: "password123",
  });
  expect(result.success).toBe(false);
});

test("loginSchema should reject short password", () => {
  const result = loginSchema.safeParse({
    email: "test@example.com",
    password: "12345",
  });
  expect(result.success).toBe(false);
});

test("registerSchema should validate matching passwords", () => {
  const result = registerSchema.safeParse({
    name: "Test User",
    email: "test@example.com",
    password: "password123",
    confirmPassword: "password123",
  });
  expect(result.success).toBe(true);
});

test("registerSchema should reject mismatched passwords", () => {
  const result = registerSchema.safeParse({
    name: "Test User",
    email: "test@example.com",
    password: "password123",
    confirmPassword: "different",
  });
  expect(result.success).toBe(false);
});

test("bookingSchema should validate minimum service selection", () => {
  const result = bookingSchema.safeParse({
    modelId: "model-001",
    date: "2024-06-15",
    startTime: "20:00",
    serviceIds: [],
  });
  expect(result.success).toBe(false);
});

test("contactSchema should validate message length", () => {
  const result = contactSchema.safeParse({
    name: "Test",
    email: "test@example.com",
    subject: "Test Subject",
    message: "Short message",
  });
  expect(result.success).toBe(false);
});
