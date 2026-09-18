"use client";

import { ToastContainer } from "react-toastify";
// Note: If you're using react-toastify v11+, you can skip the CSS import below.
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}