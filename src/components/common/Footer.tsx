import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-ful py-6 px-4 sm:px-6 lg:px-8 font-inter mt-auto relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-gray-600 text-sm">
        {/* Copyright Section */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          Copyright &copy; {new Date().getFullYear()}, made with by{" "}
          <span className="font-semibold text-gray-800">Kealen</span> for a
          better web.
        </div>

        {/* Navigation Links Section */}
        <nav className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
          <a
            href="#"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Kealen
          </a>
          <a
            href="#"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            About Us
          </a>
          <a
            href="#"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Blog
          </a>
          <a
            href="#"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            License
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
