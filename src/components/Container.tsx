import React from "react";
import LocalNav from "./nav/LocalNav";

interface ContainerProps {
  localNavTitle?: string;
  children: React.ReactNode;
}

const Container = ({ localNavTitle, children }: ContainerProps) => {
  return (
    <div className="min-h-[calc(100vh-56px)] bg-white">
      {localNavTitle && <LocalNav title={localNavTitle} />}
      <div className="mx-w-[2520px] mx-auto px-6 md:px-10 xl:px-20 py-6">
        {children}
      </div>
    </div>
  );
};

export default Container;
