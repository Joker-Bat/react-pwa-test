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
      console.log("Window is present");
      try {
        if (navigator.credentials) {
          console.log("credentials is present");

          try {
            await navigator.credentials
              .get({ abort: signal, otp: { transport: ["sms"] } })
              .then((content) => {
                console.log("Content:", content);
                if (content && content.code) {
                  cb(content.code);
                }
              })
              .catch((e) => console.log("one error", e));
          } catch (err) {
            console.log("two error ", err);
            return;
          }
        }
      } catch (err) {
        console.log("three error: ", err);
      }
    }
  }
  main();
}
