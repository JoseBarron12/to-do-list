import { Page, Labels } from "./class";
import { update } from "./update";
import allImage from "./images/all.svg";
import todayImage from "./images/today.svg";
import upcomingImage from "./images/upcoming.svg";
import pastImage from "./images/past.svg";

import NowImage from "./images/now.svg";
import morningImage from "./images/morning.svg";
import afternoonImage from "./images/afternoon.svg";
import eveningImage from "./images/evening.svg";

import personalImage from "./images/personal.svg";
import workImage from "./images/work.svg";
import schoolImage from "./images/school.svg";
import healthImage from "./images/health.svg";
import financeImage from "./images/finance.svg";
import travelImage from "./images/travel.svg";
import shoppingImage from "./images/shopping.svg";
import socialImage from "./images/social.svg";

const images = {
  all: allImage,
  today: todayImage,
  upcoming: upcomingImage,
  past: pastImage,
  now: NowImage,
  morning: morningImage,
  afternoon: afternoonImage,
  evening: eveningImage,
};

const projectIcons = {
  personal: personalImage,
  work: workImage,
  school: schoolImage,
  health: healthImage,
  finance: financeImage,
  travel: travelImage,
  shopping: shoppingImage,
  social: socialImage,
};

const projectEmojis = {
  personal: "🏠",
  work: "💼",
  school: "🏫",
  health: "🍎",
  finance: "💵",
  travel: "✈",
  shopping: "🛒",
  social: "🎉",
};

const buttonTypes = ["all", "today", "upcoming", "past"];

const page = {
  all: ["all"],
  today: ["now", "morning", "afternoon", "evening"],
  upcoming: ["tommorow", "week", "month", "year"],
  past: ["yesterday", "week", "month", "year"],
};

const nameFlags = ["All", "Tommorow", "Now", "Recent", "Yesterday"];

const currentPage = new Page("today");

const defaultLabels = new Labels();

const allTasksOfUser = update.currentUserTasks();

const allProjectsOfUser = update.currentUserProjects();

export {
  images,
  buttonTypes,
  page,
  nameFlags,
  currentPage,
  defaultLabels,
  allTasksOfUser,
  projectIcons,
  allProjectsOfUser,
  projectEmojis,
};
