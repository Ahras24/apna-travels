// All site copy lives here so it can be updated without touching components.
// Source: existing apnatravels.org website + client brief.
import clientsByCountry from "./clients.json";

const img = (u, w = 1400) => `${u}&w=${w}&auto=format&fit=crop`;

export const COMPANY = {
  name: "Apna Travels",
  tagline: "Your New Life Begins",
  // As supplied in the brief. NOTE: the live site shows "B-0100/BOM/PART/1000+/5/1224/84" — confirm which is correct.
  regNo: "B-100/BOM/PART/1000+/3/1224/1984",
  regLabel: "Government-registered Manpower Consulting Firm",
  established: 2012,
  phone: "+91 22 4575 1697",
  phoneHref: "tel:+912245751697",
  whatsapp: "+91 98210 90453",
  whatsappNumber: "919821090453",
  website: "https://apnatravels.org/",
  address:
    "Ground Floor, Shop No. 4, Bldg. No. 17, Maruti Mansion, Maruti Lane, Fort, Mumbai – 400 001, India.",
  description:
    "A government-registered manpower consulting firm supplying skilled, semi-skilled and white-collar professionals from India to employers across the Middle East.",
};

export const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Us" },
  { id: "industries", label: "Industries" },
  { id: "process", label: "Our Process" },
  { id: "clients", label: "Clients" },
];

// Figures from the existing website — edit here to update.
export const STATS = [
  { value: 200, suffix: "K+", label: "Manpower Supplied" },
  { value: 10, suffix: "+", label: "Years of Operation" },
  { value: 5, suffix: "+", label: "Countries Served" },
  { value: 100, suffix: "+", label: "Client Companies" },
];

export const ABOUT = {
  paragraphs: [
    "Apna Travels is a manpower consulting firm established in 2012, providing skilled, semi-skilled and white-collar manpower to companies in India and the Middle East.",
    "The company specialises in front-end and back-end manpower supply, handling permanent, fixed-term and temporary recruitment from entry-level positions to managerial roles.",
    "Through its focus on client service and the quality of talent supplied, Apna Travels has expanded its recruitment operations into international markets.",
  ],
  vision: "To become the link between great companies and extraordinary talent.",
  mission: "To be the most preferred manpower consulting firm in the Middle East.",
  values: [
    { title: "Transparency", text: "The candidate and the client are aware of all the details and context of every single interaction." },
    { title: "Respect", text: "Every individual, be it the client or the candidate, is treated with mutual respect and integrity." },
    { title: "Teamwork", text: "We create synergy by ensuring all activities are carried out collaboratively." },
    { title: "Adaptability", text: "We are always open to suggestions and feedback, helping clients optimally achieve their goals." },
  ],
  imageLarge: img("https://images.unsplash.com/photo-1778074762022-c33cc42f79ae?crop=entropy&cs=srgb&fm=jpg&q=80", 1200),
  imageSmall: img("https://images.unsplash.com/photo-1758518730037-a16581a040e8?crop=entropy&cs=srgb&fm=jpg&q=80", 700),
};

export const WHY = {
  intro:
    "Most companies struggle to find the right talent. Background checks alone cannot validate a candidate's practical skills. Apna Travels focuses on skill verification as an important part of the recruitment process.",
  steps: [
    "Every shortlisted candidate must clear a mandatory Skill Check Exam at government-authorised institutes.",
    "Only candidates who pass the skill assessment move forward in the recruitment process.",
    "Employers receive candidates whose skills have been assessed against their requirements.",
  ],
  highlight: "Government-Accredited Trade Testing",
  partner: "In partnership with Houston Testing & Skill Upgradation Academy.",
  image: img("https://images.unsplash.com/photo-1690356107685-3725367f6f3f?crop=entropy&cs=srgb&fm=jpg&q=80", 1200),
};

