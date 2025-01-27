import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useDispatch } from "react-redux";
import { updateArticleContent } from "../reducers/articleReducer";
import { useEffect } from "react";
import { $getRoot } from "lexical";

const SaveButtonLexicalEditor: React.FC<{ articleId: number; setIsEditable: (editable: boolean) => void }> = ({ articleId, setIsEditable }) => {
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
      const content = editorRoot.getTextContent();
      dispatch(updateArticleContent({ id: articleId, content }));
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
