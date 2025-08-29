import { connectDB } from "@/lib/db"
import Student from "@/models/studentModel"
import Subject from "@/models/subjectModel"
import { supabase } from "@/lib/supabase"

export async function PATCH(req, { params }) {
  await connectDB()
  
  const { id } = await params
  const { name, email } = await req.json()

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

    const updatedSubject = await Subject.findByIdAndUpdate(
      id,
      {
        ...(name && { name: name }),
      },
      { new: true }
    )

    return new Response(JSON.stringify({ subject: updatedSubject }), {
      status: 200,
    })
  } catch (error) {
    console.error("PATCH error:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    })
  }
}