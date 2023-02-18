import React, { useEffect } from "react";

function classNames(...classList) {
  return classList.filter(Boolean).join(" ");
}

export default function Alert({ message, type, removeAlert, list }) {
  useEffect(() => {
    const id = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => {
      clearTimeout(id);
    };
  }, [removeAlert, list]);

  return (
    <p
      className={classNames(
        "mb-4 rounded-lg py-1 text-center text-xs tracking-wider sm:text-sm",
        type === "success" && "bg-teal-200 text-green-800",
        type === "danger" && "bg-rose-100 text-rose-900"
      )}
    >
      {message}
    </p>
  );
}
