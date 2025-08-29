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
import { useUser } from "@/context/UserContext";
// import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
// subject deadline title 
export function DialogGoal({subjectName}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
    const { userEmail } = useUser()
console.log("emaol h ye",userEmail)
   
  const handleSubmit = async (e) => {
//  console.log(email)
    e.preventDefault();
    setLoading(true);
    setResponseMsg("");
    setDescription("");
console.log("checking props",subjectName,userEmail)
    try {
      const res = await fetch("/api/subjects/goals/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subject: subjectName  , title,deadline,description , email:userEmail }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponseMsg(`✅ Goal  added successfully!`);
      } else {
        setResponseMsg(`❌ ${data.error}`);
      }
    } catch (error) {
      setResponseMsg("❌ Something went wrong. Try again.");
    }

    setLoading(false);
    setTitle(""); 
    setDeadline("")
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-amber-300 hover:bg-amber-400" variant="outline">
          Add New Goal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-3xl">Add Goal </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="subject">Title</Label>
              <Input
                id="subject"
                name="subject"
                placeholder="e.g. Math, Physics"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subject">Description</Label>
              <Input
                id="description"
                name="description"
                placeholder="add the decription"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subject">Deadline</Label>
              <Input
              type='date'
                id="subject"
                name="subject"
                placeholder="e.g. Math, Physics"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
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
