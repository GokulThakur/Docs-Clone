// "use client";

// import React, { createContext, useContext, useState } from "react";
// import { type Editor } from "@tiptap/react";

// interface EditorContextType {
//   editor: Editor | null;
//   setEditor: (editor: Editor | null) => void;
// }

// const EditorContext = createContext<EditorContextType | undefined>(undefined);

// export const EditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [editor, setEditor] = useState<Editor | null>(null);

//   return (
//     <EditorContext.Provider value={{ editor, setEditor }}>
//       {children}
//     </EditorContext.Provider>
//   );
// };

// export const useEditorContext = () => {
//   const context = useContext(EditorContext);
//   if (!context) {
//     throw new Error("useEditorContext must be used within an EditorProvider");
//   }
//   return context;
// };
