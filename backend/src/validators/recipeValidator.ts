export const validate =
  (schema: any) => (req: any, res: any, next: any) => {

    try {
      const parsed = schema.parse(req.body);
      req.body = parsed; 
      next();
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: err.issues.map((issue: any) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        });
      }
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };