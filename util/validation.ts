import { z } from 'zod';
import type { $ZodIssue } from 'zod/v4/core';

export function getCombinedErrorMessage(issues: $ZodIssue[]) {
  return issues.map((issue) => issue.message).join(', ');
}

const returnToSchema = z.string().refine((value) => {
  return (
    !value.startsWith('/logout') &&
    !value.startsWith('//') &&
    !value.includes('returnTo=') &&
    /^\/[\d#/=?A-Za-z()_-]+$/.test(value)
  );
});

export function getSafeReturnToPath(path: string | string[] | undefined) {
  const result = returnToSchema.safeParse(path);

  if (!result.success) {
    return undefined;
  }

  return result.data;
}
