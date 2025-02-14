import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { email, password, fullName, role } = await req.json()

    if (!email || !password || !fullName || !role) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user with proper role enum value
    const user = await prisma.user.create({
      data: {
        email,
        fullName,
        hashedPassword,
        role: role === 'student' ? 'student' : 'instructor',
        ...(role === 'student' && {
          student: {
            create: {}
          }
        }),
        ...(role === 'instructor' && {
          instructor: {
            create: {}
          }
        })
      }
    })

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 }
    )
  }
} 