"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
// subject deadline title
export default function DeleteGoalForm({ goal }) {
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  console.log(goal, "goal from delete");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/subjects/goals/create/${goal._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        setResponseMsg("✅ Goal deleted successfully!");
      } else {
        setResponseMsg(`❌ ${data.error}`);
      }
    } catch (error) {
      setResponseMsg("❌ Something went wrong. Try again.");
    }
    window.location.reload();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-red-200 hover:bg-red-400 text-black mx-2 ">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-xl">Confirm Delete Goal </DialogTitle>
          </DialogHeader>

          <DialogFooter className="mt-4 flex items-center justify-center ">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="bg-red-600 hover:bg-red-800"
              type="submit"
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
