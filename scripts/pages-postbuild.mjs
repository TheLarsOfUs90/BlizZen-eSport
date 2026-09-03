import { copyFileSync, existsSync } from "node:fs";

const dir = "dist/client";
const shell = `${dir}/_shell.html`;
if (!existsSync(shell)) {
  console.error("pages-postbuild: missing", shell);
  process.exit(1);
}
copyFileSync(shell, `${dir}/index.html`);
copyFileSync(shell, `${dir}/404.html`);
console.log("pages-postbuild: wrote index.html and 404.html");
