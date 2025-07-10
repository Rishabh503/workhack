import { connectDB } from "@/lib/db";
import Goal from "@/models/goalModel";

export async function PATCH(req) {
  await connectDB();
  try {
    const reqBody = await req.json();
    const { goalId, status } = reqBody;

    console.log("Request Body:", reqBody);

    const goal=await Goal.findByIdAndUpdate(
      goalId,
      {
        ...(status !== undefined && { completionStatus: status }), 
      },
      { new: true }
    );
    console.log(goal)
    return new Response(JSON.stringify({ goal:goal, message: "Goal updated successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating goal:", error);
    return new Response(JSON.stringify({ error: "Failed to update goal" }), {
      status: 500,
    });
  }
}
