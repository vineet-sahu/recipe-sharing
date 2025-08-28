import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const TextEditor: React.FC = () => {
  const [content, setContent] = useState<string>("");

  return (
    <div>
      <Editor
        apiKey='0097e2zdsx2wlaq4596n1jixl7d8i8kcwccjreyn3emk5prz'
        init={{
          height: 200,
          menubar: false,
          plugins: [
            "lists",
            "link",
            "anchor",
            "table",
            "paste"
          ],
          toolbar:
            "formatselect | " +
            "bold italic underline | bullist numlist",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        value={content}
        onEditorChange={(newValue: string) => setContent(newValue)}
      />
    </div>
  );
};

export default TextEditor;
