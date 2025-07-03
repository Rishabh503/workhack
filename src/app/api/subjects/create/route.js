import { connectDB } from "@/lib/db";
import Student from "@/models/studentModel";
import Subject from "@/models/subjectModel";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req) {
  try {
    await connectDB();
    
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const thisStudent = await Student.findOne({ clerkId: clerkUser.id });
    const reqBody = await req.json();
    const { name } = reqBody;

    const existingSubject = await Subject.findOne({ name });

    if (existingSubject) {
      // Check if student is already linked to the subject
      const isAlreadyLinked = existingSubject.student.some(
        (stdId) => stdId.toString() === thisStudent._id.toString()
      );

      if (!isAlreadyLinked) {
        existingSubject.student.push(thisStudent._id);
        await existingSubject.save();

        thisStudent.subjects.push(existingSubject._id);
        await thisStudent.save();

        return new Response(
          JSON.stringify({ subject: existingSubject, status: "linked-to-existing" }),
          { status: 200 }
        );
      }

      // Student already linked to existing subject
      return new Response(
        JSON.stringify({ error: "Subject already linked to student" }),
        { status: 400 }
      );
    }

    // If subject does not exist, create a new one
    const newSubject = await Subject.create({
      name,
      student: [thisStudent._id],
    });

    thisStudent.subjects.push(newSubject._id);
    await thisStudent.save();

    return new Response(
      JSON.stringify({ subject: newSubject, status: "created-new" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error while creating subject:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}


