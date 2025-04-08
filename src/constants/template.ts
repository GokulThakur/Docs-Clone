export const templates = [
  {
    id: "blank",
    label: "Blank Document",
    imageUrl: "/blank-document.svg",
    initialContent: "<p></p>"
  },
  {
    id: "business-letter",
    label: "Business Letter",
    imageUrl: "/business-letter.svg",
    initialContent: `
      <p>Your Name</p>
      <p>Your Address</p>
      <p>City, State ZIP Code</p>
      <p>Date</p>
      <p>Recipient Name</p>
      <p>Recipient Title</p>
      <p>Company Name</p>
      <p>Company Address</p>
      <br/>
      <p>Dear [Recipient Name],</p>
      <p>I am writing to formally...</p>
      <br/>
      <p>Sincerely,</p>
      <p>Your Name</p>
    `
  },
  {
    id: "cover-letter",
    label: "Cover Letter",
    imageUrl: "/cover-letter.svg",
    initialContent: `
      <p>Your Name</p>
      <p>Your Email | Phone Number</p>
      <p>Date</p>
      <p>Hiring Manager</p>
      <p>Company Name</p>
      <p>Company Address</p>
      <br/>
      <p>Dear Hiring Manager,</p>
      <p>I am excited to apply for the [Position] at [Company Name]...</p>
      <br/>
      <p>Thank you for your time and consideration.</p>
      <p>Sincerely,</p>
      <p>Your Name</p>
    `
  },
  {
    id: "project-proposal",
    label: "Project Proposal",
    imageUrl: "/project-proposal.svg",
    initialContent: `
      <h1>Project Proposal</h1>
      <h2>Project Title</h2>
      <p>Submitted by: Your Name</p>
      <h3>1. Introduction</h3>
      <p>Provide background and context for the project...</p>
      <h3>2. Objectives</h3>
      <ul>
        <li>Objective 1</li>
        <li>Objective 2</li>
      </ul>
      <h3>3. Timeline</h3>
      <p>Outline major phases and milestones.</p>
      <h3>4. Budget</h3>
      <p>Estimated cost breakdown.</p>
    `
  },
  {
    id: "resume",
    label: "Resume",
    imageUrl: "/resume.svg",
    initialContent: `
      <h1>Your Name</h1>
      <p>Email | Phone | LinkedIn</p>
      <h2>Professional Summary</h2>
      <p>Brief overview of your experience and strengths.</p>
      <h2>Work Experience</h2>
      <p><strong>Job Title</strong> — Company Name</p>
      <p>Dates</p>
      <ul>
        <li>Achievement 1</li>
        <li>Achievement 2</li>
      </ul>
      <h2>Education</h2>
      <p>Degree — School Name</p>
    `
  },
  {
    id: "software-proposal",
    label: "Software Proposal",
    imageUrl: "/software-proposal.svg",
    initialContent: `
      <h1>Software Development Proposal</h1>
      <p>Submitted to: [Client Name]</p>
      <p>Submitted by: [Your Name / Company]</p>
      <h2>Overview</h2>
      <p>Brief overview of the software to be developed.</p>
      <h2>Goals</h2>
      <ul>
        <li>Goal 1</li>
        <li>Goal 2</li>
      </ul>
      <h2>Technical Approach</h2>
      <p>Description of technologies, tools, and architecture.</p>
      <h2>Budget & Timeline</h2>
      <p>Breakdown of cost and estimated delivery.</p>
    `
  },
];
