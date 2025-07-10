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
export default function UpdateSubject({subject}) {
const [title, setTitle] = useState( subject.name || "");
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  console.log(subject)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg("");

    try {
      const res = await fetch(`/api/subjects/create/${subject._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({  name:title }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponseMsg(`✅ Subject  updated successfully!`);
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
         <Button className='bg-blue-200 hover:bg-blue-400 text-black mx-2 '>
                    Edit
          </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-xl">Change Name From {subject.name} to {title} </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="subject">New Name</Label>
              <Input
                id="subject"
                name="subject"
                placeholder="e.g. Math, Physics"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
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
