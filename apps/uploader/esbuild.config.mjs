import { build } from "esbuild";

await build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  platform: "node",
  target: "node18",
  format: "cjs",
  outfile: "dist/index.js",
  minify: false,
  sourcemap: false,
  external: [],
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});

console.log("Build completed successfully!");
