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
    const {subject,title,deadline,description}=reqBody;
    console.log("request body",reqBody)
  
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
   const thisStudent = await Student.findOne({ clerkId: clerkUser.id }).populate("subjects").populate("goals")
   console.log("thisStudent",thisStudent)
   const thisSubject=await Subject.findOne({name:subject})
   const goal={subject:thisSubject._id,
    title,
    deadline,
    student:thisStudent._id,
    description};
   const createGoal=await Goal.create(goal);
   console.log("naya goal" ,createGoal)
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

export async function PATCH(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { goalId, title, deadline, description } = body;

    if (!goalId) {
      return new Response(JSON.stringify({ error: "Missing goalId" }), {
        status: 400,
      });
    }

    // Find and update the goal
    const updatedGoal = await Goal.findByIdAndUpdate(
      goalId,
      {
        ...(title && { title }),
        ...(deadline && { deadline }),
        ...(description && { description }),
      },
      { new: true } // Return the updated document
    );

    if (!updatedGoal) {
      return new Response(JSON.stringify({ error: "Goal not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ goal: updatedGoal }), {
      status: 200,
    });

  } catch (error) {
    console.error("Error while updating goal:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
