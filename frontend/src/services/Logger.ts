const isDevMode = localStorage.getItem("isDevMode") === "true";
class Logger {
  source: string;
  constructor(source: string) {
    this.source = source;
  }
  info(mssg: any, ...data: any) {
    console.log("FG: ", this.source, " ", mssg, " ", ...data);
  }
  verbose(...data: any) {
    if (isDevMode) console.log("FG: ", this.source, " ", ...data);
  }

  error(err: any, ...data: any) {
    console.error("FG: ", this.source, " ", err, " ", ...data);
  }
}
export default Logger;
