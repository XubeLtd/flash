import axios from "axios";
import { existsSync, mkdirSync } from "fs";
import { generateZodClientFromOpenAPI } from "openapi-zod-client";
import type { OpenAPIObject } from "openapi3-ts/oas30";
import { join, dirname } from "path"; // Added dirname
import { fileURLToPath } from "url"; // Added fileURLToPath

const getApiEnvironmentUrl = (environment: string) =>
  `https://xube-docs-${environment}.s3.eu-west-1.amazonaws.com/api.json`;

const fetchOpenApiSpec = async (
  environment: string
): Promise<OpenAPIObject> => {
  const url = getApiEnvironmentUrl(environment);

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (e) {
    console.error(
      `Error fetching OpenAPI spec from ${url}: ${JSON.stringify(e)}`
    );
    process.exit(1);
  }
};

const getApiName = (environment: string): string => {
  if (environment === "prod") return "xube";
  return `xube${environment.charAt(0).toUpperCase() + environment.slice(1)}`;
};

const getBaseUrl = (environment: string): string => {
  if (environment === "prod") return "https://api.xube.io";
  return `https://api.${environment}.xube.dev`;
};

export const generateSdk = async (
  openApiSpec: OpenAPIObject,
  environment: string,
  outputDir: string
) => {
  const destinationDirectory = join(outputDir, environment);
  const distPath = join(destinationDirectory, `xube-sdk.ts`);

  if (!existsSync(destinationDirectory)) {
    mkdirSync(destinationDirectory, { recursive: true });
  }

  let scriptDir: string;
  if (typeof import.meta.dir === "string") {
    scriptDir = import.meta.dir;
    console.log("[DEBUG] Using import.meta.dir:", scriptDir);
  } else if (typeof import.meta.url === "string") {
    scriptDir = dirname(fileURLToPath(import.meta.url));
    console.log("[DEBUG] Derived scriptDir from import.meta.url:", scriptDir);
  } else {
    console.error(
      "[ERROR] Cannot determine script directory. import.meta.dir and import.meta.url are unavailable. Falling back to process.cwd(). This might be incorrect for relative template paths."
    );
    scriptDir = process.cwd(); // Fallback, but be cautious
  }

  const relativeTemplatePath = "../src/sdk/templates/schemas-and-types.hbs";
  const fullTemplatePath = join(scriptDir, relativeTemplatePath); // This join uses the derived scriptDir

  console.log(`[DEBUG] Script directory determined as: ${scriptDir}`);
  console.log(`[DEBUG] Relative template path used: ${relativeTemplatePath}`);
  console.log(`[DEBUG] Attempting to use template path: ${fullTemplatePath}`);

  await generateZodClientFromOpenAPI({
    openApiDoc: openApiSpec,
    distPath,
    templatePath: fullTemplatePath,
    options: {
      withAlias: true,
      exportSchemas: true,
      apiClientName: getApiName(environment),
      withDocs: true,
      baseUrl: getBaseUrl(environment),
      templateContext: {
        environment,
      },
    },
  });

  console.log(`SDK generated successfully at ${distPath}`);
};

const run = async () => {
  const args = process.argv.slice(2);

  switch (args[0]) {
    case "generate": {
      if (args.length !== 3) {
        console.error(
          "Usage: bun run <your-script-name>.ts generate <environment> <output directory>"
        );
        process.exit(1);
      }

      const environment = args[1];
      const outputPath = args[2];

      if (!environment || !outputPath) {
        console.error(
          "Error: Environment and output directory arguments are required."
        );
        console.error(
          "Usage: bun run <your-script-name>.ts generate <environment> <output directory>"
        );
        process.exit(1);
      }

      try {
        const openApiSpec = await fetchOpenApiSpec(environment);
        await generateSdk(openApiSpec, environment, outputPath);
      } catch (error) {
        console.error("Error generating SDK:", error);
        process.exit(1);
      }
      break;
    }
    default:
      console.error("Option must be provided: generate");
      process.exit(1);
  }
};

run();
