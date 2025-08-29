import { connectDB } from "@/lib/db"
import Goal from "@/models/goalModel"
import Student from "@/models/studentModel"
import Subject from "@/models/subjectModel"
import { supabase } from "@/lib/supabase"

export async function POST(req) {
  try {
    await connectDB()

    const reqBody = await req.json()
    const { subject, title, deadline, description, email } = reqBody
    console.log(email)

    if (!email) {
      return new Response(JSON.stringify({ error: "Email required" }), { status: 400 })
    }

    // Get user from Supabase
    const { data: supabaseUser, error: supabaseError } = await supabase
      .from('students')
      .select('*')
      .eq('email', email)
      .single()

    if (supabaseError || !supabaseUser) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
    }

    const thisStudent = await Student.findOne({ 
      supabaseId: supabaseUser.auth_id,
      email: email 
    }).populate("subjects").populate("goals")

    const thisSubject = await Subject.findOne({ name: subject })

    const goal = {
      subject: thisSubject._id,
      title,
      deadline,
      student: thisStudent._id,
      description
    }

    const createGoal = await Goal.create(goal)

    thisSubject.goals.push(createGoal)
    thisStudent.goals.push(createGoal)

    await thisSubject.save()
    await thisStudent.save()

    return new Response(
      JSON.stringify({ goal: createGoal, status: "created-new" }),
      { status: 201 }
    )

  } catch (error) {
    console.error("Error while creating the goal:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 })
  }
}

export async function PATCH(req) {
  try {
    await connectDB()

    const body = await req.json()
    const { goalId, title, deadline, description, email } = body

    if (!goalId) {
      return new Response(JSON.stringify({ error: "Missing goalId" }), {
        status: 400,
      })
    }

    // Verify user with Supabase if email provided
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
      goalId,
      {
        ...(title && { title }),
        ...(deadline && { deadline }),
        ...(description && { description }),
      },
      { new: true }
    )

    if (!updatedGoal) {
      return new Response(JSON.stringify({ error: "Goal not found" }), {
        status: 404,
      })
    }

    return new Response(JSON.stringify({ goal: updatedGoal }), {
      status: 200,
    })

  } catch (error) {
    console.error("Error while updating goal:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    })
  }
}