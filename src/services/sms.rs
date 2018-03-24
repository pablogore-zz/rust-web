use reqwest;

use config::{MSG_91_API_ENDPOINT, MSG_91_AUTHKEY, MSG_91_SENDER_SMS_ID};
use errors::WebError;

#[derive(Serialize, Deserialize, Debug)]
struct Msg91Res {
  #[serde(rename = "type")]
  rtype: String,
  message: String,
}

pub fn send_otp(phone: &str) -> Result<(), WebError> {
  let client = reqwest::Client::new();
  let data: Msg91Res = client
    .post(&format!(
      "{}/sendotp.php?authkey={}&sender={}&mobile={}",
      MSG_91_API_ENDPOINT, MSG_91_AUTHKEY, MSG_91_SENDER_SMS_ID, phone
    ))
    .send()?
    .json()?;
  if data.rtype != "success" {
    return Err(WebError::Validation(data.message));
  }
  Ok(())
}

pub fn retry_otp(phone: &str) -> Result<(), WebError> {
  let client = reqwest::Client::new();
  let data: Msg91Res = client
    .post(&format!(
      "{}/retryotp.php?authkey={}&mobile={}",
      MSG_91_API_ENDPOINT, MSG_91_AUTHKEY, phone
    ))
    .send()?
    .json()?;
  if data.rtype != "success" {
    return Err(WebError::Validation(data.message));
  }
  Ok(())
}

pub fn verify_otp(phone: &str, otp: &str) -> Result<(), WebError> {
  let client = reqwest::Client::new();
  let data: Msg91Res = client
    .post(&format!(
      "{}/verifyRequestOTP.php?authkey={}&mobile={}&otp={}",
      MSG_91_API_ENDPOINT, MSG_91_AUTHKEY, phone, otp
    ))
    .send()?
    .json()?;
  if data.rtype != "success" {
    return Err(WebError::Validation(data.message));
  }
  Ok(())
}
