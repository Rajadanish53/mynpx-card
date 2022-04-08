#!/usr/bin/env node

"use strict";

const boxen = require("boxen");
const chalk = require("chalk");
const inquirer = require("inquirer");
const clear = require("clear");
const open = require("open");
const fs = require("fs");
const request = require("request");
const path = require("path");
const ora = require("ora");
const cliSpinners = require("cli-spinners");

// clear the terminal before showing the npx card

clear();

const prompt = inquirer.createPromptModule();
const questions = [
  {
    type: "list",
    name: "action",
    message: "What do you want to do?",
    choices: [
      {
        // Use chalk to style headers
        name: `Toss an ${chalk.bold("email")}?`,
        value: () => {
          open("mailto:bestbarb43@gmail.com");
          console.log(
            "\nLooking forward to hearing your message and replying to you!\n"
          );
        },
      },
      {
        name: `Download my ${chalk.magentaBright.bold("Resume")}?`,
        value: () => {
          // cliSpinners.dots;
          const loader = ora({
            text: " Downloading Resume",
            spinner: cliSpinners.material,
          }).start();
          let pipe = request(
            "https://drive.google.com/file/d/1Su1CPnw4YTlSDNUl-aC8UUV-c0rLoyje/view"
          ).pipe(fs.createWriteStream("./DanishResume.pdf"));
          pipe.on("finish", function () {
            let downloadPath = path.join(process.cwd(), "DanishResume.pdf");
            console.log(`\nResume Downloaded at ${downloadPath} \n`);
            open(downloadPath);
            loader.stop();
          });
        },
      },
      {
        name: "Exit",
        value: () => {
          console.log("Good bye, have a nice day!\n");
        },
      },
    ],
  },
];
const data = {
  name: chalk.bold.hex("#d9ed92")("                  M Danish"),
  handle: chalk.white("@mddev"),
  fact: chalk.hex("#B10000")("I love Open-Source!"),
  github:
    chalk.hex("#D3D3D3")("https://github.com/") +
    chalk.hex("#eae2b7	")("rajadanish53"),
  linkedin:
    chalk.hex("#D3D3D3")("https://www.linkedin.com/in/") +
    chalk.hex("#0a9396	")("muhammad-danish-826714227"),
  website: chalk.hex("#ffba08	")("www.mdeveloprs.netlify.com"),
  npx: chalk.hex("#A1AB00")("npx danish"),

  labelFact: chalk.hex("#FF6262").bold("          Fun Fact:"),
  labelGitHub: chalk.hex("#9E9E9E").bold("         GitHub:"),
  labellinkedin: chalk.hex("#F259FF").bold("       linkedin:"),
  labelWebsite: chalk.hex("#59FFC8").bold("        Website:"),
  labelCard: chalk.hex("#FFF976").bold("                  Card:"),
};
const me = boxen(
  [
    `${data.name}`,
    ``,
    `${data.labelGitHub}  ${data.github}`,
    `${data.labellinkedin}  ${data.linkedin}`,
    `${data.labelWebsite}  ${data.website}`,
    ``,
    `${data.labelCard}  ${data.npx}`,
    ``,
    `${chalk.bold("Hi there! I'm Danish, I'm a passionate Full stack ")}`,
    `${chalk.bold("developer and web designer from Pakistan, and have a ")}`,
    `${chalk.bold(
      "Focused on creating purposeful, human-centered designs for apps, "
    )}`,
    `${chalk.bold(
      "and enjoy bringing ideas to life in the browser. Toss me an email if you want to collab!"
    )}`,
  ].join("\n"),
  {
    margin: 1,
    float: "center",
    padding: 1,
    borderStyle: "single",
    borderColor: "blue",
  }
);

// Show the boxen
console.log(me);
prompt(questions).then((answer) => answer.action());
