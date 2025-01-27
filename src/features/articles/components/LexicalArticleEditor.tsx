import { InitialConfigType, LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { $getRoot, $createTextNode, $createParagraphNode } from "lexical";
import { useState } from "react";
import SaveButtonLexicalEditor from "./SaveButtonLexicalEditor";

export const LexicalArticleEditor: React.FC<{ articleId: number; text: string; toEdit: "TITLE" | "CONTENT" }> = ({ articleId, text, toEdit }) => {
  const [isEditable, setIsEditable] = useState(false);

  const editorConfig: InitialConfigType = {
    namespace: "ArticleEditor",
    theme: {
      paragraph: "mb-2 text-white",
    },
    editorState: editor => {
      editor.update(() => {
        const root = $getRoot();
        root.clear();
        const paragraphNode = $createParagraphNode();
        paragraphNode.append($createTextNode(text || ""));
        root.append(paragraphNode);
      });
    },
    editable: false,
    onError: (error: Error) => {
      console.error("Lexical error:", error);
    },
  };

  return (
    <div>
      <LexicalComposer initialConfig={editorConfig}>
        <div className="bg-gray-800 rounded-lg p-4">
          <PlainTextPlugin
            contentEditable={
              <ContentEditable
                className={`${toEdit === "TITLE" ? "min-h-[50px] text-xl font-bold text-blue-500" : "min-h-[200px] text-white"} bg-gray-900 text-left p-2`}
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>

        <div className="mt-4 flex space-x-2">
          {isEditable ? (
            <SaveButtonLexicalEditor articleId={articleId} setIsEditable={setIsEditable} toEdit={toEdit} />
          ) : (
            <button onClick={() => setIsEditable(true)} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
              Edit
            </button>
          )}
        </div>
      </LexicalComposer>
    </div>
  );
};
