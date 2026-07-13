/**
 * ============================================
 * PAGE CONTENT DATA
 * ============================================
 * All structured content for pages lives here.
 * Edit these arrays/objects to customize the template content.
 *
 * Replace placeholder images in src/assets/ with your own.
 */

export const site = {
  url: 'https://siekmang.dev',
  meta: {
    title: 'Greg Siekman | Automation & Systems Engineer',
    description:
      'Systems minded automations engineer with experience tackling abstract problems.',
  },
  hero: {
    name: 'Greg Siekman',
    role: 'Automation & Systems Engineer',
    tagline: 'Using code and digital tools to automate tasks and make work easier.',
    contact: 'Open to opportunities in education technology and beyond.',
    avatarSrc: '/avatar.webp',
    avatarAlt: 'Greg Siekman',
  },
  about: {
    paragraphs: [
			'I started my development career inhereting a web extension that automated tasks in Canvas LMS. Working on that laid the ground work for how I understand the capacity of software to make work easier. I continue to carry that ethos in my work. Whether I’m setting up auto-deploy practices or implementing documentation-as-code, I try to limit the amount of tedious work involved in the work getting done.',
      'I fundamentally believe technology should be centered on user value— a model that, by-and-large, tech companies have turned away from.',
      {
        heading: 'Tools',
        techItems: ['TypeScript', 'GitHub Actions', 'Python', 'REST API', 'Web Extension Dev', 'Documentation'],
      },
    ],
  },
  experiences: [
    {
      period: '2025',
      title: 'Solution Developer',
      company: 'Unity Environmental University',
      summary:
        'Expanded on an internal browser extension and suite of automation tools used to manage 130+ courses, focusing on eliminating manual friction for educators and staff.',
      highlights: [
      	'Extended TypeScript and React automation pipeline to automate boilerplate content and settings across multiple academic levels',
      	'Implemented robust CI/CD pipeline, replacing manual publication scripts with automated testing, PR-based preview builds, and GPO-based device updates.',
      	'Built one-click workflow tools that bridge internal data sources (Canvas, Salesforce, and Trello)',
				'Led the rollout of a version-controlled "documentation-as-code" platform to keep documentation with the code',
				'Developed data-driven dashboards to surface insights from ticket feedback and course logs, shifting curriculum design toward evidence-based improvements',
      ],
      tech: ['TypeScript', 'React', 'Python', 'Node', 'Zustand'],
    },
    {
      period: '2023',
      title: 'Learning Technology Support Specialist',
      company: 'Unity Environmental University',
      summary:
        'As inaugural LTSS, set procudes for ticket handling, video production, LTI tool audits, and Canvas maintenance.',
      highlights: [
				'Acted as the primary technical authority for Canvas LMS, resolving Tier 1 & 2 issues regarding course design, rubrics, and platform settings',
				'Defined and implemented protocols for ticket lifecycle management, LTI tool compliance audits, and academic video production',
				'Collaborated with learning design teams to translate complex technical requirements into actionable, user-friendly solutions',
				'Served as the bridge between end-user frustrations and technical implementation, identifying recurring pain points that informed course development'
      ],
      tech: ['Canvas LMS', 'Salesforce', 'LTI', 'HTML/CSS'],
    },
    {
      period: '2022',
      title: 'Technology Integrator/IT Support Specialist',
      company: 'MSAD #58',
      summary:
        'Provided hands-on technical support and infrastructure maintenance for a K-12 school district, ensuring reliable hardware and software environments for faculty and students.',
      highlights: [
        'Executed large-scale summer device rollout and fleet maintenance across four campuses, maintaining operational standards through complex logistical challenges',
        'Resolved Tier 1 support tickets, covering end-user identity management, software troubleshooting, and classroom A/V issues',
				'Implemented physical network infrastructure upgrades, including the installation and cabling of security cameras and wireless access points across the district',
        'Evaluated emerging educational technology tools to ensure alignment with K-12 curriculum and district-wide security standards'
      ],
      tech: ['Ticketing', 'Jamf', 'macOS', 'Clever'],
    },
  ],
  // TODO Unsure about this, need to change info even if it's right.
  blogArchivePage: {
    title: 'Blog',
    description: `A collection of thoughts about work I've done.`,
    intro: 'Thoughts about automation, web extensions, tech solutions and more.',
  },
  contact: {
    email: 'dev@siekmang.com',
    github: 'https://github.com/siekmang',
    linkedin: 'https://www.linkedin.com/in/siekmang',
  },
} as const;
