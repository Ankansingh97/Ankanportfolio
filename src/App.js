import { useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("dark");
  const [filter, setFilter] = useState("All");
  const [visibleElements, setVisibleElements] = useState({});
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");
  const elementsRef = useRef({});

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleElements((prev) => ({
            ...prev,
            [entry.target.id]: true,
          }));
        }
      });
    }, observerOptions);

    Object.values(elementsRef.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("sending");

    // Using FormSubmit.co - free email service
    try {
      const formDataSubmit = new FormData();
      formDataSubmit.append("name", formData.name);
      formDataSubmit.append("email", formData.email);
      formDataSubmit.append("message", formData.message);
      formDataSubmit.append("_subject", `New message from ${formData.name}`);
      formDataSubmit.append("_captcha", "false");
      formDataSubmit.append("_next", window.location.href);

      const response = await fetch(
        "https://formsubmit.co/ankansingh1999@gmail.com",
        {
          method: "POST",
          body: formDataSubmit,
        },
      );

      if (response.ok) {
        setFormStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => {
          setShowContactForm(false);
          setFormStatus("");
        }, 2000);
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      console.log("Error:", error);
      setFormStatus("error");
    }
  };

  const openWhatsApp = () => {
    const message =
      "Hello! I'd like to connect with Ankan Singh. +91 8953955217";
    const phoneNumber = "918953955217";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message,
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const skills = [
    {
      title: "Frontend",
      icon: "🎨",
      items: [
        "JavaScript",
        "React.js",
        "Redux",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Material-UI",
        "HTML",
        "CSS",
      ],
    },
    {
      title: "Backend & APIs",
      icon: "⚙️",
      items: ["Node.js", "Express.js", "Python", "RESTful APIs"],
    },
    {
      title: "Tools & Technologies",
      icon: "🛠️",
      items: ["Git", "Postman", "Recharts", "React Router", "Context API"],
    },
  ];

  const experience = [
    {
      id: 1,
      role: "Frontend Developer Intern",
      company: "ITG Telematics Pvt Ltd",
      duration: "October 2025 – December 2025",
      duration_short: "2 months",
      tech: [
        "React.js",
        "Next.js",
        "Tailwind CSS",
        "REST APIs",
        "Recharts",
        "Redux",
      ],
      achievements: [
        "Integrated multiple real backend APIs (ticketing, challans, auth, reports)",
        "Optimized UI performance using Tailwind CSS and clean architecture",
        "Collaborated with backend teams for debugging and API testing using Postman",
        "Ensured smooth data flow across the system",
      ],
    },
    {
      id: 2,
      role: "Frontend Developer Intern",
      company: "JG International",
      duration: "April 2025 – September 2025",
      duration_short: "6 months",
      tech: [
        "React.js",
        "Next.js",
        "Tailwind CSS",
        "REST APIs",
        "Redux",
        "HTML",
        "CSS",
      ],
      achievements: [
        "Improved React performance by 20% using memoization and code splitting",
        "Optimized CSS and UI rendering, improving responsiveness by 15–20%",
        "Built reusable React components to improve maintainability and scalability",
        "Implemented lazy loading and optimized state management",
      ],
    },
  ];

  const projects = [
    {
      id: 1,
      title: "LinkedIn Clone",
      category: "Web",
      stack: ["React.js", "Redux", "Material-UI", "CSS3", "HTML5"],
      description:
        "Developed dynamic and responsive web application with real-time features and Firebase integration for enhanced user engagement and interactivity.",
      highlight: "Real-time features with Firebase integration",
      icon: "🔗",
      liveLink: "https://linkedin-198ef.web.app/",
      github: "",
    },
    {
      id: 2,
      title: "MERN Stack Blog Application",
      category: "Web",
      stack: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT Auth"],
      description:
        "Full-stack blog application with user authentication, CRUD operations, and dynamic routing. Utilized React Context API for state management.",
      highlight: "JWT authentication with Context API state management",
      icon: "📝",
      liveLink: "",
      github: "https://github.com/Ankansingh97/blogapp.git",
    },
    {
      id: 3,
      title: "Custom Furniture Co. - E-commerce Platform",
      category: "Web",
      stack: ["Next.js", "React.js", "Tailwind CSS", "TypeScript", "REST APIs"],
      description:
        "Full-stack furniture e-commerce platform with responsive home page, product catalog, application form for custom orders, and admin dashboard. Features reusable component architecture, real-time inventory management, and optimized performance.",
      highlight: "Production-grade e-commerce with custom order forms",
      icon: "🪑",
      liveLink: "https://ankanfurniture-co-c5a1.vercel.app/",
      github: "https://github.com/Ankansingh97/AnkanfurnitureCo.git",
    },
    {
      id: 4,
      title: "Manager and Keeper goods Dashboard web app",
      category: "Web",
      stack: [
        "React.js",
        "Tailwind CSS",
        "Login",
        "Authentication",
        "Authorization",
      ],
      description:
        "Reusable React component library with clean architecture and comprehensive documentation. I used useState for state management, useEffect for lifecycle handling, Context API for global state, props for data flow, and conditional rendering for role-based UI.",
      highlight: "Scalable architecture for production apps",
      icon: "🎯",
      liveLink: "https://front-end-challenge-jet.vercel.app/",
      github: "https://github.com/Ankansingh97/front-end-challenge.git",
    },
    {
      id: 5,
      title: "Dashboard with Real API Integration",
      category: "Web",
      stack: ["React.js", "Next.js", "Tailwind CSS", "Recharts"],
      description:
        "Analytics dashboard with real-time data visualization from multiple backend APIs. Implemented performance optimization techniques.",
      liveLink: "",
      github: "",
      highlight: "Real production-grade API integration",
      icon: "📊",
    },

    {
      id: 6,
      title: "Component Library",
      category: "Design",
      stack: ["React.js", "Tailwind CSS", "Storybook"],
      description:
        "Reusable React component library with clean architecture and comprehensive documentation.",
      liveLink: "",
      github: "",
      highlight: "Scalable architecture for production apps",
      icon: "🎯",
    },
  ];

  const education = [
    {
      degree: "Bachelor of Technology",
      field: "Computer Science Engineering",
      institute: "Babu Banarasi Das Northern India Institute of Technology",
      location: "Lucknow",
      year: "2021 - 2024",
      gpa: "7.2 SGPA",
    },
  ];

  const certifications = [
    {
      name: "Full Stack Web Developer",
      issuer: "Learn and Build",
      date: "September 5, 2024",
      icon: "🏆",
    },
    {
      name: "React (Basic)",
      issuer: "HackerRank",
      date: "January 29, 2025",
      icon: "⭐",
    },
  ];

  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="page">
      {/* Navigation */}
      <header className="topbar">
        <div
          className="brand"
          onClick={() => scrollTo("home")}
          role="button"
          tabIndex={0}
        >
          <span className="dot" />
          <div>
            <div className="brand-name">Ankan Singh</div>
            <div className="brand-role">Frontend Engineer & MERN Developer</div>
          </div>
        </div>

        <nav className="nav">
          {[
            { id: "home", label: "Home" },
            { id: "experience", label: "Experience" },
            { id: "skills", label: "Skills" },
            { id: "projects", label: "Projects" },
            { id: "contact", label: "Contact" },
          ].map((item) => (
            <button
              key={item.id}
              className="nav-link"
              onClick={() => scrollTo(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          className="toggle"
          onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? "☀️" : "🌙"}
          <span className="toggle-label">
            {theme === "dark" ? "Light" : "Dark"}
          </span>
        </button>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="hero section">
          <div className="hero-content">
            <div className="hero-copy">
              <p className="eyebrow">Frontend Developer • React & MERN Stack</p>
              <h1>Building High-Performance Web Applications</h1>
              <p className="lede">
                Skilled frontend developer specializing in React.js, Next.js,
                and MERN stack. Experienced in building responsive dashboards,
                ticketing systems, and real-world production applications.
                Proficient in REST API integration, state management, and clean
                component architecture. Strong problem-solving abilities and
                proven track record of optimizing performance (20%+ improvement)
                and improving responsiveness (15-20% enhancement).
              </p>

              <div className="hero-actions">
                <button
                  className="btn primary"
                  onClick={() => scrollTo("experience")}
                >
                  View Experience
                </button>
                <button
                  className="btn ghost"
                  onClick={() => scrollTo("projects")}
                >
                  See Projects
                </button>
                <button
                  className="btn ghost"
                  onClick={() => scrollTo("projects")}
                >
                  Resume
                </button>
              </div>

              <div className="meta">
                <span>📍 Lucknow, India</span>
                <span>📧 ankansingh1999@gmail.com</span>
                <span>📱 +91 8953955217</span>
              </div>
            </div>

            <div className="hero-visual">
              <div className="floating-card card-1">
                <div className="card-badge">React</div>
              </div>
              <div className="floating-card card-2">
                <div className="card-badge">Node.js</div>
              </div>
              <div className="floating-card card-3">
                <div className="card-badge">MongoDB</div>
              </div>
              <div className="code-block">&lt;Build /&gt;</div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="section experience-section">
          <div
            className="section-header"
            ref={(el) => (elementsRef.current.experience = el)}
            id="experience"
          >
            <h2>Professional Experience</h2>
            <p>Real-world production experience with proven impact</p>
          </div>

          <div className="experience-grid">
            {experience.map((exp, idx) => (
              <div
                key={exp.id}
                className="experience-card"
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                <div className="exp-header">
                  <div>
                    <h3>{exp.role}</h3>
                    <p className="company">{exp.company}</p>
                  </div>
                  <span className="duration">{exp.duration_short}</span>
                </div>
                <p className="date">{exp.duration}</p>

                <div className="tech-list">
                  {exp.tech.map((tech) => (
                    <span key={tech} className="tech">
                      {tech}
                    </span>
                  ))}
                </div>

                <ul className="achievements">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="section skills-section">
          <div
            className="section-header"
            ref={(el) => (elementsRef.current.skills = el)}
            id="skills"
          >
            <h2>Skills & Expertise</h2>
            <p>Mastering modern technologies to build exceptional products</p>
          </div>

          <div className="skill-grid">
            {skills.map((group, idx) => (
              <div
                key={group.title}
                className={`skill-card ${
                  visibleElements.skills ? "visible" : ""
                }`}
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className="skill-icon">{group.icon}</div>
                <h3>{group.title}</h3>
                <div className="skill-items">
                  {group.items.map((item) => (
                    <span key={item} className="skill-badge">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section projects-section">
          <div
            className="section-header"
            ref={(el) => (elementsRef.current.projects = el)}
            id="projects"
          >
            <h2>Featured Projects</h2>
            <p>Bringing ideas to life with clean code and beautiful design</p>
          </div>

          <div className="filter-buttons">
            {["All", "Web", "Design"].map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${filter === cat ? "active" : ""}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="projects-grid">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                className={`project-item ${
                  visibleElements.projects ? "visible" : ""
                }`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="project-icon">{project.icon}</div>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <p className="project-highlight">✨ {project.highlight}</p>
                <div className="project-stack">
                  {project.stack.map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link live-link"
                    >
                      🌐 Live Demo
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link github-link"
                    >
                      💻 GitHub
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="education" className="section education-section">
          <div className="education-container">
            <div className="edu-left">
              <h2>Education</h2>
              {education.map((edu, idx) => (
                <div key={idx} className="education-card">
                  <div className="edu-icon">🎓</div>
                  <div className="edu-content">
                    <h3>{edu.degree}</h3>
                    <p className="field">{edu.field}</p>
                    <p className="institute">{edu.institute}</p>
                    <p className="location">{edu.location}</p>
                    <div className="edu-meta">
                      <span className="year">{edu.year}</span>
                      <span className="gpa">{edu.gpa}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="edu-right">
              <h2>Certifications</h2>
              {certifications.map((cert, idx) => (
                <div key={idx} className="certification-card">
                  <div className="cert-icon">{cert.icon}</div>
                  <div className="cert-content">
                    <h3>{cert.name}</h3>
                    <p className="issuer">{cert.issuer}</p>
                    <p className="cert-date">{cert.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section contact-section">
          <div
            className="contact-card"
            ref={(el) => (elementsRef.current.contact = el)}
            id="contact"
          >
            <h2>Let's Create Something Amazing</h2>
            <p>
              I'm always interested in hearing about new projects and
              opportunities. Whether you need a website, mobile app, or design
              consultation, feel free to reach out!
            </p>

            <div className="contact-actions">
              <button
                className="btn primary"
                onClick={() => setShowContactForm(true)}
              >
                Send Email
              </button>
              <button
                className="btn ghost whatsapp-btn"
                onClick={openWhatsApp}
                aria-label="Open WhatsApp"
              >
                <span className="whatsapp-icon">💬</span>
                WhatsApp
              </button>
            </div>

            <div className="contact-links">
              <span>💼 Open to opportunities</span>
              <span>🚀 React/Next.js specialist</span>
              <span>🌍 Remote & Onsite</span>
            </div>
          </div>

          {/* Contact Form Modal */}
          {showContactForm && (
            <div
              className="form-overlay"
              onClick={() => setShowContactForm(false)}
            >
              <div
                className="form-container"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="form-close"
                  onClick={() => setShowContactForm(false)}
                >
                  ✕
                </button>
                <h3>Get In Touch</h3>
                <p>Send me a message and I'll respond as soon as possible.</p>

                <form onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Your Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      required
                      placeholder="Tell me about your project..."
                      rows="5"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn primary form-submit"
                    disabled={formStatus === "sending"}
                  >
                    {formStatus === "sending" ? "Sending..." : "Send Message"}
                  </button>

                  {formStatus === "success" && (
                    <p className="form-success">
                      ✅ Message sent successfully!
                    </p>
                  )}
                  {formStatus === "error" && (
                    <p className="form-error">
                      ❌ Error sending message. Please try again.
                    </p>
                  )}
                </form>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>
          © 2025 Ankan Singh. Crafted with <span className="heart">❤️</span>{" "}
          using React & Modern Web Tech
        </p>
      </footer>
    </div>
  );
}

export default App;
