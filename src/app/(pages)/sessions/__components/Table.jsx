"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { DialogGoal } from "./DialogBasedGoal";
import Link from "next/link";

const TableDisplay = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  
function convertTo24Hour(timeStr) {
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes, seconds] = time.split(":").map(Number);

  if (modifier === "PM" && hours < 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  return [hours, minutes, seconds];
}

function getTimeDifference(start, end) {
  if (!start || !end) return "Invalid";

  const [sh, sm, ss] = convertTo24Hour(start);
  const [eh, em, es] = convertTo24Hour(end);

  const startSeconds = sh * 3600 + sm * 60 + ss;
  const endSeconds = eh * 3600 + em * 60 + es;

  let diff = endSeconds - startSeconds;
  if (diff < 0) diff += 24 * 3600;

  const h = String(Math.floor(diff / 3600)).padStart(2, "0");
  const m = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
  const s = String(diff % 60).padStart(2, "0");

  return `${h}:${m}:${s}`;
}




  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await fetch("/api/subjects/user", {
          credentials: "include", //
        });
        const data = await res.json();
        console.log(data.student.sessions);
        setSessions(data.student.sessions || []);
      } catch (err) {
        console.error("Error fetching subjects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  return (
    <div>
      <Table>
        <TableCaption>All Your Subjects.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">Date:</TableHead>
            <TableHead className="text-white">Start</TableHead>
            <TableHead className="text-white">End</TableHead>
            <TableHead className="text-white">Total Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={2}>Loading...</TableCell>
            </TableRow>
          ) : sessions.length > 0 ? (
            sessions.map((session) => (
              <TableRow key={session._id}>
                <TableCell>
                  {new Date(session.date).toISOString().split("T")[0]}
                </TableCell>
                <TableCell className="font-medium">
                  {session.startTime}
                </TableCell>
                <TableCell>{session.endTime}</TableCell>
                <TableCell>
                  {getTimeDifference(session.startTime, session.endTime)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2}>No subjects found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableDisplay;
