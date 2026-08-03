const {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  BorderStyle, AlignmentType, Spacing, PageBreak
} = require("docx");

const NAVY = "1F3D63";
const GOLD = "C9A15A";
const GRAY = "555555";

function coverTitle(text) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 44, color: NAVY, font: "Georgia" })],
    alignment: AlignmentType.LEFT,
    spacing: { after: 120 },
  });
}

function coverSubtitle(text) {
  return new Paragraph({
    children: [new TextRun({ text, size: 24, color: GRAY, font: "Calibri" })],
    spacing: { after: 60 },
  });
}

function sectionHeading(number, text) {
  return new Paragraph({
    children: [
      new TextRun({ text: `${number}. `, bold: true, size: 28, color: GOLD, font: "Georgia" }),
      new TextRun({ text, bold: true, size: 28, color: NAVY, font: "Georgia" }),
    ],
    spacing: { before: 400, after: 160 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 6, color: NAVY, space: 6 },
    },
  });
}

function sectionIntro(text) {
  return new Paragraph({
    children: [new TextRun({ text, italics: true, size: 21, color: GRAY })],
    spacing: { after: 200 },
  });
}

function questionPara(number, text) {
  return new Paragraph({
    children: [
      new TextRun({ text: `${number}.  `, bold: true, size: 22 }),
      new TextRun({ text, bold: true, size: 22 }),
    ],
    spacing: { before: 200, after: 60 },
  });
}

function notePara(text) {
  return new Paragraph({
    children: [new TextRun({ text, italics: true, size: 19, color: "8A6D3B" })],
    spacing: { after: 80 },
    indent: { left: 260 },
  });
}

function blankLine() {
  return new Paragraph({
    children: [new TextRun({ text: " " })],
    spacing: { before: 160, after: 160 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 4, color: "AAAAAA", space: 1 },
    },
  });
}

function spacer(h = 120) {
  return new Paragraph({ children: [], spacing: { after: h } });
}

// question: { text, note, blanks }
function buildQuestion(number, q) {
  const parts = [questionPara(number, q.text)];
  if (q.note) parts.push(notePara(q.note));
  const blanks = q.blanks || 1;
  for (let i = 0; i < blanks; i++) parts.push(blankLine());
  return parts;
}

function buildSection(sectionNum, title, intro, questions) {
  let out = [sectionHeading(sectionNum, title)];
  if (intro) out.push(sectionIntro(intro));
  let n = 1;
  for (const q of questions) {
    out = out.concat(buildQuestion(n, q));
    n++;
  }
  return out;
}

