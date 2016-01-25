interface LsHost {
    n: number;
    getNewLine?(): string;
}
interface LsShimHost {
    s: string;
    getNewLine?(): string;
}
let host: LsHost | LsShimHost;
let s = host.getNewLine();
interface IO {
    args(): string[];
    newLine(): string;
    getCurrentDirectory(): string;
    useCaseSensitiveFileNames(): boolean;
    resolvePath(path: string): string;
    readFile(path: string): string;
    writeFile(path: string, contents: string): void;
    createDirectory(path: string): void;
    fileExists: (fileName: string) => boolean;
    directoryExists: (path: string) => boolean;
    getMemoryUsage?(): number;
    getExecutingFilePath(this: ts.System | IO): string;
    exit(exitCode?: number): void;
    readDirectory(path: string, extension?: string, exclude?: string[]): string[];

    log: (text: string) => void;
    listFiles(path: string, filter: RegExp, options?: { recursive?: boolean }): string[];
    deleteFile(fileName: string): void;
    directoryName: (path: string) => string;
}
interface System {
    args: string[];
    newLine: string;
    getCurrentDirectory(): string;
    useCaseSensitiveFileNames: boolean;
    resolvePath(path: string): string;
    readFile(path: string, encoding?: string): string;
    writeFile(path: string, data: string, writeByteOrderMark?: boolean): void;
    createDirectory(path: string): void;
    fileExists(path: string): boolean;
    directoryExists(path: string): boolean;
    getMemoryUsage?(): number;
    getExecutingFilePath(this: System | Harness.IO): string;
    exit(exitCode?: number): void;
    readDirectory(path: string, extension?: string, exclude?: string[]): string[];

    watchFile?(path: string, callback: (path: string, removed?: boolean) => void): FileWatcher;
    watchDirectory?(path: string, callback: (path: string) => void, recursive?: boolean): FileWatcher;
    write(s: string): void;
}