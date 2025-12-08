import React, { useState } from "react";
import { ContentFeed } from "./components/ContentFeed";
import { RuleBuilder } from "./components/RuleBuilder";
import { ReviewPanel } from "./components/ReviewPanel";

function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "sans-serif",
        backgroundColor: "#050816",
        color: "#f8f9fa",
      }}
    >
      <div
        style={{
          flex: 2,
          borderRight: "1px solid #333",
          padding: "1.5rem",
        }}
      >
        <h1>Moderation Dashboard</h1>
        <ContentFeed onSelectItem={setSelectedId} />
      </div>
      <div
        style={{
          flex: 1,
          borderRight: "1px solid #333",
          padding: "1.5rem",
        }}
      >
        <RuleBuilder />
      </div>
      <div
        style={{
          flex: 1,
          padding: "1.5rem",
        }}
      >
        {selectedId ? (
          <ReviewPanel contentId={selectedId} />
        ) : (
          <div>Select an item to review</div>
        )}
      </div>
    </div>
  );
}

export default App;
