import PDFDocument from 'pdfkit';

const templateColors = {
  modern: { primary: '#2563eb', secondary: '#1e293b', accent: '#64748b' },
  classic: { primary: '#0f172a', secondary: '#334155', accent: '#475569' },
  minimal: { primary: '#334155', secondary: '#475569', accent: '#94a3b8' },
  executive: { primary: '#0f766e', secondary: '#134e4a', accent: '#64748b' },
  tech: { primary: '#4f46e5', secondary: '#312e81', accent: '#6366f1' }
};

export const generateResumePDFBuffer = (resumeData) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 40, size: 'A4' });
      const buffers = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(buffers);
        resolve(pdfBuffer);
      });

      const template = templateColors[resumeData.templateId] || templateColors.modern;
      const { personalInfo = {} } = resumeData;

      // Header - Full Name & Contact Info
      doc
        .fillColor(template.primary)
        .fontSize(22)
        .font('Helvetica-Bold')
        .text(personalInfo.fullName || 'Untitled Candidate', { align: 'center' });

      doc.moveDown(0.3);

      const contactItems = [
        personalInfo.email,
        personalInfo.phone,
        personalInfo.location,
        personalInfo.linkedin,
        personalInfo.github
      ].filter(Boolean);

      doc
        .fillColor(template.accent)
        .fontSize(9)
        .font('Helvetica')
        .text(contactItems.join('  |  '), { align: 'center' });

      doc.moveDown(0.8);

      // Helper for Section Titles
      const renderSectionTitle = (title) => {
        doc
          .fillColor(template.primary)
          .fontSize(12)
          .font('Helvetica-Bold')
          .text(title.toUpperCase());
        
        doc
          .strokeColor(template.primary)
          .lineWidth(1)
          .moveTo(40, doc.y + 2)
          .lineTo(555, doc.y + 2)
          .stroke();

        doc.moveDown(0.5);
      };

      // Summary
      if (resumeData.summary) {
        renderSectionTitle('Professional Summary');
        doc
          .fillColor(template.secondary)
          .fontSize(10)
          .font('Helvetica')
          .text(resumeData.summary, { align: 'justify' });
        doc.moveDown(0.8);
      }

      // Technical Skills
      if (Array.isArray(resumeData.skills) && resumeData.skills.length > 0) {
        renderSectionTitle('Technical Skills');
        resumeData.skills.forEach(skillGroup => {
          if (skillGroup.items && skillGroup.items.length > 0) {
            doc
              .fillColor(template.secondary)
              .fontSize(9)
              .font('Helvetica-Bold')
              .text(`${skillGroup.category}: `, { continued: true })
              .font('Helvetica')
              .text(skillGroup.items.join(', '));
          }
        });
        doc.moveDown(0.8);
      }

      // Experience
      if (Array.isArray(resumeData.experience) && resumeData.experience.length > 0) {
        renderSectionTitle('Work Experience');
        resumeData.experience.forEach(exp => {
          doc
            .fillColor(template.primary)
            .fontSize(10)
            .font('Helvetica-Bold')
            .text(exp.position, { continued: true })
            .fillColor(template.accent)
            .font('Helvetica')
            .text(`  |  ${exp.company}`, { continued: true })
            .text(`  (${exp.startDate} - ${exp.isCurrent ? 'Present' : exp.endDate})`, { align: 'right' });

          if (exp.highlights && exp.highlights.length > 0) {
            doc.moveDown(0.2);
            exp.highlights.forEach(hl => {
              doc
                .fillColor(template.secondary)
                .fontSize(9)
                .font('Helvetica')
                .text(`•  ${hl}`, { indent: 10 });
            });
          }
          doc.moveDown(0.6);
        });
      }

      // Projects
      if (Array.isArray(resumeData.projects) && resumeData.projects.length > 0) {
        renderSectionTitle('Key Projects');
        resumeData.projects.forEach(proj => {
          doc
            .fillColor(template.primary)
            .fontSize(10)
            .font('Helvetica-Bold')
            .text(proj.title, { continued: proj.technologies && proj.technologies.length > 0 });

          if (proj.technologies && proj.technologies.length > 0) {
            doc
              .fillColor(template.accent)
              .fontSize(9)
              .font('Helvetica-Oblique')
              .text(`  [${proj.technologies.join(', ')}]`);
          }

          if (proj.description) {
            doc
              .fillColor(template.secondary)
              .fontSize(9)
              .font('Helvetica')
              .text(proj.description, { indent: 5 });
          }

          if (proj.highlights && proj.highlights.length > 0) {
            proj.highlights.forEach(hl => {
              doc
                .fillColor(template.secondary)
                .fontSize(9)
                .font('Helvetica')
                .text(`•  ${hl}`, { indent: 10 });
            });
          }
          doc.moveDown(0.6);
        });
      }

      // Education
      if (Array.isArray(resumeData.education) && resumeData.education.length > 0) {
        renderSectionTitle('Education');
        resumeData.education.forEach(edu => {
          doc
            .fillColor(template.primary)
            .fontSize(10)
            .font('Helvetica-Bold')
            .text(edu.degree, { continued: true })
            .fillColor(template.accent)
            .font('Helvetica')
            .text(` - ${edu.institution}`, { continued: true })
            .text(` (${edu.startDate} - ${edu.endDate})`, { align: 'right' });

          if (edu.score) {
            doc
              .fillColor(template.secondary)
              .fontSize(9)
              .text(`CGPA / Score: ${edu.score}`, { indent: 5 });
          }
          doc.moveDown(0.4);
        });
      }

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};
