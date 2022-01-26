import {
  InputData,
  validate,
  ValidationErrors,
  ValidationRules,
} from "validasaur";
import { helpers, httpErrors } from "oak";
import { Context } from "types";

const getErrorMessage = (
  errors: ValidationErrors,
): string | undefined => {
  for (let attr in errors) {
    const attrErrors = errors[attr];
    for (let rule in attrErrors) {
      return attrErrors[rule] as string;
    }
  }
};

/** */
const requestValidator = (
  { queryRules, bodyRules }: {
    queryRules?: ValidationRules;
    bodyRules?: ValidationRules;
  },
) => {
  return async (ctx: Context, next: () => Promise<void>) => {
    const valid = async (input: InputData, rules: ValidationRules) => {
      const [isValid, errors] = await validate(input, rules);
      if (!isValid) {
        const message = getErrorMessage(errors);
        throw new httpErrors.BadRequest(message);
      }
    };

    if (queryRules) {
      const query = helpers.getQuery(ctx, { mergeParams: true });
      await valid(query, queryRules);
    }
    if (bodyRules) {
      const body = await ctx?.request?.body()?.value || {};
      await valid(body, bodyRules);
    }

    await next();
  };
};

export { requestValidator };
