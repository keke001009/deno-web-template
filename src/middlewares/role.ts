import { httpErrors } from "oak";
import { Context, UserRole } from "types";

export const hasUserRole = (_user: any, roles?: UserRole | UserRole[]) => {
  return true;
};

export const checkRole = (roles?: UserRole | UserRole[]) => {
  return async (ctx: Context, next: () => Promise<void>) => {
    return await next();
    /*
    const { user } = ctx;
    if (!user) {
      throw new httpErrors.Unauthorized("unauthorized");
    }

    if (roles) {
      const isRoleMatched = hasUserRole(user, roles);

      if (!isRoleMatched) {
        throw new httpErrors.Forbidden("forbidden");
      }
    }

    await next();
    */
  };
};
