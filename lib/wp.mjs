// lib/wp.mjs — thin WordPress REST API client (Basic auth via Application Password).
// Node 18+ has global fetch; no extra dependency needed.

async function wpFetch(wpAuth, endpoint, { method = 'GET', body } = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${wpAuth.base}${endpoint}`;
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: wpAuth.authHeader,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let json;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    // Non-JSON response usually means REST API is off or a security plugin
    // returned an HTML error page.
    throw new Error(
      `WordPress did not return JSON from ${method} ${url} (HTTP ${res.status}). ` +
        `Is the REST API enabled and reachable? First 200 chars: ${text.slice(0, 200)}`
    );
  }

  if (!res.ok) {
    const msg = json?.message || res.statusText;
    const code = json?.code ? ` [${json.code}]` : '';
    throw new Error(`WordPress ${method} ${url} failed: HTTP ${res.status}${code} — ${msg}`);
  }
  return json;
}

// Verify credentials and that the user can edit posts.
export async function whoAmI(wpAuth) {
  const me = await wpFetch(wpAuth, '/users/me?context=edit');
  return me; // { id, name, roles?, capabilities? ... }
}

// Find a term (category/tag) by exact name, or create it. Returns its id.
async function ensureTerm(wpAuth, taxonomy, name) {
  const found = await wpFetch(
    wpAuth,
    `/${taxonomy}?search=${encodeURIComponent(name)}&per_page=100`
  );
  const exact = Array.isArray(found)
    ? found.find((t) => t.name.toLowerCase() === name.toLowerCase())
    : null;
  if (exact) return exact.id;

  const created = await wpFetch(wpAuth, `/${taxonomy}`, {
    method: 'POST',
    body: { name },
  });
  return created.id;
}

export function ensureCategory(wpAuth, name) {
  return ensureTerm(wpAuth, 'categories', name);
}

export async function ensureTags(wpAuth, names = []) {
  const ids = [];
  for (const n of names) {
    if (!n) continue;
    ids.push(await ensureTerm(wpAuth, 'tags', n));
  }
  return ids;
}

// Create a post. `post` = { title, content, status, slug, excerpt, categories, tags, meta }.
export async function createPost(wpAuth, post) {
  return wpFetch(wpAuth, '/posts', { method: 'POST', body: post });
}

// Convenience: the wp-admin edit URL for a created post.
export function editUrl(wpAuth, postId) {
  return `${wpAuth.root}/wp-admin/post.php?post=${postId}&action=edit`;
}
