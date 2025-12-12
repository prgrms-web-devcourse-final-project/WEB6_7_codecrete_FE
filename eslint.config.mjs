import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Custom rules can be added here
      "react/react-in-jsx-scope": "off", // Next.js에서는 React를 자동으로 import하므로 비활성화
      "react/jsx-props-no-spreading": "off", // props spreading 허용
      "react/jsx-no-useless-fragment": ["error", { allowExpressions: true }], // 불필요한 fragment 사용 금지
      "@typescript-eslint/no-unused-vars": ["warn"], // 사용하지 않는 변수에 대한 경고
      "no-console": ["error", { allow: ["warn", "error"] }], // console.log 금지, console.warn/error 허용
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
