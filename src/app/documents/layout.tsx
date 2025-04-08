import React from "react";

interface documentLayoutProps {
  children: React.ReactNode;
}
const documentsLayout = ({ children }: documentLayoutProps) => {
  return (
    <>
      <div>{children}</div>
    </>
  );
};

export default documentsLayout;
