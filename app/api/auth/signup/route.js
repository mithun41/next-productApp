// // File: /app/api/auth/signup/route.js

// import { NextResponse } from "next/server";
// import clientPromise from "@/lib/db";
// import bcrypt from "bcryptjs";

// export async function POST(req) {
//   try {
//     const { email, password } = await req.json();

//     if (!email || !password || password.length < 6) {
//       return NextResponse.json(
//         {
//           message:
//             "Invalid input. Password should be at least 6 characters long.",
//         },
//         { status: 400 }
//       );
//     }

//     const client = await clientPromise;
//     const db = client.db("productApp");
//     const usersCollection = db.collection("users");

//     const existingUser = await usersCollection.findOne({ email });
//     if (existingUser) {
//       return NextResponse.json(
//         { message: "User with this email already exists." },
//         { status: 409 } // 409 Conflict
//       );
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await usersCollection.insertOne({
//       email,
//       password: hashedPassword,
//       createdAt: new Date(),
//     });

//     return NextResponse.json(
//       { message: "User created successfully!" },
//       { status: 201 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { message: "An error occurred.", error: error.message },
//       { status: 500 }
//     );
//   }
// }
