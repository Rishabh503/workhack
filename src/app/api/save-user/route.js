import { connectDB } from "@/lib/db"
import Student from "@/models/studentModel";
import { currentUser } from "@clerk/nextjs/server";


export async function GET() {
    try {
        await connectDB();
        const clerkUser=await currentUser()
         if (!clerkUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const existingStudent=await Student.findOne({
        clerkId:clerkUser.id
    })

    if(!existingStudent){
        const newStudent=await Student.create({
                 clerkId: clerkUser.id,
        email: clerkUser.emailAddresses[0].emailAddress,
        name: clerkUser.fullName,
        })

        return Response.json({ student: newStudent, status: "created" });
    }
    // console.log(existingStudent)
   return Response.json({ student: existingStudent, status: "existing" });
    } catch (error) {
        console.log(error)
        console.error("error saving the user ",error)
    }
}