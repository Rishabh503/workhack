import { connectDB } from "@/lib/db";
import Goal from "@/models/goalModel";
import Student from "@/models/studentModel";
import Subject from "@/models/subjectModel";


export async function PATCH(req, { params }) {
  await connectDB();

  const { id } = await params;
console.log(id)
  const { title, deadline, description } = await req.json();

  try {
    const updatedGoal = await Goal.findByIdAndUpdate(
      id,
      {
        ...(title && { title }),
        ...(deadline && { deadline }),
        ...(description && { description }),
      },
      { new: true }
    );

    return new Response(JSON.stringify({ goal: updatedGoal }), {
      status: 200,
    });

  } catch (error) {
    console.error("PATCH error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function DELETE(req,{params}){
    await connectDB();


    const {id}= params;
    console.log("ye hai id", params)
    try {
        const deletedGoal=await Goal.findByIdAndDelete(id);
        console.log(deletedGoal)
        if(!deletedGoal) {
            console.log("j")
            return new Response(JSON.stringify({
                erorr:"Goal not found or error deleting goal"
            }),{status:404})
        }

        // removing from students 
        await Student.updateOne(
            {_id:deletedGoal.student},
            { $pull: { goals: id } }
        )

        // removing from subjects 
        await Subject.updateOne(
            {_id:deletedGoal.subject},
            { $pull: { goals: id } }
        )
          return new Response(JSON.stringify({ status: "deleted", id }), {
      status: 200,
    });
    } catch (error) {
         console.error("DELETE error:", err);
    return new Response(JSON.stringify({ error: "Failed to delete goal" }), {
      status: 500,
    });
    }
}
