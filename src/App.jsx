import React, { useState, useEffect, useCallback } from "react";
import List from "./List";
import Alert from "./Alert";

export default function App() {
  const [title, setTitle] = useState("");
  const [list, setList] = useState(() => {
    let list = JSON.parse(localStorage.getItem("list"));
    return list || [];
  });
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const showAlert = useCallback((show = false, message = "", type = "") => {
    setAlert({ show, message, type });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title) {
      const newItem = { id: new Date().getTime().toString(), title };
      setList((prev) => [...prev, newItem]);
      showAlert(true, "Item Added to the List", "success");
      setTitle("");
    } else {
      showAlert(true, "Please Enter Value", "danger");
    }
  };

  const removeItem = (id) => {
    setList((prev) => prev.filter((item) => item.id !== id));
    showAlert(true, "Item Removed", "danger");
  };

  const setListItem = (id, title) => {
    setList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, title };
        }
        return item;
      })
    );
    showAlert(true, "Value Changed", "success");
  };

  const clearList = () => {
    if (confirm("Do you want to clear all items?")) {
      setList([]);
      showAlert(true, "Empty List", "danger");
    }
  };

  return (
    <main className="grid min-h-screen items-start justify-items-center bg-slate-100 p-4 py-16 text-sm text-slate-800 sm:py-32 sm:text-base">
      <section className="w-full max-w-xl rounded-xl bg-white p-6 shadow-lg duration-200 ease-linear hover:shadow-black/20 sm:p-8">
        <form onSubmit={handleSubmit} className="grocery-form">
          {alert.show && (
            <Alert removeAlert={showAlert} list={list} {...alert} />
          )}
          <h3 className="mb-4 text-center text-xl font-bold tracking-wider text-cyan-900 sm:text-2xl">
            Grocery Bud
          </h3>
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-0">
            <input
              type="text"
              placeholder="eg. Eggs"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg bg-slate-100 py-2 px-4 text-slate-500 outline-0 ring-inset ring-blue-400 focus:ring-2 sm:rounded-r-none"
            />
            <button
              type="submit"
              className="rounded-lg bg-blue-200 px-3.5 py-2 tracking-wider outline-0 ring-inset ring-blue-400 transition-colors duration-200 hover:bg-blue-400 hover:text-white focus:ring-2 sm:rounded-l-none"
            >
              Add
            </button>
          </div>
        </form>
        {list.length > 0 && (
          <div className="mt-4">
            <List
              items={list}
              removeItem={removeItem}
              setListItem={setListItem}
            />
            <button
              onClick={clearList}
              className="mx-auto mt-4 block rounded-lg bg-red-400 px-3.5 py-2 tracking-wider text-white outline-0 ring-red-500 transition-colors duration-200 hover:bg-red-500 focus:ring-2"
            >
              Clear Items
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
