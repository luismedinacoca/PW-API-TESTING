export class APILogger {
  private recentLogs: any[] = [];

  // capturing request details
  logRequest(method: string, url: string, headers: Record<string, string>, body?: any) {
    const logEntry = { method, url, headers, body };
    this.recentLogs.push({ type: "Request Details", data: logEntry });
  }

  // Capturing response details
  logResponse(statusCode: number, body?: any) {
    const logEntry = { statusCode, body };
    this.recentLogs.push({ type: "Response Details", data: logEntry });
  }

  getRecentLogs() {
    const logs = this.recentLogs
      .map((log) => {
        return `\n===${log.type}===\n${JSON.stringify(log.data, null, 2)}\n`;
      })
      .join("\n\n");
    return logs;
  }

  // clearLogs() {
  //   this.recentLogs = [];
  // }
}
