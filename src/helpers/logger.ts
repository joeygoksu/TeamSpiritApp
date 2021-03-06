/* eslint-disable no-console, space-before-function-paren, keyword-spacing */
export type Parameter = [unknown?, ...unknown[]];

/**
 * Logger Class
 */
class Logger {
  public log(...args: Parameter): void {
    args.push(`- ${this.trace()}`);
    console.log(...args);
  }

  public info(...args: Parameter): void {
    args.push(`- ${this.trace()}`);
    console.info(...args);
  }

  public warn(...args: Parameter): void {
    args.push(`- ${this.trace()}`);
    console.warn(...args);
  }

  public error(...args: Parameter): void {
    args.push(`- ${this.trace()}`);
    console.error(...args);
  }

  private trace(): string {
    const lines: string[] = (<string>new Error().stack).split('\n').slice(1);
    const lineMatch: RegExpMatchArray | null = /at (?:(.+)\s+)?\(?(?:(.+?):(\d+):(\d+)|([^)]+))\)?/.exec(
      lines[2],
    );

    if (!lineMatch || lineMatch[2] === null || lineMatch[3] === null) {
      return '';
    }
    const line: string = lineMatch[3];

    return `${line}`;
  }
}

export const logger: Logger = new Logger();
