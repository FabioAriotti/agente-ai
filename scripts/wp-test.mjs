// scripts/wp-test.mjs — verify the WordPress connection for a client.
// Usage: npm run test:wp -- <client-name>
import { loadClient } from '../lib/config.mjs';
import { whoAmI } from '../lib/wp.mjs';

const name = process.argv[2];

try {
  const client = loadClient(name);
  console.log(`Testing WordPress connection for "${client.displayName || client.name}"`);
  console.log(`  Site:  ${client.wpAuth.root}`);
  console.log(`  User:  ${client.wpAuth.user}`);
  console.log('  ...');

  const me = await whoAmI(client.wpAuth);
  const roles = Array.isArray(me.roles) ? me.roles.join(', ') : '(roles hidden)';
  console.log('\n  Connected.');
  console.log(`  Authenticated as: ${me.name} (id ${me.id})`);
  console.log(`  Roles: ${roles}`);

  const canPublish =
    me.capabilities?.publish_posts ?? me.capabilities?.edit_posts ?? undefined;
  if (canPublish === false) {
    console.log(
      '\n  WARNING: this user may not be able to create posts. Use an Editor or Administrator.'
    );
  }
  console.log('\nOK — ready to publish drafts.');
} catch (e) {
  console.error(`\nFAILED: ${e.message}`);
  console.error(
    '\nChecklist:\n' +
      '  1. Is the site URL correct (with https://) in clients/<name>.json?\n' +
      '  2. Did you paste the Application Password into .env (with spaces)?\n' +
      '  3. Is the WordPress REST API enabled (open <site>/wp-json/ in a browser — it must return JSON)?\n' +
      '  4. Does the user have Editor or Administrator role?'
  );
  process.exit(1);
}
