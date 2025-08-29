// app/api/study-planner/route.js
import { connectDB } from "@/lib/db"
import Goal from "@/models/goalModel"
import Student from "@/models/studentModel"
import Subject from "@/models/subjectModel"
import { supabase } from "@/lib/supabase"
import { GoogleGenerativeAI } from '@google/generative-ai'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

export async function POST(req) {
  try {
    await connectDB()

    const reqBody = await req.json()
    const { subject, examDate, syllabus, email, studyHoursPerDay = 2 } = reqBody

    if (!email || !subject || !examDate || !syllabus) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 })
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

    // Find student in MongoDB
    const thisStudent = await Student.findOne({
      supabaseId: supabaseUser.auth_id,
      email: email
    }).populate("subjects").populate("goals")

    if (!thisStudent) {
      return new Response(JSON.stringify({ error: "Student not found" }), { status: 404 })
    }

    // Find or create subject
    let thisSubject = await Subject.findOne({ name: subject })
    if (!thisSubject) {
      thisSubject = await Subject.create({
        name: subject,
        student: [thisStudent._id],
        topics: [],
        goals: []
      })
      thisStudent.subjects.push(thisSubject._id)
      await thisStudent.save()
    }

    // Calculate days available for study
    const currentDate = new Date()
    const examDateTime = new Date(examDate)
    const daysAvailable = Math.ceil((examDateTime - currentDate) / (1000 * 60 * 60 * 24))

    if (daysAvailable <= 0) {
      return new Response(JSON.stringify({ error: "Exam date must be in the future" }), { status: 400 })
    }

    // Generate study plan using Gemini AI
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const prompt = `
You are an expert study planner. Create a detailed study schedule for a student with the following requirements:

Subject: ${subject}
Exam Date: ${examDate}
Days Available: ${daysAvailable}
Study Hours Per Day: ${studyHoursPerDay}
Syllabus/Topics to Cover: ${syllabus}

Please create a study plan that:
1. Breaks down the syllabus into manageable daily goals
2. Distributes topics evenly across available days
3. Includes revision sessions
4. Considers difficulty levels of topics

Return the response as a JSON object with this exact structure:
{
  "studyPlan": [
    {
      "day": 1,
      "date": "YYYY-MM-DD",
      "title": "Topic/Chapter Name",
      "description": "Detailed description of what to study and how",
      "estimatedHours": 2,
      "priority": "high/medium/low",
      "type": "learning/revision/practice"
    }
  ],
  "totalDays": ${daysAvailable},
  "summary": "Brief overview of the study plan"
}

Make sure each goal is specific, actionable, and realistic. Focus on creating a balanced schedule that ensures thorough coverage of the syllabus.
`

    const result = await model.generateContent([prompt])
    const aiResponse = await result.response.text()

    let studyPlanData
    try {
      // Clean the response in case it has markdown formatting
      const cleanedResponse = aiResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      studyPlanData = JSON.parse(cleanedResponse)
    } catch (error) {
      console.error("Failed to parse AI response:", error)
      return new Response(JSON.stringify({ error: "Failed to generate study plan" }), { status: 500 })
    }

    // Create goals from the study plan
    const createdGoals = []
    const currentDateTime = new Date()

    for (const planItem of studyPlanData.studyPlan) {
      const goalDate = new Date(currentDateTime)
      goalDate.setDate(currentDateTime.getDate() + (planItem.day - 1))
      
      const goal = {
        subject: thisSubject._id,
        title: planItem.title,
        deadline: goalDate,
        student: thisStudent._id,
        description: planItem.description,
        completionStatus: "pending"
      }

      const createGoal = await Goal.create(goal)
      createdGoals.push(createGoal)

      // Add goal references
      thisSubject.goals.push(createGoal._id)
      thisStudent.goals.push(createGoal._id)
    }

    // Save updated student and subject
    await thisSubject.save()
    await thisStudent.save()

    return new Response(
      JSON.stringify({
        message: "Study plan created successfully",
        studyPlan: studyPlanData,
        goalsCreated: createdGoals.length,
        goals: createdGoals
      }),
      { status: 201 }
    )

  } catch (error) {
    console.error("Error creating study plan:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 })
  }
}