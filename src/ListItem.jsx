import React, { useEffect, useRef, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function ListItem({ title, setTitle, remove }) {
  const [isEditing, setIsEditing] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (isEditing) {
      const textarea = ref.current;
      textarea.focus();
      textarea.style.height = textarea.scrollHeight + "px";
      textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    }
  }, [isEditing]);

  const handleTextareaBlur = (e) => {
    setTitle(e.target.value);
    setIsEditing(false);
  };

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  return (
    <article className="group flex min-w-0 items-center justify-between gap-4 rounded-lg p-2 pr-4 duration-200 ease-linear focus-within:bg-slate-100 hover:bg-slate-100">
      {isEditing ? (
        <textarea
          ref={ref}
          defaultValue={title}
          onBlur={handleTextareaBlur}
          className="w-full resize-none rounded py-0.5 pl-2 tracking-wider text-slate-500 outline-dashed outline-2 outline-slate-500/50 duration-200 ease-linear"
        ></textarea>
      ) : (
        <p
          ref={ref}
          className="min-w-0 break-words py-0.5 pl-2 tracking-wider duration-200 ease-linear group-hover:text-slate-500"
        >
          {title}
        </p>
      )}
      <div className="flex gap-1.5">
        <button
          type="button"
          onClick={handleEditButtonClick}
          className="text-sm text-green-500 outline-offset-2 outline-slate-500/80 duration-200 ease-linear hover:text-green-600"
        >
          <FaEdit />
        </button>
        <button
          type="button"
          onClick={remove}
          className="text-sm text-red-500 outline-offset-2 outline-slate-500/80 duration-200 ease-linear hover:text-red-600"
        >
          <FaTrash />
        </button>
      </div>
    </article>
  );
}
