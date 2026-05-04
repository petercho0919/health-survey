import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET() {
  try {
    const rows = await sql`
      SELECT
        id, name, emp_id AS "empId", dept, division,
        job_title AS "jobTitle", rank, location, location_other AS "locationOther",
        q1, q1_other AS "q1Other", q2, q3, q4, q5, q6,
        q7, q7_other AS "q7Other", q8, q9, q9_software AS "q9Software",
        q10, q10_other AS "q10Other", q11, q11_other AS "q11Other",
        q12, q13, submitted_at AS "submittedAt"
      FROM survey_responses
      ORDER BY submitted_at DESC
    `;
    return NextResponse.json({ ok: true, records: rows });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
