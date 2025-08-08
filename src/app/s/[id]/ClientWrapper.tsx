"use client";

import dynamic from "next/dynamic";
import html2canvas from "html2canvas";
import { ThemeKeys } from "@/utils/themes";

const downloadImage = async () => {
  const element = document.getElementById("snippet-box");
  if (!element) return;

  const excludedEls = element.querySelectorAll(".capture-exclude");
  excludedEls.forEach((el) => ((el as HTMLElement).style.display = "none"));

  const langLabel = element.querySelector(".language-label") as HTMLElement;
  let prevLangStyle = "";
  if (langLabel) {
    prevLangStyle = langLabel.style.top;
    langLabel.style.top = "50%";
    langLabel.style.transform = "translateY(-50%)";
    langLabel.style.position = "relative";
  }

  const prevBg = element.style.background;
  element.style.background = "transparent";

  const canvas = await html2canvas(element, {
    backgroundColor: null,
    scale: 2,
    useCORS: true,
  });

  element.style.background = prevBg;

  if (langLabel) {
    langLabel.style.top = prevLangStyle;
    langLabel.style.transform = "";
    langLabel.style.position = "";
  }

  excludedEls.forEach((el) => ((el as HTMLElement).style.display = ""));

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
  theme: ThemeKeys;
}) {
  return (
    <>
      <div id="snippet-box" className="bg-gray-800 p-6 rounded-lg">
        <ClientCodeBlock code={code} language={language} theme={theme} />
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
