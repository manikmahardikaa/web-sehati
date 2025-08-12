// import { WaBlastSchedulePayloadCreateModel } from "@/app/models/petugas-lapangan/schedule-blast";
// import { CREATE_WA_BLAST } from "@/app/providers/petugas-lapangan/schedule-blast";
// import { NextRequest, NextResponse } from "next/server";

// export const POST = async (req: NextRequest) => {
//   try {
//     const payload: WaBlastSchedulePayloadCreateModel = await req.json();

//     const data = await CREATE_WA_BLAST(payload);

//     return NextResponse.json(
//       {
//         success: true,
//         message: "Successfully registered!",
//         result: data,
//       },
//       { status: 200 }
//     );
//   } catch (error: unknown) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Failed to register user",
//         error: error instanceof Error ? error.message : "Internal server error",
//       },
//       { status: 500 }
//     );
//   }
// };
