import { connectDB } from "@/lib/db";
import Student from "@/models/studentModel";

export async function PATCH() {
  try {
    await connectDB();

    const result = await Student.updateMany(
      { goals: { $exists: false } },
      { $set: { goals: [] } }
    );

    return Response.json({
      message: "Goals field initialized",
      matched: result.matchedCount,
      modified: result.modifiedCount,
    });
  } catch (error) {
    console.error("Fix goals error:", error);
    return new Response(JSON.stringify({ error: "Failed to update students" }), { status: 500 });
  }
}
