import React from "react";
import LocalNav from "./nav/LocalNav";
import Categories from "./categories/Categories";

interface ContainerProps {
  localNavTitle?: string;
  children: React.ReactNode;
}

const Container = ({ localNavTitle, children }: ContainerProps) => {
  return (
    <div className="min-h-[calc(100vh-56px)] bg-white sm:px-10 lg:px-20">
      {localNavTitle && <LocalNav title={localNavTitle} />}
      <div className="mx-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 py-6">
        {children}
      </div>
    </div>
  );
};

export default Container;
