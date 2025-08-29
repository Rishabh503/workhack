import { connectDB } from "@/lib/db"
import Student from "@/models/studentModel"
import { supabase } from "@/lib/supabase"
import Goal from "@/models/goalModel"   
import Session from "@/models/sessionModel"
import Subject from "@/models/subjectModel"

export async function GET(req) {
  try {
    await connectDB()

    // Get email from URL params
    const { searchParams } = new URL(req.url)
    console.log(searchParams)
    const email = searchParams.get('email')
    console.log(email)

    if (!email) {
      return new Response(JSON.stringify({ error: "Email parameter required" }), { status: 400 })
    }

    // Get user from Supabase
    const { data: supabaseUser, error: supabaseError } = await supabase
      .from('students')
      .select('*')
      .eq('email', email)
      .single()
    console.log(supabaseUser,supabaseError)
    if (supabaseError || !supabaseUser) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
    }

    const thisStudent = await Student.findOne({ 
      supabaseId: supabaseUser.auth_id,
      email: email 
    })
    .populate("goals")
    .populate("subjects")
    .populate("sessions")

    if (!thisStudent) {
      return new Response(JSON.stringify({ error: "Student not found" }), { status: 404 })
    }
    console.log(thisStudent)
    return Response.json({ student: thisStudent, status: "existing" })

  } catch (error) {
    console.error("Error while getting data:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 })
  }
}