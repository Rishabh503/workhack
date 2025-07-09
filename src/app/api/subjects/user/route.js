import { connectDB } from "@/lib/db";
import Student from "@/models/studentModel";
import { currentUser } from "@clerk/nextjs/server";
import Subject from "@/models/subjectModel";
import Goal from "@/models/goalModel";


export async function GET(){
    try {
        await connectDB();
    
    const clerkUser = await currentUser();
    console.log("clerkUser",clerkUser)
    if (!clerkUser) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const thisStudent = await Student.findOne({ clerkId: clerkUser.id })
  .populate("goals")
  .populate("subjects")


    return Response.json({ student: thisStudent, status: "existing" });
    } catch (error) {
        console.error("Error while getting data:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}