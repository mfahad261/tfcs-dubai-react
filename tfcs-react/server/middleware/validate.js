import { AppError } from '../errors/AppError.js';

/** Checks req.body against a schema and replaces it with the cleaned values. */
export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body ?? {});
  if (result.success) {
    req.body = result.data;
    next();
    return;
  }

  const fieldErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] ?? 'form';
    fieldErrors[field] ??= issue.message;
  }
  next(new AppError(422, 'Please check the highlighted fields.', fieldErrors));
};
