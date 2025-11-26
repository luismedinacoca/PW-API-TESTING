export class RequestHandler {
  private baseUrl: string = "";
  private defaultBaseUrl: string = "https://conduit-api.bondaracademy.com/api";
  private apiPath: string = "";
  private apiParams: object = {};
  private apiHeaders: object = {};
  private apiBody: object = {};

  url(url: string) {
    this.baseUrl = url;
    return this;
  }

  path(path: string) {
    this.apiPath = path;
    return this;
  }

  params(params: object) {
    this.apiParams = params;
    return this;
  }

  headers(headers: object) {
    this.apiHeaders = headers;
    return this;
  }

  body(body: object) {
    this.apiBody = body;
    return this;
  }

  getUrl() {
    const url = new URL(`${this.baseUrl || this.defaultBaseUrl}${this.apiPath}`);
    console.log("url: ", url.toString());
  }
}
