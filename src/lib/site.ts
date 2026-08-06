export const site = {
  name: "Susi Davies",
  email: "hello@susidavies.com",
  phone: "+41 79 854 97 52",
  address: "Gewerbestrasse 24, 8800 Thalwil",
  nav: [
    { href: "/retreats", label: "Retreats" },
    { href: "/coaching-mentoring", label: "Coaching & mentoring" },
    { href: "/private-sessions", label: "Private sessions" },
    { href: "/online-courses", label: "Online courses" },
    { href: "/yoga-dynamics-app", label: "Yoga Dynamics app" },
    { href: "/blog", label: "Journal" },
  ],
} as const;

export const services = [
  {
    number: "01",
    title: "Private transformation",
    body: "Deep, tailored sessions designed around your body, goals, and life situation.",
    href: "/private-sessions",
  },
  {
    number: "02",
    title: "Mentoring & coaching",
    body: "Personal guidance for teachers, practitioners, and people ready to grow.",
    href: "/coaching-mentoring",
  },
  {
    number: "03",
    title: "Retreats",
    body: "Step away from daily life and return to what matters: body, breath, and presence.",
    href: "/retreats",
  },
] as const;
