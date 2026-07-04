import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";
export function ResumePreview({ data }) {
  const { personal, education, skills, projects, experience, certifications, achievements } = data;
  const hasContactInfo = personal.email || personal.mobile || personal.location || personal.linkedin || personal.github || personal.portfolio;
  return <div className="w-full h-full p-8 md:p-12 font-sans bg-white text-gray-900 leading-relaxed custom-scrollbar overflow-y-auto">
      {
    /* Header */
  }
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold uppercase tracking-widest text-gray-900 mb-1">
          {personal.fullName || "YOUR NAME"}
        </h1>
        {personal.headline && <h2 className="text-sm font-medium text-gray-600 mb-3">{personal.headline}</h2>}
        
        {hasContactInfo && <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-gray-600">
            {personal.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {personal.email}</span>}
            {personal.mobile && <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {personal.mobile}</span>}
            {personal.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {personal.location}</span>}
            {personal.linkedin && <span className="flex items-center gap-1"><Linkedin className="w-3 h-3" /> {personal.linkedin.replace("https://", "")}</span>}
            {personal.github && <span className="flex items-center gap-1"><Github className="w-3 h-3" /> {personal.github.replace("https://", "")}</span>}
            {personal.portfolio && <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {personal.portfolio.replace("https://", "")}</span>}
          </div>}
      </div>

      {personal.summary && <div className="mb-5">
          <p className="text-[11px] leading-relaxed text-gray-800">{personal.summary}</p>
        </div>}

      {
    /* Education */
  }
      {education.length > 0 && <div className="mb-5">
          <h3 className="text-sm font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wider">Education</h3>
          <div className="space-y-3">
            {education.map((edu) => <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <span className="font-semibold text-xs text-gray-900">{edu.institution}</span>
                  <span className="text-[11px] text-gray-600 font-medium whitespace-nowrap">{edu.startDate} {edu.startDate && edu.endDate ? "-" : ""} {edu.endDate}</span>
                </div>
                <div className="flex justify-between items-start mt-0.5">
                  <span className="text-[11px] text-gray-800">{edu.degree}{edu.branch ? ` in ${edu.branch}` : ""}</span>
                  {edu.cgpa && <span className="text-[11px] text-gray-800 font-medium">CGPA: {edu.cgpa}</span>}
                </div>
              </div>)}
          </div>
        </div>}

      {
    /* Skills */
  }
      {(skills.technical.length > 0 || skills.core.length > 0 || skills.tools.length > 0 || skills.soft.length > 0 || skills.languages.length > 0) && <div className="mb-5">
          <h3 className="text-sm font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wider">Skills</h3>
          <div className="space-y-1.5 text-[11px]">
            {skills.technical.length > 0 && <div><span className="font-semibold">Technical:</span> {skills.technical.join(", ")}</div>}
            {skills.tools.length > 0 && <div><span className="font-semibold">Tools/Tech:</span> {skills.tools.join(", ")}</div>}
            {skills.core.length > 0 && <div><span className="font-semibold">Core Subjects:</span> {skills.core.join(", ")}</div>}
            {skills.soft.length > 0 && <div><span className="font-semibold">Soft Skills:</span> {skills.soft.join(", ")}</div>}
            {skills.languages.length > 0 && <div><span className="font-semibold">Languages:</span> {skills.languages.join(", ")}</div>}
          </div>
        </div>}

      {
    /* Experience */
  }
      {experience.length > 0 && <div className="mb-5">
          <h3 className="text-sm font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wider">Experience</h3>
          <div className="space-y-4">
            {experience.map((exp) => <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <span className="font-semibold text-xs text-gray-900">{exp.company}</span>
                  <span className="text-[11px] text-gray-600 font-medium whitespace-nowrap">{exp.startDate} {exp.startDate && exp.endDate ? "-" : ""} {exp.endDate}</span>
                </div>
                <div className="text-[11px] text-gray-800 font-medium italic mt-0.5">{exp.role}</div>
                {exp.responsibilities && <div className="text-[11px] text-gray-800 mt-1 whitespace-pre-wrap pl-3" style={{ textIndent: "-0.75rem" }}>
                    {exp.responsibilities.split("\n").map((line, i) => <div key={i}>{line}</div>)}
                  </div>}
              </div>)}
          </div>
        </div>}

      {
    /* Projects */
  }
      {projects.length > 0 && <div className="mb-5">
          <h3 className="text-sm font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wider">Projects</h3>
          <div className="space-y-4">
            {projects.map((proj) => <div key={proj.id}>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-gray-900">{proj.title}</span>
                    {proj.github && <span className="text-[10px] text-blue-600"><a href={proj.github} target="_blank" rel="noreferrer">GitHub</a></span>}
                    {proj.live && <span className="text-[10px] text-blue-600"><a href={proj.live} target="_blank" rel="noreferrer">Live Demo</a></span>}
                  </div>
                  <span className="text-[11px] text-gray-600 font-medium whitespace-nowrap">{proj.duration}</span>
                </div>
                {proj.technologies && <div className="text-[10px] text-gray-600 mt-0.5 italic">{proj.technologies}</div>}
                {proj.description && <div className="text-[11px] text-gray-800 mt-1 whitespace-pre-wrap pl-3" style={{ textIndent: "-0.75rem" }}>
                    {proj.description.split("\n").map((line, i) => <div key={i}>{line}</div>)}
                  </div>}
              </div>)}
          </div>
        </div>}

      {
    /* Certifications */
  }
      {certifications.length > 0 && <div className="mb-5">
          <h3 className="text-sm font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wider">Certifications</h3>
          <div className="space-y-2">
            {certifications.map((cert) => <div key={cert.id} className="flex justify-between items-start">
                <div>
                  <span className="font-semibold text-[11px] text-gray-900">{cert.name}</span>
                  {cert.organization && <span className="text-[11px] text-gray-800"> - {cert.organization}</span>}
                  {cert.url && <span className="text-[10px] text-blue-600 ml-2"><a href={cert.url} target="_blank" rel="noreferrer">View</a></span>}
                </div>
                <span className="text-[11px] text-gray-600 whitespace-nowrap">{cert.date}</span>
              </div>)}
          </div>
        </div>}

      {
    /* Achievements */
  }
      {achievements.length > 0 && <div className="mb-5">
          <h3 className="text-sm font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wider">Achievements</h3>
          <div className="space-y-1.5 text-[11px]">
            {achievements.map((ach) => <div key={ach.id} className="pl-3" style={{ textIndent: "-0.75rem" }}>
                <span className="font-semibold">• {ach.title}</span>
                {ach.description && <span>: {ach.description}</span>}
              </div>)}
          </div>
        </div>}
    </div>;
}
