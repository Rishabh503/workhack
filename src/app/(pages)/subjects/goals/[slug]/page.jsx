'use client';
import { useUser } from '@/context/UserContext';
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
import { useState } from 'react';
import { DialogGoal } from '../../__components/DialogBasedGoal';
import Link from 'next/link';

export default function GoalsviewPage({ params }) {
  const { user, loading } = useUser();
  
  if (loading) return <p>Loading...</p>;
  console.log(user)
  const goals=user.student.goals || []
  console.log(goals)


  return (
    <>
      <div>
   
      <p>Welcome, {user.name}</p>
      </div>
      <div>
         <Table>
        <TableCaption>All Your Subjects.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">Title</TableHead>
            <TableHead className="text-white">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={2}>Loading...</TableCell>
            </TableRow>
          ) : goals.length > 0 ? (
            goals.map((goal) => (
              <TableRow key={goal._id}>
                <TableCell className="font-medium">{goal.title}</TableCell>
                <TableCell>
               {goal.description}
                </TableCell>
                <TableCell>
                    
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
    </>
  );
}
