use std;
use log;
use fern;
use fern::colors::{Color, ColoredLevelConfig};
use chrono::prelude::*;
use colored::*;

pub fn setup() {
  let colors = ColoredLevelConfig::new()
    .info(Color::Green)
    .warn(Color::Magenta);
  fern::Dispatch::new()
    .format(move |out, message, record| {
      out.finish(format_args!(
        "[{}][{}][{}] {}",
        format!("{}", Utc::now().format("%Y-%m-%d][%H:%M:%S")).bright_blue(),
        record.target().bright_blue(),
        colors.color(record.level()),
        message
      ))
    })
    .level(log::LevelFilter::Info)
    .chain(std::io::stdout())
    // .chain(fern::log_file("output.log").expect("Could not open log file output.log"))
    .apply()
    .expect("Could not initialize logger");
  info!("setting up on stdout");
  info!("setup success");
}
