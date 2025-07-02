"use client";
import { useEffect } from "react";

const SyncUser = () => {
  useEffect(() => {
    const sync = async () => {
      await fetch("/api/save-user");
    };
    sync();
  }, []);

  return null;
};

export default SyncUser;
