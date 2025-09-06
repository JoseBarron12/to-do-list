import allImage from "./images/all.svg";
import todayImage from "./images/today.svg";
import upcomingImage from "./images/upcoming.svg";
import pastImage from "./images/past.svg";

import NowImage from "./images/now.svg";
import morningImage from "./images/morning.svg";
import afternoonImage from "./images/afternoon.svg";
import eveningImage from "./images/evening.svg";


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

const buttonTypes = ["all", "today", "upcoming", "past"];

const page = {
    today: ["now", "morning", "afternoon", "evening"],
    upcoming: ["tommorow", "week", "month", "year"],
    past: ["yesterday", "week", "month", "year"],
}

const nameFlags = ["All", "Tommorow", "Now", "Recent", "Yesterday"];

export {images, buttonTypes, page, nameFlags};