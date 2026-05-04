async function query(sqlText: string, params: unknown[] = []): Promise<unknown[]> {
  const connStr = process.env.NEON_URL!;
  const url = new URL(connStr);
  const endpoint = `https://${url.hostname}/sql`;

  const resp = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Neon-Connection-String': connStr,
    },
    body: JSON.stringify({ query: sqlText, params }),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Neon query failed: ${resp.status} ${text}`);
  }

  const data = await resp.json() as { rows: unknown[] };
  return data.rows;
}

export async function sql(strings: TemplateStringsArray, ...values: unknown[]) {
  let text = '';
  const params: unknown[] = [];
  strings.forEach((s, i) => {
    text += s;
    if (i < values.length) {
      params.push(values[i]);
      text += `$${params.length}`;
    }
  });
  return query(text, params);
}
