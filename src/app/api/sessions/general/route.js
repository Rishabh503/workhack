// app/api/sessions/general/route.js (Updated Sessions)
import { connectDB } from "@/lib/db";
import Session from "@/models/sessionModel";
import Student from "@/models/studentModel"; 
import { NextResponse } from 'next/server';

export async function POST(req) {
    await connectDB();

    try {
        const reqBody = await req.json();
        const { email, date, startTime, endTime, goalId } = reqBody;

        console.log(reqBody);

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const thisStudent = await Student.findOne({ email: email });

        if (!thisStudent) {
            return NextResponse.json({ error: "Student not found" }, { status: 404 });
        }

        const sessionData = {
            student: thisStudent._id,
            date,
            startTime,
            endTime
        };

        // Add goal if provided
        if (goalId) {
            sessionData.goal = goalId;
        }

        const newSession = await Session.create(sessionData);

        if (!newSession) {
            throw new Error("Failed creating the session");
        }

        thisStudent.sessions.push(newSession._id);
        await thisStudent.save();

        return NextResponse.json({ session: newSession }, { status: 200 });

    } catch (error) {
        console.error("Error while creating session:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({ error: "Email parameter is required" }, { status: 400 });
        }

        const thisStudent = await Student.findOne({ email: email })
            .populate("sessions");

        if (!thisStudent) {
            return NextResponse.json({ error: "Student not found" }, { status: 404 });
        }

        return NextResponse.json({ sessions: thisStudent.sessions || [] });

    } catch (error) {
        console.error("Error while getting sessions:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}