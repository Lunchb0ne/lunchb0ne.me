// Installs the agent skills pinned in skills-lock.json into .claude/skills.
// `skills experimental_install` only writes to .agents/skills, which Claude Code doesn't read.
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const { skills } = JSON.parse(readFileSync(new URL("../skills-lock.json", import.meta.url), "utf8"));

const bySource = Object.groupBy(Object.entries(skills), ([, skill]) => skill.source);

for (const [source, entries] of Object.entries(bySource)) {
  const names = entries.flatMap(([name]) => ["--skill", name]);
  execFileSync("aubx", ["skills", "add", source, ...names, "-a", "claude-code", "--copy", "-y"], { stdio: "inherit" });
}
