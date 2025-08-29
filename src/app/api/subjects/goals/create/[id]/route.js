import { connectDB } from "@/lib/db"
import Goal from "@/models/goalModel"
import Student from "@/models/studentModel"
import Subject from "@/models/subjectModel"
import { supabase } from "@/lib/supabase"

export async function PATCH(req, { params }) {
  await connectDB()
  
  const { id } = await params
  const { title, deadline, description, email } = await req.json()

  try {
    // Verify user with Supabase
    if (email) {
      const { data: supabaseUser, error } = await supabase
        .from('students')
        .select('*')
        .eq('email', email)
        .single()

      if (error || !supabaseUser) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
        })
      }
    }

    const updatedGoal = await Goal.findByIdAndUpdate(
      id,
      {
        ...(title && { title }),
        ...(deadline && { deadline }),
        ...(description && { description }),
      },
      { new: true }
    )

    return new Response(JSON.stringify({ goal: updatedGoal }), {
      status: 200,
    })
  } catch (error) {
    console.error("PATCH error:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    })
  }
}

export async function DELETE(req, { params }) {
  await connectDB()
  
  const { id } = params
  const { email } = await req.json()

  try {
    // Verify user with Supabase
    if (email) {
      const { data: supabaseUser, error } = await supabase
        .from('students')
        .select('*')
        .eq('email', email)
        .single()

      if (error || !supabaseUser) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
        })
      }
    }

    const deletedGoal = await Goal.findByIdAndDelete(id)

    if (!deletedGoal) {
      return new Response(JSON.stringify({
        error: "Goal not found or error deleting goal"
      }), { status: 404 })
    }

    // Remove from students
    await Student.updateOne(
      { _id: deletedGoal.student },
      { $pull: { goals: id } }
    )

    // Remove from subjects
    await Subject.updateOne(
      { _id: deletedGoal.subject },
      { $pull: { goals: id } }
    )

    return new Response(JSON.stringify({ status: "deleted", id }), {
      status: 200,
    })

  } catch (error) {
    console.error("DELETE error:", error)
    return new Response(JSON.stringify({ error: "Failed to delete goal" }), {
      status: 500,
    })
  }
}
