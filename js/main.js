(() => {
  "use strict";

  document.documentElement.classList.add("js");

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

  const header = $(".site-header");
  const toggle = $(".nav-toggle");
  const menu = $(".menu");
  const yearEl = $("#year");
  const backToTop = $(".back-to-top");
  const contactForm = $("#contact-form");
  const typingEl = $(".typing");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let currentLang = localStorage.getItem("portfolio-language") || "pt";
  let typingTimer = null;

  const translations = {
    pt: {
      skipLink: "Pular para o conteúdo",

      navHome: "Home",
      navAbout: "Sobre",
      navJourney: "Jornada",
      navEducation: "Formação",
      navSkills: "Tecnologias",
      navProjects: "Projetos",
      navServices: "Serviços",
      navContact: "Contato",

      heroBadge: "Disponível para projetos freelance",
      heroSubtitle: "IA • Engenharia de Software • Cloud • Desenvolvimento Web",
      heroText: "Crio soluções digitais com inteligência artificial, Python, automação, dados e desenvolvimento web para transformar ideias em experiências modernas, funcionais e estratégicas.",
      typingPrefix: "Especialista em",
      heroBtnProjects: "Ver projetos",
      heroBtnJourney: "Conhecer minha jornada",
      heroBtnWhatsapp: "Chamar no WhatsApp",
      statExperience: "anos de experiência em TI",
      statAiPython: "automação inteligente",
      statFullstack: "web, dados e sistemas",

      quickAbout: "Sobre mim",
      quickEducation: "Formação",
      quickSkills: "Tecnologias",
      quickContact: "Contato",
      quickServices: "Serviços",
      quickProcess: "Processo",

      highlightOneTitle: "Formada em Gestão de TI",
      highlightOneText: "Base sólida em tecnologia, processos, infraestrutura e soluções digitais.",
      highlightTwoTitle: "Engenharia de Software",
      highlightTwoText: "Graduação em andamento com foco em sistemas, arquitetura e qualidade.",
      highlightThreeTitle: "Pós em IA e Machine Learning",
      highlightThreeText: "Especialização em andamento voltada para dados, automação e IA aplicada.",
      highlightFourTitle: "Experiência prática",
      highlightFourText: "Suporte técnico, treinamentos com IA, web, cloud, dados e automação.",

      aboutCaption: "IA, Python, Desenvolvimento e Dados",
      aboutEyebrow: "Sobre mim",
      aboutTitle: "Desenvolvedora com foco em IA, Python e soluções digitais inteligentes",
      aboutLead: "Olá! Eu sou Geovanna Eduarda da Silva, mas pode me chamar de Gi. Sou formada em Gestão da Tecnologia da Informação, curso graduação em Engenharia de Software e atualmente também estou em especialização com pós-graduação em Inteligência Artificial e Machine Learning.",
      aboutTextOne: "Venho construindo minha trajetória na área de tecnologia com foco em Inteligência Artificial, Engenharia de Software, Cloud Computing, Desenvolvimento de Sistemas e Segurança da Informação.",
      aboutTextTwo: "Tenho experiência prática com suporte técnico, treinamentos corporativos com IA, infraestrutura, desenvolvimento web, ferramentas digitais e aplicação de soluções inteligentes para otimização de processos.",
      aboutGoalLabel: "Meu objetivo",
      aboutGoalText: "Seguir evoluindo em Engenharia de Software, com especialização em Inteligência Artificial, unindo criatividade, inovação e tecnologia para desenvolver soluções inteligentes que gerem impacto real.",

      labelName: "Nome",
      labelAge: "Idade",
      labelCity: "Cidade",
      labelCurrentFocus: "Foco atual",
      currentFocusValue: "IA, Engenharia de Software e Cloud",
      downloadCv: "Baixar currículo",
      hireMe: "Vamos conversar",

      journeyEyebrow: "Jornada",
      journeyTitle: "Minha evolução profissional em tecnologia",
      journeyLead: "Minha trajetória une suporte técnico, infraestrutura, desenvolvimento, automação, cloud computing, inteligência artificial e educação corporativa.",
      journeyOneYear: "2023 — Início da experiência em TI",
      journeyOneTitle: "Estágio em TI — Prefeitura de Itu",
      journeyOneDate: "Maio de 2023 — Agosto de 2025",
      journeyOneText: "Atuação com suporte técnico, infraestrutura, laboratórios de informática, atendimento remoto e presencial, Chromebooks, tablets, AnyDesk e Veyon.",
      journeyTwoYear: "2025 — Expansão profissional e Inteligência Artificial",
      journeyTwoTitle: "Analista de Treinamentos de Inteligência Artificial — CorujaRH",
      journeyTwoDate: "Agosto de 2025 — Atual",
      journeyTwoText: "Desenvolvimento de treinamentos voltados para IA, criação de materiais educativos, capacitação de equipes e aplicação de soluções inteligentes para otimização de processos.",
      journeyThreeYear: "Atual — Evolução acadêmica e profissional",
      journeyThreeTitle: "Engenharia de Software + IA e Machine Learning",
      journeyThreeDate: "Em andamento",
      journeyThreeText: "Evolução contínua em engenharia de software, inteligência artificial generativa, cloud computing, cybersecurity, desenvolvimento full stack e inglês técnico.",

      educationHubEyebrow: "Formação & evolução",
      educationHubTitle: "Formação acadêmica, certificações e desenvolvimento contínuo",
      educationHubLead: "Organizei minha trajetória de aprendizado em três áreas principais para facilitar a leitura: formação acadêmica, certificações e evolução atual.",
      tabAcademic: "Formação Acadêmica",
      tabCertifications: "Certificações",
      tabGrowth: "Evolução Atual",

      educationOneTitle: "Gestão da Tecnologia da Informação",
      educationOneText: "Formação concluída com foco em gestão de TI, fundamentos de tecnologia, processos, infraestrutura e soluções digitais.",
      educationTwoTitle: "Engenharia de Software",
      educationTwoText: "Graduação em andamento, com foco em desenvolvimento de sistemas, engenharia de requisitos, arquitetura, qualidade de software e soluções escaláveis.",
      educationThreeTitle: "Inteligência Artificial e Machine Learning",
      educationThreeText: "Pós-graduação em andamento, com foco em inteligência artificial, aprendizado de máquina, dados, automação inteligente e aplicação de soluções baseadas em IA.",

      certCloudTitle: "Cloud & Infraestrutura",
      certCloudText: "Santander Code Girls 2025 — AWS Cloud Foundations — DIO. Fundamentos Essenciais da Infraestrutura AWS — DIO.",
      certAiTitle: "Inteligência Artificial & Dados",
      certAiText: "Oracle Cloud Infrastructure 2025 Certified Data Science Professional, Imersão Dev Agentes de IA Google e Fundamentos do n8n e Agentes de IA.",
      certDevTitle: "Desenvolvimento & Dados",
      certDevText: "Desenvolvimento React — DIO, Programação Python — SENAI e Microsoft Power BI — SENAI.",

      continuousTitle: "Participação ativa",
      continuousText: "Bootcamps, hackathons, eventos tech, workshops, comunidades de tecnologia, projetos práticos e estudos contínuos em IA e Cloud.",
      evolvingTitle: "Atualmente evoluindo em",
      evolvingText: "IA Generativa, Cloud Computing, Cybersecurity, Desenvolvimento Full Stack, Engenharia de Software, Inglês Técnico e Certificações Microsoft.",
      languagesTitle: "Idiomas",
      languagesText: "Português nativo, Inglês intermediário e Espanhol em desenvolvimento.",

      skillsEyebrow: "Tecnologias",
      skillsTitle: "Tecnologia com foco em IA, desenvolvimento e soluções inteligentes",
      skillsText: "Meu trabalho une desenvolvimento web, automação, inteligência artificial, cloud computing, análise de dados e organização de soluções digitais.",
      skillDevTitle: "Desenvolvimento",
      skillAiTitle: "IA & Automação",
      skillCloudTitle: "Cloud & Infraestrutura",
      skillDataTitle: "Dados & BI",

      projectsEyebrow: "Portfólio",
      projectsTitle: "Projetos em destaque",
      projectsText: "Alguns projetos que mostram minhas habilidades em desenvolvimento, automação, dados e organização de soluções digitais.",
      filterAll: "Todos",
      filterWeb: "Web",
      filterAi: "IA & Automação",
      filterData: "Dados",
      projectOneTitle: "Sistema de Gestão de Funcionários",
      projectOneText: "CRUD em C# com programação orientada a objetos, herança, polimorfismo, regras de salário e impostos por cargo.",
      projectTwoTitle: "Dashboard de Churn",
      projectTwoText: "Análise de churn, marketing, estoque e feedbacks para visualizar indicadores e apoiar decisões estratégicas.",
      projectThreeTitle: "Portfólio Pessoal",
      projectThreeText: "Site responsivo com identidade visual, animações, navegação fluida, foco em performance e apresentação profissional.",
      projectFourTitle: "Automações com IA",
      projectFourText: "Soluções para otimizar processos, reduzir tarefas manuais e tornar fluxos de trabalho mais rápidos e inteligentes.",

      servicesEyebrow: "O que eu faço",
      servicesTitle: "Soluções digitais para seu projeto",
      servicesText: "Posso ajudar com desenvolvimento web, automação com IA, dashboards, suporte técnico, organização de processos e projetos digitais sob demanda.",
      seeAllServices: "Ver todos os serviços",

      whyTechEyebrow: "Propósito",
      whyTechTitle: "Por que escolhi tecnologia?",
      whyTechLead: "Escolhi a tecnologia porque encontrei nela algo que vai além de uma profissão: a possibilidade de criar, transformar e participar ativamente da construção do futuro.",
      whyTechTextOne: "Sempre fui movida pela curiosidade, pela inovação e pela vontade de transformar ideias em soluções reais. Em TI encontrei um universo onde criatividade, lógica, aprendizado e evolução caminham juntos.",
      whyTechBadge: "Tecnologia, pessoas e futuro",
      whyTechCardTitle: "Mais do que ferramentas, busco impacto real",
      whyTechCardText: "Acredito que tecnologia não é apenas sobre códigos, sistemas ou plataformas. Tecnologia é sobre pessoas, transformação, criatividade e futuro.",

      whyHireEyebrow: "Meu diferencial",
      whyHireTitle: "Por que me contratar?",
      whyHireText: "Eu entrego mais do que páginas bonitas. Meu foco é desenvolver soluções que façam sentido para o objetivo, com organização, automação, boa estrutura e experiência clara para quem usa.",
      valueBadge: "Perfil híbrido",
      valueTitle: "Tecnologia + IA + comunicação clara",
      valueText: "Meu diferencial está em unir raciocínio técnico com organização, criatividade e foco em resolver problemas.",

      servicesPageEyebrow: "Serviços profissionais",
      servicesPageTitle: "Soluções digitais para seu projeto",
      servicesPageText: "Escolha um serviço e abra uma conversa direta no WhatsApp com uma mensagem pronta. Assim eu entendo sua necessidade com mais clareza e consigo orientar sobre escopo, prazo e orçamento.",
      servicesPagePrimary: "Ver serviços",
      servicesPageSecondary: "Ver projetos",
      servicesListEyebrow: "Como posso ajudar",
      servicesListTitle: "Escolha o serviço ideal",
      servicesListLead: "Cada card abre uma conversa direta no WhatsApp com uma mensagem personalizada, facilitando o primeiro contato.",

      serviceHighlightOneTitle: "Web profissional",
      serviceHighlightOneText: "Sites, landing pages e interfaces responsivas.",
      serviceHighlightTwoTitle: "IA & Automação",
      serviceHighlightTwoText: "Soluções inteligentes para reduzir tarefas manuais.",
      serviceHighlightThreeTitle: "Dados & BI",
      serviceHighlightThreeText: "Dashboards, indicadores e visualização de dados.",
      serviceHighlightFourTitle: "Projetos sob demanda",
      serviceHighlightFourText: "Planejamento, organização e entrega de soluções digitais.",

      service1: "Desenvolvimento Web",
      service2: "Automação & IA",
      service3: "Dados & BI",
      service4: "Suporte & TI",
      service5: "Segurança & Boas Práticas",
      service6: "Projetos sob demanda",
      servicePage1: "Landing pages, sites e sistemas responsivos com foco em performance, acessibilidade, organização visual e SEO.",
      servicePage2: "Automações, assistentes e soluções com IA para reduzir trabalho manual, acelerar processos e melhorar a produtividade.",
      servicePage3: "Dashboards e análises com indicadores claros para apoiar decisões usando Power BI, Excel e métricas bem definidas.",
      servicePage4: "Diagnóstico, melhorias e organização de rotina de TI, redes, sistemas, processos e boas práticas.",
      servicePage5: "Orientação para proteger dados, organizar acessos, melhorar rotinas e aplicar cuidados essenciais de segurança.",
      servicePage6: "Precisa de algo específico? Eu ajudo a desenhar a solução, organizar etapas e entregar com qualidade e clareza.",
      serviceCta1: "Pedir orçamento",
      serviceCta2: "Falar sobre IA",
      serviceCta3: "Criar dashboard",
      serviceCta4: "Solicitar suporte",
      serviceCta5: "Organizar acessos",
      serviceCta6: "Enviar ideia",

      automation: "Automação",
      systems: "Sistemas",
      processes: "Processos",
      security: "Segurança",
      access: "Acessos",
      pillData: "Dados",
      project: "Projeto",
      strategy: "Estratégia",
      solution: "Solução",
      back: "← Voltar",
      talkBtn: "Falar comigo",

      processEyebrow: "Processo",
      processTitle: "Como funciona o atendimento",
      processLead: "Trabalho com comunicação clara para entender sua necessidade, alinhar expectativas e propor uma solução viável.",
      step1: "Etapa 1",
      step1Title: "Entendimento",
      step1Text: "Você me conta sua necessidade, objetivo, prazo e principais desafios do projeto.",
      step2: "Etapa 2",
      step2Title: "Proposta",
      step2Text: "Eu avalio o cenário e retorno com uma sugestão de solução, escopo e próximos passos.",
      step3: "Etapa 3",
      step3Title: "Entrega",
      step3Text: "O projeto é desenvolvido com organização, comunicação e foco na qualidade final.",

      finalCtaEyebrow: "Vamos começar?",
      finalCtaTitle: "Tem uma ideia ou precisa melhorar um processo?",
      finalCtaText: "Me envie uma mensagem e vamos conversar sobre a melhor forma de transformar sua necessidade em uma solução digital.",
      finalCtaButton: "Chamar no WhatsApp",
      finalCtaProjects: "Ver projetos",

      contactEyebrow: "Contato",
      contactTitle: "Vamos criar algo juntas?",
      contactText: "Para orçamentos, parcerias ou oportunidades, envie uma mensagem. Posso ajudar com desenvolvimento web, automação, IA, dashboards e soluções sob demanda.",
      formName: "Nome",
      formEmail: "Email",
      formMessage: "Mensagem",
      formButton: "Enviar pelo WhatsApp",
      formHelper: "O formulário abre o WhatsApp com uma mensagem pronta.",

      footerRole: "Analista de Treinamento em IA & Full-Stack Developer",
      footerRights: "Desenvolvido por Geovanna Eduarda da Silva. Todos os direitos reservados.",

      whatsappIntro: "Oi Geovanna! Meu nome é",
      whatsappEmail: "Meu email é",
      whatsappMessage: "Quero falar sobre"
    },

    en: {
      skipLink: "Skip to content",

      navHome: "Home",
      navAbout: "About",
      navJourney: "Journey",
      navEducation: "Education",
      navSkills: "Technologies",
      navProjects: "Projects",
      navServices: "Services",
      navContact: "Contact",

      heroBadge: "Available for freelance projects",
      heroSubtitle: "AI • Software Engineering • Cloud • Web Development",
      heroText: "I create digital solutions with artificial intelligence, Python, automation, data and web development to turn ideas into modern, functional and strategic experiences.",
      typingPrefix: "Specialized in",
      heroBtnProjects: "View projects",
      heroBtnJourney: "Explore my journey",
      heroBtnWhatsapp: "Message me on WhatsApp",
      statExperience: "years of IT experience",
      statAiPython: "intelligent automation",
      statFullstack: "web, data and systems",

      quickAbout: "About me",
      quickEducation: "Education",
      quickSkills: "Technologies",
      quickContact: "Contact",
      quickServices: "Services",
      quickProcess: "Process",

      highlightOneTitle: "Degree in IT Management",
      highlightOneText: "Solid foundation in technology, processes, infrastructure and digital solutions.",
      highlightTwoTitle: "Software Engineering",
      highlightTwoText: "Undergraduate degree in progress focused on systems, architecture and quality.",
      highlightThreeTitle: "Postgrad in AI and Machine Learning",
      highlightThreeText: "Specialization in progress focused on data, automation and applied AI.",
      highlightFourTitle: "Hands-on experience",
      highlightFourText: "Technical support, AI training, web, cloud, data and automation.",

      aboutCaption: "AI, Python, Development and Data",
      aboutEyebrow: "About me",
      aboutTitle: "Developer focused on AI, Python and intelligent digital solutions",
      aboutLead: "Hi! I am Geovanna Eduarda da Silva, but you can call me Gi. I hold a degree in Information Technology Management, I am currently pursuing an undergraduate degree in Software Engineering and I am also specializing through a postgraduate program in Artificial Intelligence and Machine Learning.",
      aboutTextOne: "I have been building my career in technology with a focus on Artificial Intelligence, Software Engineering, Cloud Computing, Systems Development and Information Security.",
      aboutTextTwo: "I have hands-on experience with technical support, corporate AI training, infrastructure, web development, digital tools and intelligent solutions for process optimization.",
      aboutGoalLabel: "My goal",
      aboutGoalText: "To continue growing in Software Engineering, specializing in Artificial Intelligence, combining creativity, innovation and technology to develop intelligent solutions that create real impact.",

      labelName: "Name",
      labelAge: "Age",
      labelCity: "City",
      labelCurrentFocus: "Current focus",
      currentFocusValue: "AI, Software Engineering and Cloud",
      downloadCv: "Download resume",
      hireMe: "Let's talk",

      journeyEyebrow: "Journey",
      journeyTitle: "My professional evolution in technology",
      journeyLead: "My journey combines technical support, infrastructure, development, automation, cloud computing, artificial intelligence and corporate education.",
      journeyOneYear: "2023 — Beginning of my IT experience",
      journeyOneTitle: "IT Intern — Itu City Hall",
      journeyOneDate: "May 2023 — August 2025",
      journeyOneText: "Work with technical support, infrastructure, computer labs, remote and on-site service, Chromebooks, tablets, AnyDesk and Veyon.",
      journeyTwoYear: "2025 — Professional expansion and Artificial Intelligence",
      journeyTwoTitle: "Artificial Intelligence Training Analyst — CorujaRH",
      journeyTwoDate: "August 2025 — Present",
      journeyTwoText: "Development of AI-focused training, creation of educational materials, team enablement and application of intelligent solutions for process optimization.",
      journeyThreeYear: "Now — Academic and professional growth",
      journeyThreeTitle: "Software Engineering + AI and Machine Learning",
      journeyThreeDate: "In progress",
      journeyThreeText: "Continuous growth in software engineering, generative AI, cloud computing, cybersecurity, full stack development and technical English.",

      educationHubEyebrow: "Education & growth",
      educationHubTitle: "Academic background, certifications and continuous development",
      educationHubLead: "I organized my learning journey into three main areas to make it easier to read: academic background, certifications and current growth.",
      tabAcademic: "Academic Background",
      tabCertifications: "Certifications",
      tabGrowth: "Current Growth",

      educationOneTitle: "Information Technology Management",
      educationOneText: "Completed degree focused on IT management, technology fundamentals, processes, infrastructure and digital solutions.",
      educationTwoTitle: "Software Engineering",
      educationTwoText: "Undergraduate degree in progress, focused on systems development, requirements engineering, architecture, software quality and scalable solutions.",
      educationThreeTitle: "Artificial Intelligence and Machine Learning",
      educationThreeText: "Postgraduate program in progress, focused on artificial intelligence, machine learning, data, intelligent automation and AI-based solutions.",

      certCloudTitle: "Cloud & Infrastructure",
      certCloudText: "Santander Code Girls 2025 — AWS Cloud Foundations — DIO. Essential AWS Infrastructure Fundamentals — DIO.",
      certAiTitle: "Artificial Intelligence & Data",
      certAiText: "Oracle Cloud Infrastructure 2025 Certified Data Science Professional, Google AI Agents Dev Immersion and n8n and AI Agents Fundamentals.",
      certDevTitle: "Development & Data",
      certDevText: "React Development — DIO, Python Programming — SENAI and Microsoft Power BI — SENAI.",

      continuousTitle: "Active participation",
      continuousText: "Bootcamps, hackathons, tech events, workshops, technology communities, practical projects and continuous studies in AI and Cloud.",
      evolvingTitle: "Currently improving in",
      evolvingText: "Generative AI, Cloud Computing, Cybersecurity, Full Stack Development, Software Engineering, Technical English and Microsoft Certifications.",
      languagesTitle: "Languages",
      languagesText: "Native Portuguese, intermediate English and Spanish in development.",

      skillsEyebrow: "Technologies",
      skillsTitle: "Technology focused on AI, development and intelligent solutions",
      skillsText: "My work combines web development, automation, artificial intelligence, cloud computing, data analysis and digital solution organization.",
      skillDevTitle: "Development",
      skillAiTitle: "AI & Automation",
      skillCloudTitle: "Cloud & Infrastructure",
      skillDataTitle: "Data & BI",

      projectsEyebrow: "Portfolio",
      projectsTitle: "Featured projects",
      projectsText: "Some projects that show my skills in development, automation, data and digital solution organization.",
      filterAll: "All",
      filterWeb: "Web",
      filterAi: "AI & Automation",
      filterData: "Data",
      projectOneTitle: "Employee Management System",
      projectOneText: "C# CRUD with object-oriented programming, inheritance, polymorphism, salary rules and taxes by role.",
      projectTwoTitle: "Churn Dashboard",
      projectTwoText: "Churn, marketing, inventory and feedback analysis to visualize indicators and support strategic decisions.",
      projectThreeTitle: "Personal Portfolio",
      projectThreeText: "Responsive website with visual identity, animations, smooth navigation, performance focus and professional presentation.",
      projectFourTitle: "AI Automations",
      projectFourText: "Solutions to optimize processes, reduce manual tasks and make workflows faster and smarter.",

      servicesEyebrow: "What I do",
      servicesTitle: "Digital solutions for your project",
      servicesText: "I can help with web development, AI automation, dashboards, technical support, process organization and custom digital projects.",
      seeAllServices: "View all services",

      whyTechEyebrow: "Purpose",
      whyTechTitle: "Why I chose technology",
      whyTechLead: "I chose technology because I found in it something beyond a profession: the possibility to create, transform and actively participate in building the future.",
      whyTechTextOne: "I have always been driven by curiosity, innovation and the desire to turn ideas into real solutions. In IT, I found a universe where creativity, logic, learning and evolution work together.",
      whyTechBadge: "Technology, people and the future",
      whyTechCardTitle: "More than tools, I seek real impact",
      whyTechCardText: "I believe technology is not only about code, systems or platforms. Technology is about people, transformation, creativity and the future.",

      whyHireEyebrow: "My differential",
      whyHireTitle: "Why hire me?",
      whyHireText: "I deliver more than beautiful pages. My focus is to develop solutions that make sense for the goal, with organization, automation, good structure and a clear experience for users.",
      valueBadge: "Hybrid profile",
      valueTitle: "Technology + AI + clear communication",
      valueText: "My differential is combining technical thinking with organization, creativity and focus on solving problems.",

      servicesPageEyebrow: "Professional services",
      servicesPageTitle: "Digital solutions for your project",
      servicesPageText: "Choose a service and open a direct WhatsApp conversation with a ready-to-send message. This helps me understand your needs more clearly and guide you about scope, deadline and budget.",
      servicesPagePrimary: "View services",
      servicesPageSecondary: "View projects",
      servicesListEyebrow: "How I can help",
      servicesListTitle: "Choose the ideal service",
      servicesListLead: "Each card opens a direct WhatsApp conversation with a personalized message, making the first contact easier.",

      serviceHighlightOneTitle: "Professional web",
      serviceHighlightOneText: "Websites, landing pages and responsive interfaces.",
      serviceHighlightTwoTitle: "AI & Automation",
      serviceHighlightTwoText: "Intelligent solutions to reduce manual tasks.",
      serviceHighlightThreeTitle: "Data & BI",
      serviceHighlightThreeText: "Dashboards, indicators and data visualization.",
      serviceHighlightFourTitle: "Custom projects",
      serviceHighlightFourText: "Planning, organization and delivery of digital solutions.",

      service1: "Web Development",
      service2: "Automation & AI",
      service3: "Data & BI",
      service4: "Support & IT",
      service5: "Security & Best Practices",
      service6: "Custom projects",
      servicePage1: "Landing pages, websites and responsive systems focused on performance, accessibility, visual organization and SEO.",
      servicePage2: "Automations, assistants and AI solutions to reduce manual work, speed up processes and improve productivity.",
      servicePage3: "Dashboards and analyses with clear indicators to support decisions using Power BI, Excel and well-defined metrics.",
      servicePage4: "Diagnosis, improvements and organization of IT routines, networks, systems, processes and best practices.",
      servicePage5: "Guidance to protect data, organize access, improve routines and apply essential security practices.",
      servicePage6: "Need something specific? I help design the solution, organize the steps and deliver with quality and clarity.",
      serviceCta1: "Request a quote",
      serviceCta2: "Talk about AI",
      serviceCta3: "Create dashboard",
      serviceCta4: "Request support",
      serviceCta5: "Organize access",
      serviceCta6: "Send idea",

      automation: "Automation",
      systems: "Systems",
      processes: "Processes",
      security: "Security",
      access: "Access",
      pillData: "Data",
      project: "Project",
      strategy: "Strategy",
      solution: "Solution",
      back: "← Back",
      talkBtn: "Contact me",

      processEyebrow: "Process",
      processTitle: "How the service works",
      processLead: "I work with clear communication to understand your needs, align expectations and propose a viable solution.",
      step1: "Step 1",
      step1Title: "Understanding",
      step1Text: "You tell me your need, goal, deadline and main project challenges.",
      step2: "Step 2",
      step2Title: "Proposal",
      step2Text: "I evaluate the scenario and return with a suggested solution, scope and next steps.",
      step3: "Step 3",
      step3Title: "Delivery",
      step3Text: "The project is developed with organization, communication and focus on final quality.",

      finalCtaEyebrow: "Shall we start?",
      finalCtaTitle: "Do you have an idea or need to improve a process?",
      finalCtaText: "Send me a message and let’s talk about the best way to turn your need into a digital solution.",
      finalCtaButton: "Message me on WhatsApp",
      finalCtaProjects: "View projects",

      contactEyebrow: "Contact",
      contactTitle: "Shall we create something together?",
      contactText: "For quotes, partnerships or opportunities, send me a message. I can help with web development, automation, AI, dashboards and custom solutions.",
      formName: "Name",
      formEmail: "Email",
      formMessage: "Message",
      formButton: "Send via WhatsApp",
      formHelper: "The form opens WhatsApp with a ready-to-send message.",

      footerRole: "AI Training Analyst & Full-Stack Developer",
      footerRights: "Developed by Geovanna Eduarda da Silva. All rights reserved.",

      whatsappIntro: "Hi Geovanna! My name is",
      whatsappEmail: "My email is",
      whatsappMessage: "I want to talk about"
    },

    es: {
      skipLink: "Saltar al contenido",

      navHome: "Inicio",
      navAbout: "Sobre mí",
      navJourney: "Trayectoria",
      navEducation: "Formación",
      navSkills: "Tecnologías",
      navProjects: "Proyectos",
      navServices: "Servicios",
      navContact: "Contacto",

      heroBadge: "Disponible para proyectos freelance",
      heroSubtitle: "IA • Ingeniería de Software • Cloud • Desarrollo Web",
      heroText: "Creo soluciones digitales con inteligencia artificial, Python, automatización, datos y desarrollo web para transformar ideas en experiencias modernas, funcionales y estratégicas.",
      typingPrefix: "Especialista en",
      heroBtnProjects: "Ver proyectos",
      heroBtnJourney: "Conoce mi trayectoria",
      heroBtnWhatsapp: "Contactar por WhatsApp",
      statExperience: "años de experiencia en TI",
      statAiPython: "automatización inteligente",
      statFullstack: "web, datos y sistemas",

      quickAbout: "Sobre mí",
      quickEducation: "Formación",
      quickSkills: "Tecnologías",
      quickContact: "Contacto",
      quickServices: "Servicios",
      quickProcess: "Proceso",

      highlightOneTitle: "Formada en Gestión de TI",
      highlightOneText: "Base sólida en tecnología, procesos, infraestructura y soluciones digitales.",
      highlightTwoTitle: "Ingeniería de Software",
      highlightTwoText: "Grado en curso con foco en sistemas, arquitectura y calidad.",
      highlightThreeTitle: "Posgrado en IA y Machine Learning",
      highlightThreeText: "Especialización en curso enfocada en datos, automatización e IA aplicada.",
      highlightFourTitle: "Experiencia práctica",
      highlightFourText: "Soporte técnico, entrenamientos con IA, web, cloud, datos y automatización.",

      aboutCaption: "IA, Python, Desarrollo y Datos",
      aboutEyebrow: "Sobre mí",
      aboutTitle: "Desarrolladora enfocada en IA, Python y soluciones digitales inteligentes",
      aboutLead: "¡Hola! Soy Geovanna Eduarda da Silva, pero puedes llamarme Gi. Soy formada en Gestión de Tecnología de la Información, curso la carrera de Ingeniería de Software y actualmente también estoy en especialización con un posgrado en Inteligencia Artificial y Machine Learning.",
      aboutTextOne: "He estado construyendo mi trayectoria en el área de tecnología con foco en Inteligencia Artificial, Ingeniería de Software, Cloud Computing, Desarrollo de Sistemas y Seguridad de la Información.",
      aboutTextTwo: "Tengo experiencia práctica con soporte técnico, entrenamientos corporativos con IA, infraestructura, desarrollo web, herramientas digitales y aplicación de soluciones inteligentes para optimización de procesos.",
      aboutGoalLabel: "Mi objetivo",
      aboutGoalText: "Seguir evolucionando en Ingeniería de Software, con especialización en Inteligencia Artificial, uniendo creatividad, innovación y tecnología para desarrollar soluciones inteligentes que generen impacto real.",

      labelName: "Nombre",
      labelAge: "Edad",
      labelCity: "Ciudad",
      labelCurrentFocus: "Foco actual",
      currentFocusValue: "IA, Ingeniería de Software y Cloud",
      downloadCv: "Descargar currículum",
      hireMe: "Hablemos",

      journeyEyebrow: "Trayectoria",
      journeyTitle: "Mi evolución profesional en tecnología",
      journeyLead: "Mi trayectoria une soporte técnico, infraestructura, desarrollo, automatización, cloud computing, inteligencia artificial y educación corporativa.",
      journeyOneYear: "2023 — Inicio de la experiencia en TI",
      journeyOneTitle: "Práctica en TI — Municipalidad de Itu",
      journeyOneDate: "Mayo de 2023 — Agosto de 2025",
      journeyOneText: "Actuación con soporte técnico, infraestructura, laboratorios de informática, atención remota y presencial, Chromebooks, tablets, AnyDesk y Veyon.",
      journeyTwoYear: "2025 — Expansión profesional e Inteligencia Artificial",
      journeyTwoTitle: "Analista de Entrenamientos de Inteligencia Artificial — CorujaRH",
      journeyTwoDate: "Agosto de 2025 — Actualidad",
      journeyTwoText: "Desarrollo de entrenamientos enfocados en IA, creación de materiales educativos, capacitación de equipos y aplicación de soluciones inteligentes para optimización de procesos.",
      journeyThreeYear: "Actual — Evolución académica y profesional",
      journeyThreeTitle: "Ingeniería de Software + IA y Machine Learning",
      journeyThreeDate: "En curso",
      journeyThreeText: "Evolución continua en ingeniería de software, inteligencia artificial generativa, cloud computing, cybersecurity, desarrollo full stack e inglés técnico.",

      educationHubEyebrow: "Formación & evolución",
      educationHubTitle: "Formación académica, certificaciones y desarrollo continuo",
      educationHubLead: "Organicé mi trayectoria de aprendizaje en tres áreas principales para facilitar la lectura: formación académica, certificaciones y evolución actual.",
      tabAcademic: "Formación Académica",
      tabCertifications: "Certificaciones",
      tabGrowth: "Evolución Actual",

      educationOneTitle: "Gestión de Tecnología de la Información",
      educationOneText: "Formación concluida con foco en gestión de TI, fundamentos de tecnología, procesos, infraestructura y soluciones digitales.",
      educationTwoTitle: "Ingeniería de Software",
      educationTwoText: "Grado en curso, con foco en desarrollo de sistemas, ingeniería de requisitos, arquitectura, calidad de software y soluciones escalables.",
      educationThreeTitle: "Inteligencia Artificial y Machine Learning",
      educationThreeText: "Posgrado en curso, con foco en inteligencia artificial, aprendizaje automático, datos, automatización inteligente y aplicación de soluciones basadas en IA.",

      certCloudTitle: "Cloud & Infraestructura",
      certCloudText: "Santander Code Girls 2025 — AWS Cloud Foundations — DIO. Fundamentos Esenciales de Infraestructura AWS — DIO.",
      certAiTitle: "Inteligencia Artificial & Datos",
      certAiText: "Oracle Cloud Infrastructure 2025 Certified Data Science Professional, Inmersión Dev Agentes de IA Google y Fundamentos de n8n y Agentes de IA.",
      certDevTitle: "Desarrollo & Datos",
      certDevText: "Desarrollo React — DIO, Programación Python — SENAI y Microsoft Power BI — SENAI.",

      continuousTitle: "Participación activa",
      continuousText: "Bootcamps, hackathons, eventos tech, workshops, comunidades de tecnología, proyectos prácticos y estudios continuos en IA y Cloud.",
      evolvingTitle: "Actualmente evolucionando en",
      evolvingText: "IA Generativa, Cloud Computing, Cybersecurity, Desarrollo Full Stack, Ingeniería de Software, Inglés Técnico y Certificaciones Microsoft.",
      languagesTitle: "Idiomas",
      languagesText: "Portugués nativo, Inglés intermedio y Español en desarrollo.",

      skillsEyebrow: "Tecnologías",
      skillsTitle: "Tecnología enfocada en IA, desarrollo y soluciones inteligentes",
      skillsText: "Mi trabajo une desarrollo web, automatización, inteligencia artificial, cloud computing, análisis de datos y organización de soluciones digitales.",
      skillDevTitle: "Desarrollo",
      skillAiTitle: "IA & Automatización",
      skillCloudTitle: "Cloud & Infraestructura",
      skillDataTitle: "Datos & BI",

      projectsEyebrow: "Portafolio",
      projectsTitle: "Proyectos destacados",
      projectsText: "Algunos proyectos que muestran mis habilidades en desarrollo, automatización, datos y organización de soluciones digitales.",
      filterAll: "Todos",
      filterWeb: "Web",
      filterAi: "IA & Automatización",
      filterData: "Datos",
      projectOneTitle: "Sistema de Gestión de Empleados",
      projectOneText: "CRUD en C# con programación orientada a objetos, herencia, polimorfismo, reglas de salario e impuestos por cargo.",
      projectTwoTitle: "Dashboard de Churn",
      projectTwoText: "Análisis de churn, marketing, inventario y feedbacks para visualizar indicadores y apoyar decisiones estratégicas.",
      projectThreeTitle: "Portafolio Personal",
      projectThreeText: "Sitio responsivo con identidad visual, animaciones, navegación fluida, foco en rendimiento y presentación profesional.",
      projectFourTitle: "Automatizaciones con IA",
      projectFourText: "Soluciones para optimizar procesos, reducir tareas manuales y hacer los flujos de trabajo más rápidos e inteligentes.",

      servicesEyebrow: "Lo que hago",
      servicesTitle: "Soluciones digitales para tu proyecto",
      servicesText: "Puedo ayudar con desarrollo web, automatización con IA, dashboards, soporte técnico, organización de procesos y proyectos digitales personalizados.",
      seeAllServices: "Ver todos los servicios",

      whyTechEyebrow: "Propósito",
      whyTechTitle: "¿Por qué elegí tecnología?",
      whyTechLead: "Elegí la tecnología porque encontré en ella algo que va más allá de una profesión: la posibilidad de crear, transformar y participar activamente en la construcción del futuro.",
      whyTechTextOne: "Siempre me ha movido la curiosidad, la innovación y el deseo de transformar ideas en soluciones reales. En TI encontré un universo donde creatividad, lógica, aprendizaje y evolución caminan juntos.",
      whyTechBadge: "Tecnología, personas y futuro",
      whyTechCardTitle: "Más que herramientas, busco impacto real",
      whyTechCardText: "Creo que la tecnología no se trata solo de códigos, sistemas o plataformas. La tecnología trata sobre personas, transformación, creatividad y futuro.",

      whyHireEyebrow: "Mi diferencial",
      whyHireTitle: "¿Por qué contratarme?",
      whyHireText: "Entrego más que páginas bonitas. Mi foco es desarrollar soluciones que tengan sentido para el objetivo, con organización, automatización, buena estructura y una experiencia clara para quien las usa.",
      valueBadge: "Perfil híbrido",
      valueTitle: "Tecnología + IA + comunicación clara",
      valueText: "Mi diferencial está en unir pensamiento técnico con organización, creatividad y foco en resolver problemas.",

      servicesPageEyebrow: "Servicios profesionales",
      servicesPageTitle: "Soluciones digitales para tu proyecto",
      servicesPageText: "Elige un servicio y abre una conversación directa en WhatsApp con un mensaje listo. Así entiendo tu necesidad con más claridad y puedo orientar sobre alcance, plazo y presupuesto.",
      servicesPagePrimary: "Ver servicios",
      servicesPageSecondary: "Ver proyectos",
      servicesListEyebrow: "Cómo puedo ayudar",
      servicesListTitle: "Elige el servicio ideal",
      servicesListLead: "Cada card abre una conversación directa en WhatsApp con un mensaje personalizado, facilitando el primer contacto.",

      serviceHighlightOneTitle: "Web profesional",
      serviceHighlightOneText: "Sitios, landing pages e interfaces responsivas.",
      serviceHighlightTwoTitle: "IA & Automatización",
      serviceHighlightTwoText: "Soluciones inteligentes para reducir tareas manuales.",
      serviceHighlightThreeTitle: "Datos & BI",
      serviceHighlightThreeText: "Dashboards, indicadores y visualización de datos.",
      serviceHighlightFourTitle: "Proyectos personalizados",
      serviceHighlightFourText: "Planificación, organización y entrega de soluciones digitales.",

      service1: "Desarrollo Web",
      service2: "Automatización & IA",
      service3: "Datos & BI",
      service4: "Soporte & TI",
      service5: "Seguridad & Buenas Prácticas",
      service6: "Proyectos personalizados",
      servicePage1: "Landing pages, sitios web y sistemas responsivos con foco en rendimiento, accesibilidad, organización visual y SEO.",
      servicePage2: "Automatizaciones, asistentes y soluciones con IA para reducir trabajo manual, acelerar procesos y mejorar la productividad.",
      servicePage3: "Dashboards y análisis con indicadores claros para apoyar decisiones usando Power BI, Excel y métricas bien definidas.",
      servicePage4: "Diagnóstico, mejoras y organización de rutinas de TI, redes, sistemas, procesos y buenas prácticas.",
      servicePage5: "Orientación para proteger datos, organizar accesos, mejorar rutinas y aplicar cuidados esenciales de seguridad.",
      servicePage6: "¿Necesitas algo específico? Te ayudo a diseñar la solución, organizar etapas y entregar con calidad y claridad.",
      serviceCta1: "Solicitar presupuesto",
      serviceCta2: "Hablar sobre IA",
      serviceCta3: "Crear dashboard",
      serviceCta4: "Solicitar soporte",
      serviceCta5: "Organizar accesos",
      serviceCta6: "Enviar idea",

      automation: "Automatización",
      systems: "Sistemas",
      processes: "Procesos",
      security: "Seguridad",
      access: "Accesos",
      pillData: "Datos",
      project: "Proyecto",
      strategy: "Estrategia",
      solution: "Solución",
      back: "← Volver",
      talkBtn: "Contactarme",

      processEyebrow: "Proceso",
      processTitle: "Cómo funciona la atención",
      processLead: "Trabajo con comunicación clara para entender tu necesidad, alinear expectativas y proponer una solución viable.",
      step1: "Paso 1",
      step1Title: "Entendimiento",
      step1Text: "Me cuentas tu necesidad, objetivo, plazo y principales desafíos del proyecto.",
      step2: "Paso 2",
      step2Title: "Propuesta",
      step2Text: "Evalúo el escenario y regreso con una sugerencia de solución, alcance y próximos pasos.",
      step3: "Paso 3",
      step3Title: "Entrega",
      step3Text: "El proyecto se desarrolla con organización, comunicación y foco en la calidad final.",

      finalCtaEyebrow: "¿Empezamos?",
      finalCtaTitle: "¿Tienes una idea o necesitas mejorar un proceso?",
      finalCtaText: "Envíame un mensaje y conversemos sobre la mejor forma de transformar tu necesidad en una solución digital.",
      finalCtaButton: "Contactar por WhatsApp",
      finalCtaProjects: "Ver proyectos",

      contactEyebrow: "Contacto",
      contactTitle: "¿Creamos algo juntas?",
      contactText: "Para presupuestos, alianzas u oportunidades, envíame un mensaje. Puedo ayudar con desarrollo web, automatización, IA, dashboards y soluciones personalizadas.",
      formName: "Nombre",
      formEmail: "Email",
      formMessage: "Mensaje",
      formButton: "Enviar por WhatsApp",
      formHelper: "El formulario abre WhatsApp con un mensaje listo.",

      footerRole: "Analista de Entrenamiento en IA & Full-Stack Developer",
      footerRights: "Desarrollado por Geovanna Eduarda da Silva. Todos los derechos reservados.",

      whatsappIntro: "¡Hola Geovanna! Mi nombre es",
      whatsappEmail: "Mi email es",
      whatsappMessage: "Quiero hablar sobre"
    }
  };

  const setYear = () => {
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  };

  const setHeaderState = () => {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 10);
    }
  };

  const closeMenu = () => {
    if (!toggle || !menu) return;

    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };

  const openMenu = () => {
    if (!toggle || !menu) return;

    menu.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
  };

  const setupMenu = () => {
    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
      menu.classList.contains("open") ? closeMenu() : openMenu();
    });

    menu.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        closeMenu();
      }
    });

    document.addEventListener("click", (event) => {
      if (!menu.contains(event.target) && !toggle.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  };

  const setupSmoothScroll = () => {
    $$('a[href*="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const url = new URL(link.href, window.location.href);
        const samePage = url.pathname === window.location.pathname;
        const target = samePage && url.hash ? $(url.hash) : null;

        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.pushState(null, "", url.hash);
      });
    });
  };

  const setupRevealAnimations = () => {
    const revealElements = $$(".reveal");

    if (!revealElements.length) return;

    if (!("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach((element) => observer.observe(element));
  };

  const setupTechStackReveal = () => {
    const techGroups = $$(".tech-stack-reveal");

    if (!techGroups.length) return;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      techGroups.forEach((group) => group.classList.add("tech-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("tech-visible");
          obs.unobserve(entry.target);
        });
      },
      {
        threshold: 0.22,
        rootMargin: "0px 0px -70px 0px"
      }
    );

    techGroups.forEach((group) => observer.observe(group));
  };

  const setupTabs = () => {
    const tabButtons = $$(".tab-btn");
    const tabContents = $$("[data-tab-content]");

    if (!tabButtons.length || !tabContents.length) return;

    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const selectedTab = button.dataset.tab;

        tabButtons.forEach((item) => {
          const isActive = item === button;
          item.classList.toggle("active", isActive);
          item.setAttribute("aria-selected", isActive ? "true" : "false");
        });

        tabContents.forEach((content) => {
          content.classList.toggle("active", content.dataset.tabContent === selectedTab);
        });
      });
    });
  };

  const setupProjectFilter = () => {
    const filterButtons = $$(".filter-btn");
    const projectCards = $$(".project-card[data-category]");

    if (!filterButtons.length || !projectCards.length) return;

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter || "all";

        filterButtons.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");

        projectCards.forEach((card) => {
          const shouldShow = filter === "all" || card.dataset.category === filter;
          card.classList.toggle("hide", !shouldShow);
        });
      });
    });
  };

  const getTypingWords = () => {
    if (!typingEl) return [];

    const datasetKey = `words${currentLang.charAt(0).toUpperCase()}${currentLang.slice(1)}`;
    const rawWords = typingEl.dataset[datasetKey] || typingEl.dataset.wordsPt || "";

    return rawWords
      .split(",")
      .map((word) => word.trim())
      .filter(Boolean);
  };

  const startTyping = () => {
    if (!typingEl) return;

    if (typingTimer) {
      clearTimeout(typingTimer);
      typingTimer = null;
    }

    const words = getTypingWords();

    if (!words.length) {
      typingEl.textContent = "";
      return;
    }

    if (prefersReducedMotion) {
      typingEl.textContent = words[0];
      return;
    }

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const type = () => {
      const currentWord = words[wordIndex];
      typingEl.textContent = currentWord.slice(0, charIndex);

      if (!deleting && charIndex < currentWord.length) {
        charIndex += 1;
        typingTimer = setTimeout(type, 80);
        return;
      }

      if (!deleting && charIndex === currentWord.length) {
        deleting = true;
        typingTimer = setTimeout(type, 1400);
        return;
      }

      if (deleting && charIndex > 0) {
        charIndex -= 1;
        typingTimer = setTimeout(type, 42);
        return;
      }

      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingTimer = setTimeout(type, 220);
    };

    type();
  };

  const updatePlaceholders = (language) => {
    const placeholders = {
      pt: {
        name: "Seu nome",
        email: "seuemail@exemplo.com",
        message: "Conte um pouco sobre o projeto"
      },
      en: {
        name: "Your name",
        email: "yourmail@example.com",
        message: "Tell me a little about your project"
      },
      es: {
        name: "Tu nombre",
        email: "tuemail@ejemplo.com",
        message: "Cuéntame un poco sobre el proyecto"
      }
    };

    const selected = placeholders[language] || placeholders.pt;

    const nameInput = $("#name");
    const emailInput = $("#email");
    const messageInput = $("#message");

    if (nameInput) nameInput.placeholder = selected.name;
    if (emailInput) emailInput.placeholder = selected.email;
    if (messageInput) messageInput.placeholder = selected.message;
  };

  const setLanguage = (language) => {
    const selectedLanguage = translations[language] ? language : "pt";
    const dictionary = translations[selectedLanguage];

    currentLang = selectedLanguage;
    localStorage.setItem("portfolio-language", selectedLanguage);

    document.documentElement.lang =
      selectedLanguage === "pt" ? "pt-br" : selectedLanguage;

    $$("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;

      if (Object.prototype.hasOwnProperty.call(dictionary, key)) {
        element.textContent = dictionary[key];
      }
    });

    $$(".lang-btn").forEach((button) => {
      const active = button.dataset.lang === selectedLanguage;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });

    updatePlaceholders(selectedLanguage);
    startTyping();
  };

  const setupLanguageSwitcher = () => {
    $$(".lang-btn").forEach((button) => {
      button.addEventListener("click", () => {
        setLanguage(button.dataset.lang || "pt");
      });
    });

    setLanguage(currentLang);
  };

  const setupActiveMenu = () => {
    const sectionLinks = $$(".menu a").filter((link) => {
      const url = new URL(link.href, window.location.href);
      return url.pathname === window.location.pathname && url.hash && $(url.hash);
    });

    if (!sectionLinks.length || !("IntersectionObserver" in window)) return;

    const sectionMap = new Map();

    sectionLinks.forEach((link) => {
      const url = new URL(link.href, window.location.href);
      sectionMap.set(url.hash.slice(1), link);
    });

    const sections = Array.from(sectionMap.keys())
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          sectionLinks.forEach((link) => link.classList.remove("active"));

          const activeLink = sectionMap.get(entry.target.id);

          if (activeLink && !activeLink.classList.contains("btn")) {
            activeLink.classList.add("active");
          }
        });
      },
      { threshold: 0.45 }
    );

    sections.forEach((section) => activeObserver.observe(section));
  };

  const setupBackToTop = () => {
    if (!backToTop) return;

    const toggleBackToTop = () => {
      backToTop.classList.toggle("visible", window.scrollY > 480);
    };

    toggleBackToTop();

    window.addEventListener("scroll", toggleBackToTop, { passive: true });

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  const setupContactForm = () => {
    if (!contactForm) return;

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const dictionary = translations[currentLang] || translations.pt;
      const formData = new FormData(contactForm);

      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const message = String(formData.get("message") || "").trim();

      const text = [
        `${dictionary.whatsappIntro} ${name}.`,
        `${dictionary.whatsappEmail} ${email}.`,
        `${dictionary.whatsappMessage}: ${message}`
      ].join("\n");

      window.open(
        `https://wa.me/5511911687141?text=${encodeURIComponent(text)}`,
        "_blank",
        "noopener,noreferrer"
      );

      contactForm.reset();
    });
  };

  const setupMouseGlow = () => {
    const glow = $(".mouse-glow");

    if (!glow || prefersReducedMotion) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;

    window.addEventListener(
      "mousemove",
      (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
      },
      { passive: true }
    );

    window.addEventListener("mouseleave", () => {
      glow.style.opacity = "0";
    });

    window.addEventListener("mouseenter", () => {
      glow.style.opacity = "0.55";
    });

    const animateGlow = () => {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;

      glow.style.transform = `translate(${glowX - 210}px, ${glowY - 210}px)`;

      requestAnimationFrame(animateGlow);
    };

    animateGlow();
  };

  const setupTiltCards = () => {
    if (prefersReducedMotion) return;

    const cards = $$(
      ".card, .skill-category-card, .about-card, .contact-item, .timeline-item, .mini-highlight"
    );

    cards.forEach((card) => {
      card.classList.add("tilt-card");

      card.addEventListener("mousemove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const rotateX = ((y / rect.height) - 0.5) * -6;
        const rotateY = ((x / rect.width) - 0.5) * 6;

        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  };

  setYear();
  setHeaderState();
  setupMenu();
  setupSmoothScroll();
  setupRevealAnimations();
  setupTechStackReveal();
  setupTabs();
  setupProjectFilter();
  setupLanguageSwitcher();
  setupActiveMenu();
  setupBackToTop();
  setupContactForm();
  setupMouseGlow();
  setupTiltCards();

  window.addEventListener("scroll", setHeaderState, { passive: true });
})();