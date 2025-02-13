import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./RichTextEditor.css";

// Custom Toolbar Configurations
const modules = {
  toolbar: [
    [{ font: [] }, { size: [] }], // Font and size
    ["bold", "italic", "underline", "strike"], // Text styles
    [{ color: [] }, { background: [] }], // Text and background color
    [{ script: "sub" }, { script: "super" }], // Subscript/superscript
    [{ header: [1, 2, 3, 4, 5, 6, false] }], // Headers
    [{ align: [] }], // Alignment
    ["blockquote", "code-block"], // Blockquote and code block
    [{ list: "ordered" }, { list: "bullet" }], // Lists
    ["link", "image", "video"], // Links, images, and videos
    ["clean"], // Remove formatting
  ],
};

const formats = [
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "script",
  "header",
  "align",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "link",
  "image",
  "video",
];

interface RichEditorProps {
  value: string;
  setValue: (value: string) => void;
}

const RichTextEditor = ({ value, setValue }: RichEditorProps) => {
  return (
    // <div className="mx-auto max-w-4xl rounded-lg bg-white p-4 shadow-md dark:bg-gray-800 dark:text-gray-100">
    //   <h3 className="mb-4 text-center text-xl font-semibold">
    //     Rich Text Editor
    //   </h3>
    <ReactQuill
      theme="snow"
      value={value}
      onChange={setValue}
      modules={modules}
      formats={formats}
      placeholder="Write your scenario here..."
      className="rounded-lg border border-gray-300 bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
    />
    // </div>
  );
};

export default RichTextEditor;