const sections = [
  {
    title: "Contact & Location Details",
    intro: null,
    questions: [
      { text: "What is your full office street address?", note: "The site currently only shows Cypress, Texas. A full address helps with Google Maps and local search ranking.", blanks: 1 },
      { text: "Would you like the exact street address displayed publicly, or just the city / service area?", blanks: 1 },
      { text: "What email address should be displayed publicly and receive contact form submissions?", note: "Currently a placeholder: info@leuneslaw.com", blanks: 1 },
      { text: "Would you like online appointment scheduling added (e.g., Calendly) for consultations, or is a phone call / contact form enough?", blanks: 1 },
    ],
  },
  {
    title: "Attorney Background & Credentials",
    intro: null,
    questions: [
      { text: "What was your exact title at the Texas Attorney General's Office, and what years did you serve?", note: "The site currently guesses Asst. Attorney General - please confirm or correct this.", blanks: 2 },
      { text: "Do you hold any board certifications (e.g., Texas Board of Legal Specialization)?", blanks: 1 },
      { text: "Any awards, ratings, or professional recognitions we should feature (Super Lawyers, AVVO, Martindale-Hubbell, etc.)?", blanks: 2 },
      { text: "What law school did you attend, and what year did you graduate?", note: "Optional — only if you'd like it featured on the About page.", blanks: 1 },
      { text: "What year were you admitted to the Texas Bar? Are you licensed in any other states?", blanks: 1 },
    ],
  },
  {
    title: "Practice Areas & Site Content",
    intro: null,
    questions: [
      { text: "Wrongful Death is currently listed as a practice area on the site. Please confirm this should remain.", blanks: 1 },
      { text: "For Real Estate and Estate Planning, are there specific services we should list by name (e.g., probate, guardianships, closings)?", blanks: 2 },
      { text: "Is the Free Consultation offer valid for all practice areas, including Real Estate and Estate Planning, or only for Personal Injury cases?", blanks: 1 },
      { text: "Please review the Resources page articles for accuracy before launch, and let us know if you'd like to add any additional topics.", note: "These are general educational articles we wrote about accidents, insurance, and related legal topics.", blanks: 2 },
    ],
  },
  {
    title: "Client Testimonials & Reviews",
    intro: null,
    questions: [
      { text: "Do you have a Google Business Profile? If so, what's the listing name or link?", note: "This lets us link directly to your reviews and helps local search ranking.", blanks: 1 },
    ],
  },
  {
    title: "Case Results",
    intro: null,
    questions: [
      { text: "All dollar amounts on the Case Results page are placeholder numbers, not real cases. Please provide real, anonymized settlement or verdict amounts with a one-line description we can publish (no client names needed).", blanks: 3 },
      { text: "Are there any settlement confidentiality agreements that would prevent us from publishing specific dollar amounts for certain cases?", blanks: 1 },
      { text: "Roughly how many case results would you like featured on the site?", blanks: 1 },
    ],
  },
  {
    title: "Photos, Logo & Media",
    intro: null,
    questions: [
      { text: "Do you have real photos of your office (interior and/or exterior) to replace the current stock photos?", blanks: 1 },
      { text: "Do you have any photos of you with clients, in court, or at community / professional events?", blanks: 1 },
      { text: "Do you have any video content (an introduction video, client testimonial videos, etc.) you'd like included?", blanks: 1 },
    ],
  },
  {
    title: "Spanish / Bilingual Content",
    intro: null,
    questions: [
      { text: "All Spanish text on the site was AI-translated. Would you or a bilingual staff member (Mariana or Carolina, for example) be able to review it for accuracy and tone before launch?", blanks: 1 },
    ],
  },
  {
    title: "Online Presence & SEO",
    intro: null,
    questions: [
      { text: "What domain name should the site be published under (e.g., leuneslaw.com)?", blanks: 1 },
      { text: "Do you have active social media accounts (Facebook, Instagram, LinkedIn) you'd like linked in the footer?", blanks: 2 },
      { text: "Would you like Google Analytics installed so you can track website visitors and calls?", note: "Netlify's built-in analytics is a paid add-on, not a free feature - Google Analytics is the free option, so that's what we'll set up unless you tell us otherwise.", blanks: 1 },
      { text: "Do you already have a Google Business Profile? If so, please share the listing so we can match your name, address, and phone number exactly — this consistency matters for local search ranking.", blanks: 2 },
    ],
  },
  {
    title: "Legal & Compliance",
    intro: null,
    questions: [
      { text: "Texas attorney advertising rules sometimes require specific disclosure language (for example, if you are not board certified). Do you have standard disclaimer language from other advertising that we should match?", blanks: 2 },
      { text: "Would you like a Privacy Policy and Terms of Use page added?", note: "The site does not currently have one, and the contact form collects personal information.", blanks: 1 },
      { text: "Are there any states or types of legal work you do NOT handle that we should be careful not to imply on the website?", blanks: 1 },
    ],
  },
  {
    title: "Anything Else",
    intro: null,
    questions: [
      { text: "Is there anything about your background, your firm, or how you'd like to be presented that we haven't asked about but should know before the site goes live?", blanks: 3 },
      { text: "Any final notes, corrections, or concerns about the current site?", blanks: 3 },
    ],
  },
];

let body = [];

body.push(coverTitle("LeUnes Law Firm"));
body.push(coverSubtitle("Website Content & Information Questionnaire"));
body.push(spacer(200));

body.push(new Paragraph({
  children: [new TextRun({
    text: "Hi Christopher — before we publish the site, we wanted to check in on a handful of details that only you would know. The site was built using the information from our discovery meeting plus general legal-industry knowledge, so a few sections (testimonials, case results, some bios) currently use placeholder content while we finished the design. Those are called out below so you know exactly what needs real information before launch.",
    size: 22,
  })],
  spacing: { after: 160 },
}));

body.push(new Paragraph({
  children: [new TextRun({
    text: "Feel free to type your answers directly into this document, or let us know if you'd rather go over any of it on a call instead.",
    size: 22,
  })],
  spacing: { after: 100 },
}));

body.push(new Paragraph({
  children: [new TextRun({
    text: "Date sent: July 30, 2026",
    size: 20,
    italics: true,
    color: GRAY,
  })],
  spacing: { after: 300 },
}));

let sectionNum = 1;
for (const s of sections) {
  body = body.concat(buildSection(sectionNum, s.title, s.intro, s.questions));
  sectionNum++;
}

const doc = new Document({
  sections: [
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1080, bottom: 1080, left: 1080, right: 1080 },
        },
      },
      children: body,
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  require("fs").writeFileSync("LeUnes_Law_Firm_Client_Questionnaire.docx", buffer);
  console.log("done");
});
