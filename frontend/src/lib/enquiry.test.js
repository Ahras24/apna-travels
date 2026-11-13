jest.mock("@/data/content", () => ({
  COMPANY: { whatsappNumber: "919496375555" },
}), { virtual: true });

import { submitThenWhatsApp } from "./enquiry";

describe("submitThenWhatsApp", () => {
  let popup;
  let originalOpen;

  beforeEach(() => {
    popup = { location: { href: "" } };
    originalOpen = window.open;
    window.open = jest.fn(() => popup);
  });

  afterEach(() => {
    window.open = originalOpen;
  });

  it("opens a WhatsApp draft when saving the enquiry fails", async () => {
    const result = await submitThenWhatsApp({
      request: () => Promise.reject(new Error("API unavailable")),
      buildMessage: ({ saveFailed }) => saveFailed ? "Enquiry details; website save failed." : "Enquiry details.",
    });

    expect(result.saved).toBe(false);
    expect(result.opened).toBe(true);
    expect(result.saveError).toContain("couldn't save");
    expect(popup.location.href).toBe(result.url);
    expect(decodeURIComponent(result.url)).toContain("website save failed");
  });
});
