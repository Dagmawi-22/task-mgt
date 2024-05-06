import React from "react";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-xl font-bold">Left Aligned Heading</h1>
      </div>
      <div className="flex items-center">
        {/* Right-aligned content */}
        <span className="mr-4">Item 1</span>
        <span className="mr-4">Item 2</span>
        <span>Item 3</span>
      </div>
    </header>
  );
};

export default Header;
