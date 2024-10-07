"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent text-white pb-4 mt-4">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex space-x-4 mb-2">
          <a 
            href="https://x.com/Kamal__Dev" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-gray-400"
          >
            <FontAwesomeIcon icon={faTwitter} size="lg" />
          </a>
          <a 
            href="https://github.com/KAMAL-02" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-gray-400"
          >
            <FontAwesomeIcon icon={faGithub} size="lg" />
          </a>
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Pages. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
