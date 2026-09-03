import { copyFileSync, existsSync, mkdirSync } from "node:fs";

const dir = "dist/client";
const shell = `${dir}/_shell.html`;
if (!existsSync(shell)) {
  console.error("pages-postbuild: missing", shell);
  process.exit(1);
}

copyFileSync(shell, `${dir}/index.html`);
copyFileSync(shell, `${dir}/404.html`);

for (const page of ["about", "roster", "legal"]) {
  copyFileSync(shell, `${dir}/${page}.html`);
}

mkdirSync(`${dir}/roster`, { recursive: true });
copyFileSync(shell, `${dir}/roster/index.html`);

console.log("pages-postbuild: wrote index.html, 404.html, and route shells");
