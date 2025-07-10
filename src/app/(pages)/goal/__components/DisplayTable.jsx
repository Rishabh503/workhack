'use client';
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
import { useUser } from '@/context/UserContext';
import DeleteGoalForm from '../../subjects/goals/__components/DeleteGoalForm';
import UpdateGoalForm from '../../subjects/goals/__components/UpdateGoalForm';
import { DialogGoal } from "./DialogBasedGoal";
import { UpdateStatus } from "./UpdateStatus";




export default function DisplayTable() {
  const { user, loading } = useUser();
   console.log("user hu me ",user)
  if (loading) return <p>Loading Goals...</p>;
  console.log(user)
  const goals=user.student.goals || []
  console.log("all goals",goals)
    const subjects=user.student.subjects  || []
    console.log(subjects)

   function subjName(subjId){
       const name= subjects.filter((sub)=>sub._id==subjId)
       console.log(name)
       return name[0].name
   }

  return (
    <>
      <div>
      <p className='flex items-end text-2xl font-semibold text-gray-400  justify-between'>
      All Goals <span className='font-semibold text-2xl px-6 text-gray-300'>
        <DialogGoal/>
        </span>  
      </p>
      
      </div>
      <div>
         <Table>
        <TableCaption>All Your  Goals.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">Title</TableHead>
            <TableHead className="text-white">Description</TableHead>
            <TableHead className="text-white">Subject</TableHead>
            <TableHead className="text-white">Deadline</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-white text-center ">Actions</TableHead>
        
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
               {subjName(goal.subject)}
                </TableCell>
                <TableCell>
                    {new Date(goal.deadline).toISOString().split("T")[0]}
                </TableCell>
                <TableCell>
                    {goal.completionStatus}
                </TableCell>
                <TableCell className='flex justify-between items-center' >
                  {/* update button  */}
                  <UpdateGoalForm goal={goal}/>
                
                  <UpdateStatus goal={goal} />
                
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