export const SERVICES = [
  {
    id: "skilled",
    title: "Skilled & Technical Manpower",
    desc: "Trade-tested hands for sites, workshops and facilities — the electricians, welders and builders that keep projects moving.",
    roles: ["Electricians", "Welders", "Tailors", "Masons", "Carpenters", "Plumbers", "Construction Workers"],
    image: img("https://images.unsplash.com/photo-1595856898575-9d187bd32fd6?crop=entropy&cs=srgb&fm=jpg&q=80"),
  },
  {
    id: "equipment",
    title: "Heavy Equipment Operators & Drivers",
    desc: "Operators and drivers for cranes, loaders, dozers and trailers on construction and logistics operations.",
    roles: ["General Drivers", "Heavy Crane Operators", "Wheel Loader Operators", "Dozer Operators", "Trailer Drivers", "Mobile Crane Operators", "Tower Crane Operators", "Grader Operators"],
    image: img("https://images.unsplash.com/photo-1625451102313-c4610feca0b7?crop=entropy&cs=srgb&fm=jpg&q=80"),
  },
  {
    id: "engineering",
    title: "Engineering & Management Professionals",
    desc: "Qualified engineers and site leadership across civil, structural, electrical and mechanical disciplines.",
    roles: ["Civil Engineers", "Architectural Engineers", "Electrical Engineers", "Mechanical Engineers", "Structural Engineers", "Electronics Engineers", "Material Control Engineers", "Foremen and Supervisors"],
    image: img("https://images.unsplash.com/photo-1632862378069-4ad0348cea4f?crop=entropy&cs=srgb&fm=jpg&q=80"),
  },
  {
    id: "office",
    title: "Office & Administrative Staff",
    desc: "Dependable back-office support — from records and accounts to payroll, timekeeping and security.",
    roles: ["Computer Operators", "Secretaries", "Typists", "Filing Clerks", "Accounts Clerks", "Time Keepers", "Payroll Clerks", "Security Officers"],
    image: img("https://images.unsplash.com/photo-1758518731706-be5d5230e5a5?crop=entropy&cs=srgb&fm=jpg&q=80"),
  },
  {
    id: "hospitality",
    title: "Hospitality & Catering Staff",
    desc: "Front-of-house and kitchen teams for hotels, restaurants and catering operations.",
    roles: ["Front Office Managers", "Guest Relations Supervisors", "Receptionists", "Food & Beverage Supervisors", "Cashiers", "Chefs", "Head Cooks", "Waiters", "Restaurant Supervisors"],
    image: img("https://images.unsplash.com/photo-1622021142947-da7dedc7c39a?crop=entropy&cs=srgb&fm=jpg&q=80"),
  },
  {
    id: "industrial",
    title: "Industrial, Fabrication & Construction Staff",
    desc: "Steel, sheet metal, pipework and civil construction crews, with the foremen and safety roles that lead them.",
    roles: ["General Foremen", "Steel Erectors", "Pipe Fabricators", "Steel Fixers", "Blacksmiths", "Carpenters", "Masons", "Painters", "Safety Inspectors", "Plant Foremen", "Semi-skilled Labour"],
    image: img("https://images.unsplash.com/photo-1698664683348-f9f35b809821?crop=entropy&cs=srgb&fm=jpg&q=80"),
  },
  {
    id: "store",
    title: "Store Management & Operations",
    desc: "Store and inventory staff who keep materials, spares and records accounted for.",
    roles: ["Store Managers", "Senior and Junior Store Keepers", "Electrical Store Keepers", "Equipment Spare Parts Store Keepers", "Store Accountants", "Cardex Clerks"],
    image: img("https://images.unsplash.com/photo-1740914994657-f1cdffdc418e?crop=entropy&cs=srgb&fm=jpg&q=80"),
  },
  {
    id: "camp",
    title: "Camp & Food Shop Management",
    desc: "Cafeteria, food store and purchasing staff for camps and on-site food operations.",
    roles: ["Restaurant Cleaners", "Food Store Keepers", "Restaurant Clerks", "Food Purchase Officers", "Food Purchase Clerks", "Food Store Accountants", "Food Store Helpers", "Cafeteria Bill Clerks"],
    image: img("https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?crop=entropy&cs=srgb&fm=jpg&q=80"),
  },
];

