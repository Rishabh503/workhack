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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useUser } from "@/context/UserContext";

// subject deadline title 
export function UpdateStatus({goal}) {
  const [title, setTitle] = useState("");

  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
    console.log("goal goal goal",goal)
  const options=[{status:'PENDING',percentage:0},
    {status:'PARTIAL DONE',percentage:25},
    {status:'HALF DONE',percentage:50},
   { status:'ALMOST DONE',percentage:75},
     {status:'COMPLETED',percentage:100}]
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg("");

    try {
      const res = await fetch("/api/subjects/goals/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ goalId:goal._id,status:title }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponseMsg(`✅ Status updated successfully!`);
      } else {
        setResponseMsg(`❌ ${data.error}`);
      }
    } catch (error) {
      setResponseMsg("❌ Something went wrong. Try again.");
    }

    setLoading(false);
    setTitle(""); 

  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-300 hover:bg-green-400 text-black" variant="outline">
        Update Status
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-3xl"></DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Update</Label>
              <Select value={title} onValueChange={(value) => setTitle(value)} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                
                <SelectContent>
                  {options.map((s)=>(
                  <SelectItem value={s.status}>{s.status}   - {s.percentage}%</SelectItem>

                ))}
                  </SelectContent>

              </Select>
            </div>
            {responseMsg && (
              <p className="text-sm text-center text-gray-300">{responseMsg}</p>
            )}
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
