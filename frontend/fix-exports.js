import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJsonPath = path.join(
  __dirname,
  "node_modules",
  "@mediapipe",
  "tasks-vision",
  "package.json",
);

if (fs.existsSync(packageJsonPath)) {
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

    if (packageJson.exports) {
      // Convert exports to proper ESM format if it has mixed keys
      const exports = packageJson.exports;
      const hasConditionalKeys = Object.keys(exports).some((key) =>
        ["import", "require", "types", "default"].includes(key),
      );
      const hasPathKeys = Object.keys(exports).some((key) =>
        key.startsWith("."),
      );

      // If mixed, convert all paths to use conditional exports
      if (hasConditionalKeys && hasPathKeys) {
        const newExports = {};
        Object.entries(exports).forEach(([key, value]) => {
          if (key.startsWith(".")) {
            // Keep path exports as-is or restructure
            newExports[key] = value;
          } else if (["import", "require", "types", "default"].includes(key)) {
            // These are conditional exports for the main entry
            if (!newExports["."]) {
              newExports["."] = {};
            }
            newExports["."][key] = value;
          }
        });
        packageJson.exports = newExports;
      }

      // Ensure main entry exists
      if (!packageJson.exports["."]) {
        packageJson.exports["."] = {
          import: packageJson.main || "./index.js",
          require: packageJson.main || "./index.js",
        };
      }

      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log("✓ Fixed @mediapipe/tasks-vision exports");
    }
  } catch (err) {
    console.error("Failed to fix exports:", err.message);
  }
}