export const INDUSTRIES = [
  { title: "Construction & Infrastructure", desc: "Masons, carpenters, foremen and site crews for building and civil works.", image: img("https://images.unsplash.com/photo-1601465208371-7b200e22b3d2?crop=entropy&cs=srgb&fm=jpg&q=80", 1600) },
  { title: "Engineering & Technical", desc: "Civil, electrical, mechanical and structural engineers with technical trades.", image: img("https://images.unsplash.com/photo-1762146828422-50a8bd416d3c?crop=entropy&cs=srgb&fm=jpg&q=80", 1000) },
  { title: "Heavy Equipment & Transportation", desc: "Crane, loader, dozer and grader operators, trailer and general drivers.", image: img("https://images.unsplash.com/photo-1593113616591-8baf0374ad42?crop=entropy&cs=srgb&fm=jpg&q=80", 1000) },
  { title: "Steel, Fabrication & Industrial Operations", desc: "Welders, steel erectors, pipe fabricators and fixers for industrial projects.", image: img("https://images.unsplash.com/photo-1714504904786-b6732390b206?crop=entropy&cs=srgb&fm=jpg&q=80", 1000) },
  { title: "Hospitality & Catering", desc: "Hotel front office, chefs, cooks and restaurant teams.", image: img("https://images.unsplash.com/photo-1572715376701-98568319fd0b?crop=entropy&cs=srgb&fm=jpg&q=80", 1000) },
  { title: "Office & Business Operations", desc: "Secretaries, clerks, operators and accounts support.", image: img("https://images.unsplash.com/photo-1577415124269-fc1140a69e91?crop=entropy&cs=srgb&fm=jpg&q=80", 1000) },
  { title: "Warehousing & Store Management", desc: "Store managers, keepers and accountants for materials and spares.", image: img("https://images.unsplash.com/photo-1689942010216-dc412bb1e7a9?crop=entropy&cs=srgb&fm=jpg&q=80", 1600) },
];

export const PROCESS = [
  { title: "Demand Letter", text: "Client shares manpower requirements." },
  { title: "Publish Requirement", text: "Vacancies are advertised." },
  { title: "Screening & Shortlisting", text: "Candidates undergo initial evaluation." },
  { title: "Government-Approved Trade Test", text: "Candidate skills are verified." },
  { title: "Interview & Selection", text: "Interviews take place in person or through video calls." },
  { title: "Paperwork & Visa", text: "Required documentation and visa processing." },
  { title: "Deployment", text: "Selected candidates travel to their destination." },
];

// Recruitment destinations (not office locations)
export const DESTINATIONS = [
  { name: "Saudi Arabia", lat: 24.7, lng: 46.7 },
  { name: "United Arab Emirates", lat: 24.45, lng: 54.4 },
  { name: "Qatar", lat: 25.3, lng: 51.5 },
  { name: "Bahrain", lat: 26.1, lng: 50.6 },
  { name: "Oman", lat: 23.6, lng: 58.4 },
  { name: "Kuwait", lat: 29.4, lng: 47.98 },
];

// Office / branch presence as listed on the existing website
export const OFFICES = [
  { country: "India", cities: [
    { name: "Mumbai", note: "Head Office", lat: 19.07, lng: 72.88, hq: true },
    { name: "Lucknow", lat: 26.85, lng: 80.95 },
    { name: "Gorakhpur", lat: 26.76, lng: 83.37 },
    { name: "Jaipur", lat: 26.91, lng: 75.79 },
    { name: "Patna", lat: 25.59, lng: 85.14 },
    { name: "Delhi", lat: 28.61, lng: 77.21 },
  ]},
  { country: "Saudi Arabia", cities: [
    { name: "Riyadh", lat: 24.71, lng: 46.68 },
    { name: "Dammam", lat: 26.42, lng: 50.09 },
  ]},
  { country: "Other locations", cities: [
    { name: "UAE", lat: 25.2, lng: 55.27 },
    { name: "Nepal", lat: 27.7, lng: 85.32 },
  ]},
];

export const CLIENT_TABS = [
  { id: "sa", label: "Saudi Arabia" },
  { id: "kw", label: "Kuwait" },
  { id: "om", label: "Oman" },
  { id: "bh", label: "Bahrain" },
  { id: "qa", label: "Qatar" },
  { id: "ae", label: "UAE" },
];
// Grouping reproduced exactly as on the existing website.
export const CLIENTS = clientsByCountry;

export const TEAM = {
  name: "Zainul Abedin Khan",
  role: "Operational Manager",
  quote:
    "It is because of the dedicated leaders we have in our organisation that Apna Travels has been able to get to where it is today.",
};

export const GULF_COUNTRIES = ["Saudi Arabia", "United Arab Emirates", "Qatar", "Bahrain", "Oman", "Kuwait"];
