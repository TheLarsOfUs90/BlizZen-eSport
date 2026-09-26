import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";

const dir = "dist/client";
const shell = `${dir}/_shell.html`;
if (!existsSync(shell)) {
  console.error("pages-postbuild: missing", shell);
  process.exit(1);
}

copyFileSync(shell, `${dir}/index.html`);
copyFileSync(shell, `${dir}/404.html`);

for (const page of ["about", "roster", "legal", "games"]) {
  copyFileSync(shell, `${dir}/${page}.html`);
}

mkdirSync(`${dir}/roster`, { recursive: true });
copyFileSync(shell, `${dir}/roster/index.html`);

mkdirSync(`${dir}/about`, { recursive: true });
copyFileSync(shell, `${dir}/about/index.html`);
for (const page of ["brand", "partners", "media", "contact"]) {
  mkdirSync(`${dir}/about/${page}`, { recursive: true });
  copyFileSync(shell, `${dir}/about/${page}/index.html`);
}

mkdirSync(`${dir}/games`, { recursive: true });
copyFileSync(shell, `${dir}/games/index.html`);

const site = JSON.parse(readFileSync("content/site.json", "utf8"));
for (const game of site.games ?? []) {
  if (!game?.id) continue;
  mkdirSync(`${dir}/games/${game.id}`, { recursive: true });
  copyFileSync(shell, `${dir}/games/${game.id}/index.html`);
}

console.log("pages-postbuild: wrote index.html, 404.html, and route shells");
