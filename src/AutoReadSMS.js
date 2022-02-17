export async function autoReadSMS(cb) {
  // used AbortController with setTimeout so that WebOTP API (Autoread sms) will get disabled after 1min
  console.log("Called: autoReadSMS");
  const signal = new AbortController();
  setTimeout(() => {
    signal.abort();
    cb();
  }, 1 * 60 * 1000);
  async function main() {
    console.log("Called: main");
    if ("OTPCredential" in window) {
      try {
        if (navigator.credentials) {
          try {
            await navigator.credentials
              .get({ abort: signal, otp: { transport: ["sms"] } })
              .then((content) => {
                console.log("Content:", content);
                if (content && content.code) {
                  cb(content.code);
                }
              })
              .catch((e) => console.log(e));
          } catch (err) {
            console.log("err ", err);
            return;
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  main();
}
