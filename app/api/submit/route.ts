import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

async function createTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS survey_responses (
      id SERIAL PRIMARY KEY,
      name TEXT,
      emp_id TEXT,
      dept TEXT,
      division TEXT,
      job_title TEXT,
      rank TEXT,
      location TEXT,
      location_other TEXT,
      q1 TEXT, q1_other TEXT,
      q2 TEXT[],
      q3 TEXT,
      q4 TEXT,
      q5 TEXT[],
      q6 TEXT,
      q7 TEXT[], q7_other TEXT,
      q8 TEXT,
      q9 TEXT, q9_software TEXT,
      q10 TEXT[], q10_other TEXT,
      q11 TEXT[], q11_other TEXT,
      q12 TEXT[],
      q13 TEXT,
      submitted_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}

export async function POST(req: NextRequest) {
  try {
    await createTable();
    const d = await req.json();

    await sql`
      INSERT INTO survey_responses (
        name, emp_id, dept, division, job_title, rank,
        location, location_other,
        q1, q1_other, q2, q3, q4, q5, q6,
        q7, q7_other, q8, q9, q9_software,
        q10, q10_other, q11, q11_other, q12, q13,
        submitted_at
      ) VALUES (
        ${d.name}, ${d.empId}, ${d.dept}, ${d.division}, ${d.jobTitle}, ${d.rank},
        ${d.location}, ${d.locationOther ?? ''},
        ${d.q1}, ${d.q1Other ?? ''}, ${d.q2 ?? []}, ${d.q3}, ${d.q4}, ${d.q5 ?? []}, ${d.q6},
        ${d.q7 ?? []}, ${d.q7Other ?? ''}, ${d.q8}, ${d.q9}, ${d.q9Software ?? ''},
        ${d.q10 ?? []}, ${d.q10Other ?? ''}, ${d.q11 ?? []}, ${d.q11Other ?? ''}, ${d.q12 ?? []}, ${d.q13 ?? ''},
        ${d.submittedAt}
      )
    `;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
