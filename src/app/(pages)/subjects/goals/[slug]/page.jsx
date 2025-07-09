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
import { use, useState } from 'react';

import Link from 'next/link';
import UpdateGoalForm from '../__components/UpdateGoalForm';
import DeleteGoalForm from '../__components/DeleteGoalForm';


export default function GoalsviewPage({ params }) {
  const { user, loading } = useUser();
    const { slug } = use(params); 
  console.log(slug)
  if (loading) return <p>Loading Goals...</p>;
  console.log(user)
  const goals=user.student.goals.filter((goal)=>goal.subject==slug) || []
 const subjName=user.student.subjects.filter((s)=>s._id==slug)[0].name || "Loading"

 console.log(subjName)
  return (
    <>
      <div>
      <p className='flex items-end  justify-between'>
      Goals <span className='font-semibold text-2xl px-6 text-gray-300'>
        {subjName}
        </span>  
      </p>
      
      </div>
      <div>
         <Table>
        <TableCaption>All Your  {subjName} Goals.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">Title</TableHead>
            <TableHead className="text-white">Description</TableHead>
            <TableHead className="text-white">Deadline</TableHead>
            <TableHead className="text-white">Actions</TableHead>
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
                    {goal.deadline}
                </TableCell>
                <TableCell>
                    {goal.completionStatus}
                </TableCell>
                <TableCell >
                  {/* update button  */}
                  <UpdateGoalForm goal={goal}/>
                
                  <Button className='bg-green-200 hover:bg-green-400 px-4 text-black'>
                    Change Status
                  </Button>
                  {/* delete button  */}
                <DeleteGoalForm  goal={goal}/>
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
