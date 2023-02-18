import React from "react";
import ListItem from "./ListItem";

export default function List({ items, removeItem, setListItem }) {
  return (
    <div className="grid gap-1">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <ListItem
            key={id}
            title={title}
            setTitle={(newTitle) => setListItem(id, newTitle)}
            remove={() => removeItem(id)}
          />
        );
      })}
    </div>
  );
}
