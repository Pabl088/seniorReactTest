import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useDispatch } from "react-redux";
import { updateArticleTitle, updateArticleContent } from "../reducers/articleReducer";
import { useEffect } from "react";
import { $getRoot } from "lexical";

const SaveButtonLexicalEditor: React.FC<{ articleId: number; setIsEditable: (editable: boolean) => void; toEdit: "TITLE" | "CONTENT" }> = ({
  articleId,
  setIsEditable,
  toEdit,
}) => {
  const dispatch = useDispatch();
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.setEditable(true);
    return () => {
      editor.setEditable(false);
    };
  }, [editor]);

  const handleSave = () => {
    editor.read(() => {
      const editorRoot = $getRoot();
      const text = editorRoot.getTextContent();
      if (toEdit === "TITLE") {
        dispatch(updateArticleTitle({ id: articleId, title: text }));
      } else {
        dispatch(updateArticleContent({ id: articleId, content: text }));
      }
      setIsEditable(false);
    });
  };

  return (
    <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      Save
    </button>
  );
};

export default SaveButtonLexicalEditor;
