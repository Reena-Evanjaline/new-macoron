import db from "@/lib/db";


function buildTree(flat) {
  const idMap = {};
  const roots = [];

  // Create map
  flat.forEach(row => {
    idMap[row.id] = { ...row, children: [] };
  });

  // Build tree
  flat.forEach(row => {
    if (row.parent_id) {
      idMap[row.parent_id]?.children.push(idMap[row.id]);
    } else {
      roots.push(idMap[row.id]);
    }
  });

  return roots;
}

export async function GET() {
  try {
    const [rows] = await db.execute(
      'SELECT id, name, slug, parent_id FROM categories ORDER BY parent_id, id'
    );

    const tree = buildTree(rows);

    return Response.json(tree);
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { name, slug, parent_id } = await req.json();

    if (!name || !slug) {
      return Response.json({ error: 'Name and slug are required' }, { status: 400 });
    }

    await db.execute(
      'INSERT INTO categories (name, slug, parent_id) VALUES (?, ?, ?)',
      [name, slug, parent_id || null]
    );

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
