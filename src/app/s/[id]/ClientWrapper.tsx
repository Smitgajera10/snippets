"use client";

import dynamic from "next/dynamic";
import html2canvas from "html2canvas";
import { ThemeKeys } from "@/utils/themes";

const downloadImage = async () => {
  const element = document.getElementById("snippet-box");
  if (!element) return;

  // Walk through all child nodes and patch colors
  const allElements = element.querySelectorAll("*");

  const buttons = element.querySelectorAll('.capture-exclude');
  buttons.forEach((button) => (button as HTMLElement).style.display = 'none');

  allElements.forEach((el) => {
  const computed = window.getComputedStyle(el);

  // Cast only if it's an HTMLElement
  if (el instanceof HTMLElement) {
    if (computed.color.includes("oklch")) {
      el.style.color = "#ffffff";
    }
    if (computed.backgroundColor.includes("oklch")) {
      el.style.backgroundColor = "#0f172a";
    }
  }
});


  // Also patch the root element
  element.style.backgroundColor = "#0f172a";
  element.style.color = "#ffffff";

  const canvas = await html2canvas(element);

  const dataUrl = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = "snippet.png";
  a.click();
};

const ClientCodeBlock = dynamic(() => import("@/components/ClientCodeBlock"), {
  ssr: false,
});

export default function ClientWrapper({
  code,
  language,
  theme,
}: {
  code: string;
  language: string;
  theme : ThemeKeys;
}) {
  return (
    <>
      <div id="snippet-box" className="bg-gray-800 p-6 rounded-lg">
        <ClientCodeBlock code={code} language={language} theme={theme}/>
      </div>
      <div className="flex justify-center">
        <button
          onClick={downloadImage}
          className="mt-4 px-4 py-2 rounded-md bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold shadow-lg hover:from-green-500 hover:to-blue-600 transition-colors duration-200"
        >
          📸 Download as Image
        </button>
      </div>
    </>
  );
}
