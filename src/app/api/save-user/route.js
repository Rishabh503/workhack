import { connectDB } from "@/lib/db"
import Student from "@/models/studentModel"
import { supabase } from "@/lib/supabase"
import Goal from "@/models/goalModel"   
import Session from "@/models/sessionModel"

export async function GET(req) {
  try {
    await connectDB()

    // get email from URL params
    const { searchParams } = new URL(req.url)
    const email = searchParams.get("email")

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email parameter required" }),
        { status: 400 }
      )
    }

    // fetch user from Supabase
    const { data: supabaseUser, error: supabaseError } = await supabase
      .from("students")
      .select("*")
      .eq("email", email)
      .single()

    if (supabaseError || !supabaseUser) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401 }
      )
    }

    // check if student already exists in Mongo
    let thisStudent = await Student.findOne({
      supabaseId: supabaseUser.auth_id,
      email,
    })

    // if not, create new student
   if (!thisStudent) {
  thisStudent = await Student.create({
    supabaseId: supabaseUser.auth_id,
    email,
    name: supabaseUser.name || "Unknown",  // 👈 add this
    subjects: [],
    goals: [],
    sessions: [],
  })
}


    return Response.json({
      student: thisStudent,
      status: thisStudent.isNew ? "created" : "existing",
    })
  } catch (error) {
    console.error("Error while saving user:", error)
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    )
  }
}
