import { ConfigValidationSchema } from "@application/config/validation-schema";
import { plainToClass } from "class-transformer";
import { validateSync, ValidationError } from "class-validator";
import { readFileSync } from "fs";
import * as yaml from "js-yaml";
import { join } from "path";

const YAML_CONFIG_FILENAME = "../../../config.yaml";

function formatError(errors: ValidationError[], parentPath: string = ""): string {
  return errors
    .map((error) => {
      const propertyPath = parentPath ? `${parentPath}.${error.property}` : error.property;

      if (error.constraints) {
        const constraints = Object.values(error.constraints).join(", ");
        return `${propertyPath} - ${constraints}`;
      }

      if (error.children && error.children.length > 0) {
        return formatError(error.children, propertyPath);
      }

      return `${propertyPath} - Validation failed, but no specific constraints provided.`;
    })
    .join("; ");
}

export default () => {
  const validatedConfig = plainToClass(ConfigValidationSchema, getYamlConfig());

  const errors = validateSync(validatedConfig, {
    stopAtFirstError: false,
  });

  if (errors.length > 0) {
    const errorMessage = formatError(errors);
    throw new ConfigValidationException(errorMessage);
  }

  return validatedConfig;
};

const getYamlConfig = (): Record<string, any> => {
  try {
    const yamlConfig = yaml.load(readFileSync(join(__dirname, YAML_CONFIG_FILENAME), "utf8")) as Record<string, any>;

    return yamlConfig;
  } catch (error) {
    throw new ConfigValidationException("YAML config file is not found or has invalid format.");
  }
};

export * from "@application/config/validation-schema";
export * from "@application/config/type";

class ConfigValidationException extends Error {
  constructor(message: string) {
    super(`${new.target.name}: ${message}`);
    this.name = new.target.name;
  }
}
