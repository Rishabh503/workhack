import { connectDB } from "@/lib/db";
import Goal from "@/models/goalModel";
import Student from "@/models/studentModel";
import Subject from "@/models/subjectModel";
import { currentUser } from "@clerk/nextjs/server";

// import { connect } from "mongoose";

export  async function POST(req){
try {
    await connectDB();
    const reqBody=await req.json();
    const {subject,title,deadline}=reqBody;
  
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
   const thisStudent = await Student.findOne({ clerkId: clerkUser.id }).populate("subjects").populate("goals")
   console.log("thisStudent",thisStudent)
   const thisSubject=await Subject.findOne({name:subject})
   const goal={subject:thisSubject._id,title,deadline,student:thisStudent._id};
   const createGoal=await Goal.create(goal);
thisSubject.goals.push(createGoal);
thisStudent.goals.push(createGoal)
await thisSubject.save()
await thisStudent.save()
  return new Response(
      JSON.stringify({ goal: createGoal, status: "created-new" }),
      { status: 201 }
    );
} catch (error) {
    console.error("Error while creating the goal:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
}
}