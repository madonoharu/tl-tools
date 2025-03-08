"use client";
import { useState } from "react";

import StudentList from "./StudentList";
import { CloseButton } from "./IconButtons";
import StudentEditor from "./StudentEditor";

export default function CollectionEditor() {
  const [selectedId, setSelectedId] = useState(0);

  return (
    <div>
      <CloseButton onClick={() => setSelectedId(0)} />
      {selectedId ? (
        <StudentEditor id={selectedId} />
      ) : (
        <StudentList onSelect={setSelectedId} />
      )}
    </div>
  );
}
