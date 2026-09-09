// ============================================================================
//  SITE DATA
// ============================================================================

const siteData = {
  // --------------------------------------------------------------------
  // SITE-WIDE SETTINGS
  // --------------------------------------------------------------------
  site: {
    domain: "masonpyle.com", 
    featuredProjectsOnHome: 3,
  },

  analytics: {
    provider: "none", // "none" | "goatcounter" | "cloudflare" | "plausible"
    goatcounterCode: "",
    cloudflareToken: "",
    plausibleDomain: "", 
  },

  // --------------------------------------------------------------------
  // PERSON / IDENTITY
  // --------------------------------------------------------------------
  person: {
    name: "Mason Pyle",
    initials: "MP",
    role: "Computer Engineer",
    location: "Cincinnati, OH",
    tagline: "Cincinnati, OH - UC Class of 2029",
    email: "pylemd@mail.uc.edu",
    resumeUrl: "https://github.com/masonpyle/resume/raw/main/Pyle_Mason_Resume.pdf",
  },

  social: [
    { label: "GitHub", url: "https://github.com/mPyle05" },
    { label: "LinkedIn", url: "https://linkedin.com/in/mason-pyle" },
  ],

  nav: [
    { href: "/#work", label: "Work" },
    { href: "/projects/", label: "Projects" },
    { href: "/#experience", label: "Experience" },
    { href: "/#about", label: "About" },
    { href: "/#contact", label: "Contact" },
  ],

  // --------------------------------------------------------------------
  // HOME PAGE - HERO
  // --------------------------------------------------------------------
  hero: {
    heading: "Mason Pyle",
    subheading: "Computer engineer working across hardware, firmware, and industrial controls.",
    paragraph:
      "I design circuit boards, write the firmware that runs on them, and build the control systems that keep factories running. Currently finishing an accelerated Bachelor's and Master's in Computer Engineering with a VLSI focus at the University of Cincinnati.",
    primaryCta: { label: "View résumé", href: "" }, // href left blank on purpose - filled from person.resumeUrl
    secondaryCta: { label: "Get in touch", href: "" }, // filled from person.email
  },

  // --------------------------------------------------------------------
  // PROJECTS
  // --------------------------------------------------------------------
  projects: [
    {
      slug: "keyboard",
      title: "Custom Mechanical Keyboard",
      dates: "Dec 2024 – Jan 2026",
      context: "Personal project",
      featured: true,
      summary: "A fully custom keyboard, designed from the copper up - PCB, firmware, and case.",
      tags: ["KiCad", "C++", "RP2040", "CAD"],
      links: {
        // repo: "https://github.com/masonpyle/mech-keyboard",
      },
      overview: {
        intro:
          "Most keyboards on the market are a compromise between what fits a factory line and what actually fits your hands. This one isn't - every dimension, every trace, and every line of firmware exists because I decided it should.",
        bullets: [
          "Engineered a functional PCB with an optimized circuit layout in KiCad",
          "Wrote RP2040 firmware for custom key mapping, N-key rollover, and per-key RGB",
          "Modeled the case and switch plate in CAD for a two-piece milled enclosure",
        ],
      },
      diagrams: [
        { label: "Schematic", path: "public/images/keyboard/schematic.png" },
        { label: "PCB layout", path: "public/images/keyboard/pcb-layout.png" },
        { label: "Wiring / matrix diagram", path: "public/images/keyboard/matrix.png" },
      ],
      code: {
        heading: "Firmware",
        intro:
          "The firmware runs on an RP2040 and handles key matrix scanning, debouncing, layer switching, and per-key RGB - written in C++ with no framework abstraction between the code and the hardware.",
        snippet: `// Placeholder - replace with a real excerpt from your firmware,
// e.g. the key matrix scan or a custom keymap layer definition.

void scan_matrix() {
    for (uint8_t row = 0; row < ROWS; row++) {
        set_row(row);
        for (uint8_t col = 0; col < COLS; col++) {
            debounce(row, col, read_col(col));
        }
    }
}`,
      },
      models: [
        { label: "Case - top half (CAD render)", path: "public/images/keyboard/case-top.png" },
        { label: "Switch plate (CAD render)", path: "public/images/keyboard/switch-plate.png" },
      ],
      photos: [
        { label: "Assembled board", path: "photo-1.jpg" },
        { label: "Bare PCB", path: "photo-2.jpg" },
        { label: "RGB lit up", path: "photo-3.jpg" },
        { label: "In-progress build", path: "photo-4.jpg" },
      ],
    },
    {
      slug: "solar-car",
      title: "Bearcat Solar Car",
      dates: "Aug 2024 – Present",
      context: "UC Bearcat Solar Car",
      featured: true,
      summary: "UC's solar racing team. I lead software for the vehicle's low-voltage systems.",
      tags: ["C#", "Git", "KiCad"],
      links: {
        // repo: "https://github.com/masonpyle/bearcat-solar-lv",
        site: "https://www.americansolarchallenge.org/",
      },
      overview: {
        intro:
          "The motor and the solar array get most of the attention on a solar car, but the low-voltage systems are what keep the driver informed and the car legal to drive on public roads - lighting, instrumentation, and the electronics that don't touch the battery pack directly.",
        bullets: [
          "Lead software development for low-voltage vehicle systems",
          "Develop embedded firmware in C#, version-controlled with Git on Linux",
          "Design supporting circuit boards in KiCad alongside the electrical team",
        ],
      },
      diagrams: [
        { label: "LV system block diagram", path: "public/images/solar-car/lv-block.png" },
        { label: "Wiring harness map", path: "public/images/solar-car/harness.png" },
        { label: "Instrument cluster schematic", path: "public/images/solar-car/cluster.png" },
      ],
      code: {
        heading: "Software",
        intro:
          "Firmware for the LV systems is written in C#, targeting the boards the electrical team designs. Everything is version-controlled and developed on Linux alongside the rest of the team's tooling.",
        snippet: `// Placeholder - replace with a real excerpt, e.g. a CAN message
// handler for reading pack voltage or driver instrumentation data.

void OnCanMessage(CanFrame frame) {
    switch (frame.Id) {
        case PackVoltageId:
            Dashboard.UpdateVoltage(frame.Data);
            break;
    }
}`,
      },
      models: [
        { label: "LV board (CAD render)", path: "public/images/solar-car/lv-board.png" },
        { label: "Enclosure mount (CAD render)", path: "public/images/solar-car/enclosure.png" },
      ],
      photos: [
        { label: "Car on track", path: "photo-1.jpg" },
        { label: "Team build session", path: "photo-2.jpg" },
        { label: "LV board install", path: "photo-3.jpg" },
        { label: "Testing day", path: "photo-4.jpg" },
      ],
    },
    {
      slug: "vexu",
      title: "UC VEX U Robotics",
      dates: "Apr 2025 – Present",
      context: "University of Cincinnati",
      featured: true,
      summary: "A university-level VEX team I helped found. I lead programming and manage finances.",
      tags: ["C++", "Sensors", "Autonomy"],
      links: {
        repo: "https://github.com/C1NCY",
        site: "https://www.cincyvexu.com/"
      },
      overview: {
        intro:
          "Starting a VEX U team from nothing meant building the technical program and the organization at the same time - recruiting, budgeting, and a codebase, all before the first competition.",
        bullets: [
          "Lead programming for autonomous routines, driver control, and sensor integration",
          "Helped establish the club's organization, technical workflow, and team structure",
          "Manage budgeting, purchasing, and financial planning as club treasurer",
          "Built and curently maintaining the club's website",
        ],
      },
      diagrams: [
        { label: "Autonomous routine flowchart", path: "public/images/vexu/auton-flow.png" },
        { label: "Sensor layout", path: "public/images/vexu/sensors.png" },
        { label: "Subsystem wiring diagram", path: "public/images/vexu/wiring.png" },
      ],
      code: {
        heading: "Software",
        intro:
          "Robot code is written in C++ on top of VEX's competition framework, covering autonomous routines, driver control mapping, and sensor fusion for odometry.",
        snippet: `// Placeholder - replace with a real excerpt, e.g. an autonomous
// routine or a driver-control input mapping.

void autonomous() {
    drive.driveDistance(24_in);
    drive.turnToHeading(90_deg);
    intake.run(INTAKE_SPEED);
}`,
      },
      models: [
        { label: "Robot CAD render", path: "public/images/vexu/robot-cad.png" },
        { label: "Intake mechanism (CAD render)", path: "public/images/vexu/intake-cad.png" },
      ],
      photos: [
        { label: "Robot at competition", path: "photo-1.jpg" },
        { label: "Build session", path: "photo-2.jpg" },
        { label: "Team photo", path: "photo-3.jpg" },
        { label: "Driver practice", path: "photo-4.jpg" },
      ],
    },
  ],

  // --------------------------------------------------------------------
  // EXPERIENCE
  // --------------------------------------------------------------------
  experience: [
    {
      dateLines: ["May 2025 – Dec 2025", "May 2026 – Aug 2026"],
      title: "Controls Engineer",
      org: "Multi-Dimensional Integration, Shrewsbury, PA",
      bullets: [
        "Led a four-week on-site deployment, coordinating engineering activity and commissioning a full system installation",
        "Built and wired industrial control panels; supported PLC, HMI, and SCADA integration",
        "Developed SCADA and MES applications, scripting, and SQL connectivity across 400,000+ tags",
        "Performed and supported 100+ Factory Acceptance Tests validating controls and HMI functionality",
      ],
    },
    {
      dateLines: ["Jun 2023 – Apr 2024"],
      title: "Indirect Shipping & Receiving Associate",
      org: "Cooper Standard Automotive, New Lexington, OH",
      bullets: [
        "Improved inventory accuracy by up to 35% through cycle counting",
        "Streamlined shipping and receiving operations, cutting lead times by 20%+",
      ],
    },
  ],

  // --------------------------------------------------------------------
  // ABOUT
  // --------------------------------------------------------------------
  about: {
    paragraphs: [
      "I'm a computer engineering student at the University of Cincinnati, working through an accelerated Bachelor's and Master's with a focus on VLSI. I graduated as valedictorian of my high school class while completing an Associate of Science degree concurrently - I've been doing two things at once for a while now.",
      "Most of what I build sits at the boundary between hardware and software: PCB layout, embedded firmware, and the control systems that run industrial equipment. I hold an active FAA Part 107 remote pilot license and a Six Sigma Black Belt from the Project Management Institute.",
    ],
    education: [
      {
        degree: "Accelerated M.Eng. & B.S., Computer Engineering",
        school: "University of Cincinnati - VLSI Focus",
        detail: "3.93 GPA · May 2029",
      },
      {
        degree: "A.S., General Science",
        school: "Hocking College",
        detail: "3.99 GPA · 2022 – 2024",
      },
      {
        degree: "Honors Diploma",
        school: "New Lexington High School",
        detail: "Valedictorian · 4.78 GPA · 2020 – 2024",
      },
    ],
    certifications: ["FAA Part 107 Remote Pilot License", "Six Sigma Black Belt - PMI"],
    skills: [
      { category: "Languages", items: ["C++", "C#", "Python", "Verilog", "Java", "SQL", "MATLAB"] },
      { category: "Tools", items: ["Docker", "Git", "Linux", "Vivado", "CMake"] },
      { category: "Hardware & Design", items: ["KiCad", "I2C", "CAN", "UART", "Oscilloscope", "PCB Design"] },
    ],
  },

  // --------------------------------------------------------------------
  // CONTACT
  // --------------------------------------------------------------------
  contact: {
    intro: "Open to controls, embedded, and hardware roles and always happy to talk about PCBs, ASIC design, or robotics.",
  },

  // --------------------------------------------------------------------
  // PROJECTS INDEX PAGE (/projects/)
  // --------------------------------------------------------------------
  projectsPage: {
    eyebrow: "All work",
    heading: "Projects",
    intro: "Everything I've built, from personal builds to team engineering projects.",
  },
};

export default siteData;
