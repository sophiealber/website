import { createCanvas } from "canvas";
import { writeFileSync } from "fs";

const WIDTH = 1200;
const HEIGHT = 630;

const canvas = createCanvas(WIDTH, HEIGHT);
const ctx = canvas.getContext("2d");

// Background
ctx.fillStyle = "#0f0f0f";
ctx.fillRect(0, 0, WIDTH, HEIGHT);

// Subtle gradient overlay
const grad = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
grad.addColorStop(0, "rgba(99, 102, 241, 0.08)");
grad.addColorStop(1, "rgba(99, 102, 241, 0)");
ctx.fillStyle = grad;
ctx.fillRect(0, 0, WIDTH, HEIGHT);

// Accent line
ctx.fillStyle = "#6366f1";
ctx.fillRect(80, 200, 60, 4);

// Name
ctx.fillStyle = "#ffffff";
ctx.font = "bold 64px Inter, sans-serif";
ctx.fillText("Sophie Alber", 80, 280);

// Title
ctx.fillStyle = "#818cf8";
ctx.font = "500 32px Inter, sans-serif";
ctx.fillText("Software Engineer at Datadog", 80, 340);

// Subtitle
ctx.fillStyle = "#9ca3af";
ctx.font = "400 24px Inter, sans-serif";
ctx.fillText("Cornell CS '25  •  Magna Cum Laude  •  Boston, MA", 80, 400);

// Bottom border accent
ctx.fillStyle = "#6366f1";
ctx.fillRect(0, HEIGHT - 4, WIDTH, 4);

const buffer = canvas.toBuffer("image/png");
writeFileSync("public/og-image.png", buffer);
console.log("Generated public/og-image.png");
