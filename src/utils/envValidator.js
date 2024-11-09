/**
 * Environment variable validator and getter utility
 */

// Environment variable prefix for the application
const ENV_PREFIX = 'VITE_';

/**
 * Validates required environment variables
 * @param {string[]} requiredVars - Array of required environment variable names
 * @throws {Error} If any required variable is missing or invalid
 */
export const validateEnvVariables = (requiredVars) => {
  const missingVars = [];
  const invalidVars = [];

  requiredVars.forEach((varName) => {
    if (!import.meta.env[varName]) {
      missingVars.push(varName);
    } else if (import.meta.env[varName] === 'undefined' || import.meta.env[varName] === '') {
      invalidVars.push(varName);
    }
  });

  if (missingVars.length > 0 || invalidVars.length > 0) {
    const errors = [];
    if (missingVars.length > 0) {
      errors.push(`Missing environment variables: ${missingVars.join(', ')}`);
    }
    if (invalidVars.length > 0) {
      errors.push(`Invalid environment variables: ${invalidVars.join(', ')}`);
    }
    throw new Error(
      'Environment Configuration Error:\n' +
      errors.join('\n') +
      '\nPlease check your .env file and ensure all required variables are set correctly.'
    );
  }
};

/**
 * Get environment variable with validation and type conversion
 * @param {string} key - Environment variable key
 * @param {*} defaultValue - Default value if not found
 * @param {'string' | 'boolean' | 'number'} type - Expected type of the variable
 * @returns {string | boolean | number} Environment variable value
 */
export const getEnvVariable = (key, defaultValue = undefined, type = 'string') => {
  // Ensure key has prefix
  const fullKey = key.startsWith(ENV_PREFIX) ? key : `${ENV_PREFIX}${key}`;
  const value = import.meta.env[fullKey];

  if (!value && defaultValue === undefined) {
    throw new Error(`Environment variable ${fullKey} is not defined`);
  }

  const finalValue = value || defaultValue;

  // Type conversion
  switch (type) {
    case 'boolean':
      return finalValue === 'true' || finalValue === true;
    case 'number':
      const num = Number(finalValue);
      if (isNaN(num)) {
        throw new Error(`Environment variable ${fullKey} must be a number`);
      }
      return num;
    default:
      return finalValue;
  }
};

/**
 * Checks if current environment is production
 * @returns {boolean}
 */
export const isProduction = () => {
  return getEnvVariable('APP_ENV', 'development') === 'production';
};

/**
 * Checks if current environment is development
 * @returns {boolean}
 */
export const isDevelopment = () => {
  return getEnvVariable('APP_ENV', 'development') === 'development';
};

/**
 * Get all environment variables with a specific prefix
 * @param {string} prefix - Prefix to filter environment variables
 * @returns {Object} Object containing all matching environment variables
 */
export const getEnvVariablesByPrefix = (prefix = ENV_PREFIX) => {
  return Object.keys(import.meta.env)
    .filter(key => key.startsWith(prefix))
    .reduce((acc, key) => {
      acc[key] = import.meta.env[key];
      return acc;
    }, {});
}; 