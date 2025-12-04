import React from "react";

interface LayoutProps {
  sidebar: React.ReactNode;
  main: React.ReactNode;
  right?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ sidebar, main, right }) => {
  return (
    <div className="layout">
      <aside className="layout-sidebar">{sidebar}</aside>
      <main className="layout-main">{main}</main>
      {right && <aside className="layout-right">{right}</aside>}
    </div>
  );
};

export default Layout;
