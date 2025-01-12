import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = ({ navLinks }) => {
  return (
    <footer className="relative text-white gradient-footer px-8 md:px-8 lg:px-16">
      <div className="relative max-w-7xl mx-auto container mx-auto flex gap-4 flex-col md:flex-row justify-between">
        {/* Info Section */}
        <div className="footer-about text-white mt-12 pt-6 md:mb-0 flex-1">
          <div className="footer-logo logo mb-4">
            <img
              sizes="(max-width: 1400px) 100vw, 1400px"
              srcSet="/img/logo_qnbieg_c_scale,w_200.webp 500w, /img/logo_qnbieg_c_scale,w_792.webp 792w, /img/logo_qnbieg_c_scale,w_1186.webp 1186w, /img/logo_qnbieg_c_scale,w_1400.webp 1400w"
              src="/img/logo_qnbieg_c_scale,w_1400.webp"
              alt="Logo"
              width="1400"
              height="auto"
              loading="lazy"
            />
          </div>
          <p>
            Unlock the potential of words at AIWordSolver — your wordhub for solving jumble puzzles, unscrambling letters, and dominating games like Wordle and Scrabble.
          </p>
        </div>
        <div className="footer-contact md:mt-12 text-white md:mb-0 flex-1">
          <h3 className="font-bold mb-4">About Us</h3>
          <ul className="space-y-2">
            <li>
              Email:{" "}
              <a
                href="mailto:contact@aiwordsolver.com"
                className="hover:text-yellow-300"
              >
                contact@aiwordsolver.com
              </a>
            </li>
            <li>
              Location: Street No. 5, Al Nasserya, Sharjah, 00000, United Arab Emirates
            </li>
          </ul>
        </div>
        {/* Solvers Section */}
        <div className="footer-solvers md:mt-12 text-white md:mb-0">
          <h3 className="font-bold mb-4">Solvers</h3>
          <ul className="space-y-2">
            {navLinks.map((tool, index) => (
              <li key={index}>
                <a href={`/${tool.page_url}`} className="hover:text-yellow-300">
                {tool.page_title.split('-')[0]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Footer Bottom */}
      <div className="footer-social text-white flex flex-col md:flex-row items-center md:justify-between py-4 px-6 border border-orange-web rounded-xl max-w-4xl mx-auto space-y-4 md:space-y-0">
        {/* Social Media Icons */}
        <div className="flex justify-center md:justify-start space-x-2 mb-4 md:mb-0">
          <a
            href="https://www.facebook.com/aiwordsolver"
            className="text-white hover:text-yellow-300 bg-[#2B95FF] rounded-full h-8 w-8 flex items-center justify-center"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our Facebook page"
          >
            <i className="fab fa-facebook-f fa-lg"></i>
          </a>
          <a
            href="https://x.com/aiwordsolver"
            className="text-white hover:text-yellow-300 bg-[#2B95FF] rounded-full h-8 w-8 flex items-center justify-center"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our Twitter page"
          >
            <i className="fab fa-twitter fa-lg"></i>
          </a>
          <a
            href="https://www.instagram.com/ai_word_solver/"
            className="text-white hover:text-yellow-300 bg-[#2B95FF] rounded-full h-8 w-8 flex items-center justify-center"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our Instagram profile"
          >
            <i className="fab fa-instagram fa-lg"></i>
          </a>
          <a
            href="https://www.linkedin.com/company/aiwordsolver/"
            className="text-white hover:text-yellow-300 bg-[#2B95FF] rounded-full h-8 w-8 flex items-center justify-center"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our LinkedIn page"
          >
            <i className="fab fa-linkedin-in fa-lg"></i>
          </a>
          <a
            href="https://www.pinterest.com/aiwordsolver/"
            className="text-white hover:text-yellow-300 bg-[#2B95FF] rounded-full h-8 w-8 flex items-center justify-center"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our Pinterest profile"
          >
            <i className="fab fa-pinterest-p fa-lg"></i>
          </a>
        </div>

        {/* Navigation Links */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex justify-center max-w-screen-sm mx-auto text-center">
          <li>
            <a href="/blogs" className="text-white hover:text-yellow-300">
              Blogs
            </a>
          </li>
          <li>
            <a href="/privacy-policy" className="text-white hover:text-yellow-300">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/terms-conditions" className="text-white hover:text-yellow-300">
              Terms & Conditions
            </a>
          </li>
        </ul>

        {/* Install Button */}
        <button
          id="install-btn"
          className="flex w-full md:w-auto btn button-orange install-btn glass shadow-lg btn-sm p-2 flex items-center justify-center space-x-2 transition-transform duration-200 ease-in-out text-black transform hover:scale-105"
          role="button"
          style={{ borderRadius: "12px" }}
        >
          <i className="fas fa-mobile-alt"></i>
          <span>Install App</span>
          <i className="fas fa-download"></i>
        </button>
      </div>
      
      {/* Bottom copyright section */}
      <div className="text-center py-4">
        <p className="text-sm">© 2024 AI Word Solver. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
