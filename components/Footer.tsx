
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-gray-600 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} دليل فعاليات المدينة. جميع الحقوق محفوظة.</p>
        <p>مشروع مقدم لجامعة SVU - BWP501</p>
      </div>
    </footer>
  );
};

export default Footer;
