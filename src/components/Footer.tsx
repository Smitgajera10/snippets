export default function Footer() {
  return (
    <footer className=" border-t border-gray-800 bg-gray-900 text-gray-400">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        
        {/* Left - Info */}
        <div className="text-sm text-center sm:text-left">
          <p>
            Made with <span className="text-red-500">♥</span> by{" "}
            <a
              href="https://github.com/Smitgajera10"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline"
            >
              Smit
            </a>
          </p>
          <p className="text-xs text-gray-500">
            Open-source | Snippets-to-Link project
          </p>
        </div>

        {/* Right - Links */}
        <div className="flex gap-4 text-sm">
          <a
            href="https://github.com/Smitgajera10/snippets"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/smit-gajera-470061296/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            Linkedin
          </a>
          <a
            className="hover:text-white transition"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
