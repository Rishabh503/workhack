import { connectDB } from "@/lib/db";
import Student from "@/models/studentModel";
import Subject from "@/models/subjectModel";

export async function PATCH(req, { params }) {
  await connectDB();

  const { id } = await params;
console.log(id)
  const { name } = await req.json();

  try {
    const updatedSubject = await Subject.findByIdAndUpdate(
      id,
      {
        ...(name && { name:name }),
      },
      { new: true }
    );

    return new Response(JSON.stringify({ subject: updatedSubject }), {
      status: 200,
    });

  } catch (error) {
    console.error("PATCH error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}