import { connectDB } from "@/lib/db"
import Student from "@/models/studentModel"
import Subject from "@/models/subjectModel"
import { supabase } from "@/lib/supabase"

export async function POST(req) {
  try {
    await connectDB()

    const reqBody = await req.json()
    const { name, email } = reqBody
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
console.log(supabaseUser, supabaseError)

    if (supabaseError || !supabaseUser) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
    }

    // Find student in MongoDB
    const thisStudent = await Student.findOne({ 
      supabaseId: supabaseUser.auth_id,
      email: email 
    })

    if (!thisStudent) {
      return new Response(JSON.stringify({ error: "Student not found" }), { status: 404 })
    }

    const existingSubject = await Subject.findOne({ name })

    if (existingSubject) {
      // Check if student is already linked to the subject
      const isAlreadyLinked = existingSubject.student.some(
        (stdId) => stdId.toString() === thisStudent._id.toString()
      )

      if (!isAlreadyLinked) {
        existingSubject.student.push(thisStudent._id)
        await existingSubject.save()

        thisStudent.subjects.push(existingSubject._id)
        await thisStudent.save()

        return new Response(
          JSON.stringify({ subject: existingSubject, status: "linked-to-existing" }),
          { status: 200 }
        )
      }

      return new Response(
        JSON.stringify({ error: "Subject already linked to student" }),
        { status: 400 }
      )
    }

    // Create new subject
    const newSubject = await Subject.create({
      name,
      student: [thisStudent._id],
    })

    thisStudent.subjects.push(newSubject._id)
    await thisStudent.save()

    return new Response(
      JSON.stringify({ subject: newSubject, status: "created-new" }),
      { status: 201 }
    )

  } catch (error) {
    console.error("Error while creating subject:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 })
  }
}