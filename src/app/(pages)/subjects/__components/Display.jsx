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
import { DialogGoal } from "./DialogBasedGoal";
import Link from "next/link";

const Display = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await fetch("/api/subjects/user", {
          credentials: "include", // 
        });
        const data = await res.json();
        console.log(data.student.subjects)
        setSubjects(data.student.subjects || []);
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
            <TableHead className="text-white">Subject</TableHead>
            <TableHead className="text-white">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={2}>Loading...</TableCell>
            </TableRow>
          ) : subjects.length > 0 ? (
            subjects.map((subject) => (
              <TableRow key={subject._id}>
                <TableCell className="font-medium">{subject.name}</TableCell>
                <TableCell>
                 <DialogGoal subjectName={subject.name}/>
               
                </TableCell>
                <TableCell>
                    <Button>
                       <Link href={`/subjects/goals/${subject._id}`}>
                        View All Goals 
                       </Link>
                    </Button>
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

export default Display;
