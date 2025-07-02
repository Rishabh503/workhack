import React from "react";

const LayoutWrapper = ({ children }) => {
  return (
    <div className=" min-h-screen min-w-full bg-[#0f172a] text-white py-12 px-6">
      {/* <p>is layout rinnig its i</p> */}
      {children}
    </div>
  );
};

export default LayoutWrapper;
