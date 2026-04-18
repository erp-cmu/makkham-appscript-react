declare global {
  interface GoogleScriptRun {
    withSuccessHandler(
      callback: (result: any, ...args: any[]) => void,
    ): GoogleScriptRun;
    withFailureHandler(
      callback: (error: any, ...args: any[]) => void,
    ): GoogleScriptRun;
    withUserObject(userObject: unknown): GoogleScriptRun;
    [serverFunction: string]: (...args: any[]) => GoogleScriptRun;
  }

  interface Google {
    script: {
      run: GoogleScriptRun;
    };
  }

  const google: Google;
}

export {};
