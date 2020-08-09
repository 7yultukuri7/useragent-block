const parser = require("ua-parser-js");

const Supported_OS = {
    Windows: "win",
    Android: "and",
    "Chromium OS": "chr",
    iOS: "ios",
    //Linux: "lin", UserAghentでバーションが識別できないから無理
    "Mac OS": "mac",
    //Ubuntu: "ubu" UserAghentでバーションが識別できないから無理
    //iPad os UserAghent変わる可能性あり
  };

  const Supported_Browser = {
      Chrome: "chr",
      Edge: "edg",
      Firefox: "fir",
      //UserAghentで識別できるのみ対応しています。
      //追加してほしい場合は、7yuさんと相談してください。
    };

class Useraghent_block {
  constructor(useragent) {
    this.useragent = useragent;
    this.ue = parser(useragent);
  }

  getResult() {
    return this.ue;
  }

  getSupported_OS() {
    let ue = this.getResult()
    if (Supported_OS[ue.os.name]) {
        let os = Supported_OS[ue.os.name];
        let ver = ue.os.version.trim().split(/\./g);
        if (os == "win" && ["8.1", "10"].includes(ue.os.version)) {
          return "win"
        }
        if (
          os == "and" &&
          (["6.0.1", "7.1.2", "8.1", "9.0", "10.0"].includes(ue.os.version) ||
            "11" <= ver[0])
        ) {
          return "and"
        }
        if (os == "chr" && "84" <= ver[0]) {
          return "chr"
        }
        if (
          os == "ios" &&
          ( ("13" <= ver[0] &&  "6" <= ver[2]) || "14" <= ver[0])
        ) {
          return "ios"
        }
        if (
          os == "mac" &&
          ( ("10" <= ver[0] && "13" <= ver[2] && "16" <= ver[3]) || ("10" <= ver[0] && "14" <= ver[2]) || "11" <= ver[0])
        ) {
          return "mac"
        }
      } else {
        console.log("Not Supported_OS");
        return false
      }
  }

  getSupported_browser() {
    let ue = this.getResult()
    let os = this.getSupported_OS()
    if (Supported_Browser[ue.browser.name]) {
        let bro = Supported_Browser[ue.browser.name];
        let ver = ue.browser.version.trim().split(/\./g);
        //win,macモダンブラウザーは基本的に自動アップデートがあるので細かく指定しません。
        //chromeさんは、親切に全てのプラットフォームのバージョンの第一の値(?)が同じ
        if (bro == "chr" && "84" <= ver[0]) {
          return "chr"
        }
        if (((os == "ios" || os == "and") && (bro == "edg" &&  "45" <= ver[0]))||((os == "win"||os == "mac") && (bro == "edg" &&  "82" <= ver[0])))
         {
          return "edg"
        }
        if ((os == "ios"  && (bro == "fir" &&  "28" <= ver[0]))||( os == "and" && (bro == "fir" &&  "68" <= ver[0]))||((os == "win"||os == "mac") && (bro == "fir" && "78" <= ver[0]))) {
          return "fir"
        }
      } else {
        console.log("Not Supported_Browser");
        return false
      }
    
  }
}

module.exports = Useraghent_block;
