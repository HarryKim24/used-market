import React from "react";
import LocalNav from "./nav/LocalNav";

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="min-h-[calc(100vh-56px)] bg-white">
      <div className="mx-w-[2520px] mx-auto px-6 md:px-10 xl:px-20 py-2">
        {children}
      </div>
    </div>
  );
};

export default Container;
