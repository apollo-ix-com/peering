import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "prettier", "eslint-config-prettier",
    ],
    plugins: ["import", "@typescript-eslint", "jsx-a11y"],   
    rules:{
      // ✅ Basic Rules
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
      "indent": ["error", 2, { SwitchCase: 1 }],
      "no-unused-vars": "warn",
      "comma-dangle": ["error", "always-multiline"],

      // ✅ TypeScript Rules
      "@typescript-eslint/no-unused-vars": ["warn"],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/no-non-null-assertion": "error",

      // ✅ Import Rules
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "never",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "import/no-unresolved": "off",

      // ✅ Accessibility Rules
      "jsx-a11y/anchor-is-valid": "warn",
      "jsx-a11y/no-autofocus": "warn",

      // ✅ React Specific Rules
      "react/jsx-curly-brace-presence": ["error", { props: "never", children: "never" }],
      "react/self-closing-comp": "error",

      // ✅ Prettier
      // "prettier/prettier": "error",
    },
  }),
];

export default eslintConfig;
