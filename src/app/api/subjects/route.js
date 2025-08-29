// app/api/subjects/route.js
import { connectDB } from "@/lib/db"
import Student from "@/models/studentModel" 
import Subject from "@/models/subjectModel"
import { supabase } from "@/lib/supabase"

export async function GET(req) {
  try {
    await connectDB()

    // Get email from URL params
    const { searchParams } = new URL(req.url)
    const email = searchParams.get("email")

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email parameter required" }),
        { status: 400 }
      )
    }

    // Fetch user from Supabase
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

    // Find student in MongoDB
    const thisStudent = await Student.findOne({
      supabaseId: supabaseUser.auth_id,
      email: email
    }).populate("subjects")

    if (!thisStudent) {
      return new Response(
        JSON.stringify({ error: "Student not found" }),
        { status: 404 }
      )
    }

    // Get all subjects for this student
    const subjects = thisStudent.subjects || []

    return Response.json({
      subjects: subjects.map(subject => ({
        id: subject._id,
        name: subject.name
      }))
    })

  } catch (error) {
    console.error("Error fetching subjects:", error)
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    )
  }
}