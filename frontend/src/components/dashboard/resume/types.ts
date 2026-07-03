export interface ResumeData {
  personal: {
    fullName: string;
    headline: string;
    email: string;
    mobile: string;
    location: string;
    linkedin: string;
    github: string;
    portfolio: string;
    summary: string;
  };
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    branch: string;
    university: string;
    startDate: string;
    endDate: string;
    cgpa: string;
    coursework: string;
  }>;
  skills: {
    technical: string[];
    core: string[];
    tools: string[];
    soft: string[];
    languages: string[];
  };
  projects: Array<{
    id: string;
    title: string;
    duration: string;
    technologies: string;
    github: string;
    live: string;
    description: string;
    role: string;
  }>;
  experience: Array<{
    id: string;
    company: string;
    role: string;
    type: string;
    startDate: string;
    endDate: string;
    responsibilities: string;
    technologies: string;
    achievements: string;
  }>;
  certifications: Array<{
    id: string;
    name: string;
    organization: string;
    date: string;
    credentialId: string;
    url: string;
  }>;
  achievements: Array<{
    id: string;
    title: string;
    description: string;
  }>;
}

export const initialResumeData: ResumeData = {
  personal: {
    fullName: '',
    headline: '',
    email: '',
    mobile: '',
    location: '',
    linkedin: '',
    github: '',
    portfolio: '',
    summary: '',
  },
  education: [],
  skills: {
    technical: [],
    core: [],
    tools: [],
    soft: [],
    languages: [],
  },
  projects: [],
  experience: [],
  certifications: [],
  achievements: [],
};
