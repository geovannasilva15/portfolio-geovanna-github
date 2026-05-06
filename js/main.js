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
      navStory: "História",
      navSkills: "Tecnologias",
      navWhyHire: "Por que me contratar",
      navProjects: "Projetos",
      navServices: "Serviços",
      navContact: "Contato",

      heroBadge: "Disponível para projetos freelance",
      heroSubtitle: "Analista de Treinamento em IA & Full-Stack Developer",
      heroText: "Crio soluções digitais com IA, Python, automação, dados e desenvolvimento web para transformar ideias em produtos funcionais, bonitos e estratégicos.",
      typingPrefix: "Especialista em",
      heroBtnProjects: "Ver projetos",
      heroBtnWhatsapp: "Chamar no WhatsApp",
      statExperience: "anos de experiência",
      statAiPython: "automação inteligente",
      statFullstack: "web, dados e sistemas",

      aboutCaption: "IA, Python, Desenvolvimento e Dados",
      aboutEyebrow: "Sobre mim",
      aboutTitle: "Desenvolvedora com foco em IA, Python e soluções digitais inteligentes",
      aboutLead: "Meu nome é Geovanna Silva. Sou Analista de Treinamento em Inteligência Artificial e Full-Stack Developer, com experiência em tecnologia, dados, automação e desenvolvimento de sistemas.",
      aboutTextOne: "Meu diferencial está em unir raciocínio técnico, visão de negócio e comunicação clara para transformar ideias em soluções digitais úteis, organizadas e visualmente profissionais.",
      aboutTextTwo: "Atualmente, meu foco está em Inteligência Artificial aplicada, Python, automação de processos, desenvolvimento web e análise de dados.",
      aboutGoalLabel: "Meu objetivo",
      aboutGoalText: "Criar soluções digitais modernas, inteligentes e acessíveis, com foco em performance, clareza e impacto real.",

      labelName: "Nome",
      labelAge: "Idade",
      labelPhone: "Telefone",
      labelCity: "Cidade",
      labelCurrentFocus: "Foco atual",
      currentFocusValue: "IA, Python e Automação",
      labelFreelance: "Freelance",
      freelanceValue: "Disponível",
      downloadCv: "Baixar currículo",
      hireMe: "Vamos conversar",

      storyEyebrow: "Minha jornada",
      storyTitle: "Uma trajetória construída com tecnologia, aprendizado e propósito",
      storyText: "Minha história na tecnologia começou com curiosidade e evoluiu para um objetivo claro: usar desenvolvimento, dados e inteligência artificial para criar soluções que resolvem problemas reais.",
      storyIntroOne: "Ao longo da minha trajetória, percebi que tecnologia não é apenas sobre ferramentas ou linguagens de programação. Tecnologia é sobre entender uma necessidade, organizar ideias, criar caminhos e entregar algo que facilite a vida de quem usa.",
      storyIntroTwo: "Por isso, busco construir uma carreira com uma visão completa: desenvolvimento web, automação, IA, Python, dados e experiência do usuário trabalhando juntos para gerar soluções mais inteligentes e eficientes.",

      timelineOneLabel: "Base técnica",
      timelineOneTitle: "Primeiros passos em tecnologia",
      timelineOneText: "Comecei estudando lógica, programação, fundamentos de TI e desenvolvimento de sistemas. Essa fase construiu minha base para pensar de forma estruturada, resolver problemas e transformar ideias em código.",
      timelineTwoLabel: "Evolução profissional",
      timelineTwoTitle: "Desenvolvimento, dados e sistemas",
      timelineTwoText: "Aprofundei meus conhecimentos em desenvolvimento full-stack, banco de dados, dashboards, Power BI, C#, SQL e organização de informações para apoiar decisões e melhorar processos.",
      timelineThreeLabel: "Foco atual",
      timelineThreeTitle: "IA, Python e automação",
      timelineThreeText: "Hoje meu foco está em inteligência artificial aplicada, Python e automações. Quero criar soluções que reduzam trabalho manual, aumentem produtividade e conectem tecnologia com resultado real.",

      workStyleEyebrow: "Minha forma de trabalhar",
      workStyleTitle: "Eu acredito em soluções bonitas, funcionais e bem pensadas.",
      workStyleText: "Antes de desenvolver, eu busco entender o problema. Depois, penso na experiência, na estrutura, na clareza visual e na melhor forma de entregar valor.",
      workStyleButton: "Quero conversar sobre um projeto",

      skillsEyebrow: "Especialidades",
      skillsTitle: "Tecnologia com foco em IA, Python e soluções que geram resultado",
      skillsText: "Meu trabalho vai além de escrever código. Eu uno desenvolvimento web, automação, inteligência artificial, Python e análise de dados para criar soluções úteis, bonitas, organizadas e pensadas para resolver problemas reais.",
      pillAutomation: "Automação",
      pillData: "Dados",

      focusOneTitle: "IA & Python",
      focusOneText: "Desenvolvimento de automações, lógica de negócio, integrações e soluções inteligentes com foco em produtividade e eficiência.",
      focusTwoTitle: "Desenvolvimento Web",
      focusTwoText: "Criação de sites, interfaces e sistemas responsivos com experiência visual moderna, performance e organização de código.",
      focusThreeTitle: "Dados & BI",
      focusThreeText: "Dashboards, leitura de indicadores e visualização de dados para apoiar decisões com mais clareza e estratégia.",
      focusFourTitle: "Automação de Processos",
      focusFourText: "Soluções para reduzir tarefas manuais, otimizar fluxos e tornar o trabalho mais ágil com tecnologia e IA aplicada.",

      techGroupOneTitle: "Front-end",
      techGroupOneSubtitle: "Visual, responsivo e moderno",
      techGroupTwoTitle: "Python, IA & Automação",
      techGroupTwoSubtitle: "Seu principal diferencial",
      techGroupThreeTitle: "Back-end & Dados",
      techGroupThreeSubtitle: "Lógica, estrutura e análise",
      techGroupFourTitle: "Ferramentas",
      techGroupFourSubtitle: "Fluxo profissional de trabalho",
      responsiveUi: "UI Responsiva",
      appliedAi: "IA aplicada",
      automation: "Automação",
      integrations: "Integrações",
      bestPractices: "Boas práticas",

      whyHireEyebrow: "Meu diferencial",
      whyHireTitle: "Por que me contratar?",
      whyHireText: "Eu entrego mais do que páginas bonitas. Meu foco é desenvolver soluções que realmente façam sentido para o seu objetivo, com boa estrutura, organização, automação e uma experiência clara para quem vai usar.",
      whyHireItemOne: "Tenho uma visão que une tecnologia, negócio e experiência do usuário.",
      whyHireItemTwo: "Trabalho com IA, Python, automação, desenvolvimento web e dados, o que me permite criar soluções mais completas.",
      whyHireItemThree: "Tenho facilidade para entender necessidades reais e transformar isso em algo visual, funcional e útil.",
      whyHireItemFour: "Busco sempre entregar projetos com clareza, estética, performance e resultado.",

      valueBadge: "Perfil híbrido",
      valueTitle: "Tecnologia + IA + comunicação clara",
      valueText: "Meu diferencial está em unir raciocínio técnico com organização, criatividade e foco em resolver problemas. Isso me permite atuar desde a interface até a lógica da solução, incluindo automação, IA aplicada e análise de dados.",
      metricOneText: "Automação, produtividade e soluções inteligentes",
      metricTwoTitle: "Desenvolvimento Web",
      metricTwoText: "Interfaces profissionais e experiência visual moderna",
      metricThreeTitle: "Dados & BI",
      metricThreeText: "Indicadores, leitura estratégica e dashboards",
      metricFourTitle: "Compromisso",
      metricFourText: "Organização, clareza e foco em qualidade",

      projectsEyebrow: "Portfólio",
      projectsTitle: "Projetos em destaque",
      projectsText: "Alguns projetos que mostram minhas habilidades em desenvolvimento, automação, dados e organização de soluções digitais.",
      filterAll: "Todos",
      filterWeb: "Web",
      filterAi: "IA & Automação",
      filterData: "Dados",
      projectObjectiveLabel: "Objetivo",

      projectOneTitle: "Sistema de Funcionários",
      projectOneText: "CRUD em C# com programação orientada a objetos, herança, polimorfismo, regras de salário e impostos por cargo.",
      projectOneObjective: "Organizar o cadastro e as regras de negócio de funcionários.",
      projectTwoTitle: "Dashboard de Churn",
      projectTwoText: "Análise de churn, marketing, estoque e feedbacks para visualizar indicadores e apoiar decisões estratégicas.",
      projectTwoObjective: "Apoiar decisões com indicadores claros e leitura estratégica.",
      projectThreeTitle: "Portfólio Pessoal",
      projectThreeText: "Site responsivo com identidade visual, animações, navegação fluida, foco em performance e apresentação profissional.",
      projectThreeObjective: "Apresentar minha trajetória, competências e serviços de forma elegante.",
      projectFourTitle: "Automações com IA",
      projectFourText: "Soluções para otimizar processos, reduzir tarefas manuais e tornar fluxos de trabalho mais rápidos e inteligentes.",
      projectFourObjective: "Ganhar produtividade com automações práticas e inteligentes.",

      seeProject: "Ver projeto",
      seeDashboard: "Ver dashboard",
      details: "Detalhes",
      backTop: "Voltar ao topo",
      contact: "Contato",
      knowMore: "Saber mais",
      requestQuote: "Solicitar orçamento",

      servicesEyebrow: "O que eu faço",
      servicesTitle: "Meus serviços",
      servicesText: "Soluções digitais para quem precisa de presença online, automação, organização de dados e tecnologia aplicada ao negócio.",
      serviceOneTitle: "Desenvolvimento Web",
      serviceOneText: "Sites, landing pages e sistemas responsivos com foco em performance, acessibilidade e SEO.",
      serviceTwoTitle: "Automação & IA",
      serviceTwoText: "Automações, assistentes e soluções com IA para ganhar eficiência no dia a dia.",
      serviceThreeTitle: "Dados & BI",
      serviceThreeText: "Dashboards e análises para apoiar decisões com clareza e indicadores bem definidos.",
      seeAllServices: "Ver todos os serviços",

      servicesPageEyebrow: "Serviços profissionais",
      servicesPageTitle: "Soluções digitais para seu projeto",
      servicesPageText: "Clique em um serviço para abrir o WhatsApp com uma mensagem pronta. Assim eu já entendo o que você precisa e consigo responder com mais clareza sobre prazo e orçamento.",
      servicesPagePrimary: "Ver serviços",
      servicesPageSecondary: "Ver projetos",
      servicesListEyebrow: "Como posso ajudar",
      servicesListTitle: "Escolha o serviço ideal",
      servicesListLead: "Cada card abre uma conversa direta no WhatsApp com uma mensagem personalizada, facilitando o primeiro contato.",

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

      systems: "Sistemas",
      processes: "Processos",
      security: "Segurança",
      access: "Acessos",
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
      navStory: "Story",
      navSkills: "Technologies",
      navWhyHire: "Why hire me",
      navProjects: "Projects",
      navServices: "Services",
      navContact: "Contact",

      heroBadge: "Available for freelance projects",
      heroSubtitle: "AI Training Analyst & Full-Stack Developer",
      heroText: "I create digital solutions with AI, Python, automation, data and web development to turn ideas into functional, beautiful and strategic products.",
      typingPrefix: "Specialized in",
      heroBtnProjects: "View projects",
      heroBtnWhatsapp: "Message me on WhatsApp",
      statExperience: "years of experience",
      statAiPython: "intelligent automation",
      statFullstack: "web, data and systems",

      aboutCaption: "AI, Python, Development and Data",
      aboutEyebrow: "About me",
      aboutTitle: "Developer focused on AI, Python and intelligent digital solutions",
      aboutLead: "My name is Geovanna Silva. I am an Artificial Intelligence Training Analyst and Full-Stack Developer, with experience in technology, data, automation and system development.",
      aboutTextOne: "My differential is combining technical thinking, business vision and clear communication to turn ideas into useful, organized and visually professional digital solutions.",
      aboutTextTwo: "Currently, my focus is on applied Artificial Intelligence, Python, process automation, web development and data analysis.",
      aboutGoalLabel: "My goal",
      aboutGoalText: "To create modern, intelligent and accessible digital solutions focused on performance, clarity and real impact.",

      labelName: "Name",
      labelAge: "Age",
      labelPhone: "Phone",
      labelCity: "City",
      labelCurrentFocus: "Current focus",
      currentFocusValue: "AI, Python and Automation",
      labelFreelance: "Freelance",
      freelanceValue: "Available",
      downloadCv: "Download resume",
      hireMe: "Let's talk",

      storyEyebrow: "My journey",
      storyTitle: "A journey built with technology, learning and purpose",
      storyText: "My story in technology started with curiosity and evolved into a clear goal: using development, data and artificial intelligence to create solutions that solve real problems.",
      storyIntroOne: "Throughout my journey, I realized that technology is not only about tools or programming languages. Technology is about understanding a need, organizing ideas, creating paths and delivering something that makes life easier for users.",
      storyIntroTwo: "That is why I aim to build a career with a complete vision: web development, automation, AI, Python, data and user experience working together to create smarter and more efficient solutions.",

      timelineOneLabel: "Technical foundation",
      timelineOneTitle: "First steps in technology",
      timelineOneText: "I started by studying logic, programming, IT fundamentals and system development. This stage built my foundation to think in a structured way, solve problems and turn ideas into code.",
      timelineTwoLabel: "Professional growth",
      timelineTwoTitle: "Development, data and systems",
      timelineTwoText: "I deepened my knowledge in full-stack development, databases, dashboards, Power BI, C#, SQL and information organization to support decisions and improve processes.",
      timelineThreeLabel: "Current focus",
      timelineThreeTitle: "AI, Python and automation",
      timelineThreeText: "Today my focus is on applied artificial intelligence, Python and automation. I want to create solutions that reduce manual work, increase productivity and connect technology with real results.",

      workStyleEyebrow: "My way of working",
      workStyleTitle: "I believe in beautiful, functional and well-designed solutions.",
      workStyleText: "Before developing, I seek to understand the problem. Then I think about the experience, structure, visual clarity and the best way to deliver value.",
      workStyleButton: "I want to discuss a project",

      skillsEyebrow: "Specialties",
      skillsTitle: "Technology focused on AI, Python and solutions that generate results",
      skillsText: "My work goes beyond writing code. I combine web development, automation, artificial intelligence, Python and data analysis to create useful, beautiful, organized solutions designed to solve real problems.",
      pillAutomation: "Automation",
      pillData: "Data",

      focusOneTitle: "AI & Python",
      focusOneText: "Development of automations, business logic, integrations and intelligent solutions focused on productivity and efficiency.",
      focusTwoTitle: "Web Development",
      focusTwoText: "Creation of websites, interfaces and responsive systems with modern visual experience, performance and code organization.",
      focusThreeTitle: "Data & BI",
      focusThreeText: "Dashboards, indicator analysis and data visualization to support decisions with more clarity and strategy.",
      focusFourTitle: "Process Automation",
      focusFourText: "Solutions to reduce manual tasks, optimize workflows and make work more agile with technology and applied AI.",

      techGroupOneTitle: "Front-end",
      techGroupOneSubtitle: "Visual, responsive and modern",
      techGroupTwoTitle: "Python, AI & Automation",
      techGroupTwoSubtitle: "Your main differential",
      techGroupThreeTitle: "Back-end & Data",
      techGroupThreeSubtitle: "Logic, structure and analysis",
      techGroupFourTitle: "Tools",
      techGroupFourSubtitle: "Professional workflow",
      responsiveUi: "Responsive UI",
      appliedAi: "Applied AI",
      automation: "Automation",
      integrations: "Integrations",
      bestPractices: "Best practices",

      whyHireEyebrow: "My differential",
      whyHireTitle: "Why hire me?",
      whyHireText: "I deliver more than beautiful pages. My focus is to develop solutions that truly make sense for your goal, with good structure, organization, automation and a clear experience for users.",
      whyHireItemOne: "I have a vision that combines technology, business and user experience.",
      whyHireItemTwo: "I work with AI, Python, automation, web development and data, which allows me to create more complete solutions.",
      whyHireItemThree: "I can understand real needs and transform them into something visual, functional and useful.",
      whyHireItemFour: "I always aim to deliver projects with clarity, aesthetics, performance and results.",

      valueBadge: "Hybrid profile",
      valueTitle: "Technology + AI + clear communication",
      valueText: "My differential is combining technical thinking with organization, creativity and focus on solving problems. This allows me to work from the interface to the solution logic, including automation, applied AI and data analysis.",
      metricOneText: "Automation, productivity and intelligent solutions",
      metricTwoTitle: "Web Development",
      metricTwoText: "Professional interfaces and modern visual experience",
      metricThreeTitle: "Data & BI",
      metricThreeText: "Indicators, strategic reading and dashboards",
      metricFourTitle: "Commitment",
      metricFourText: "Organization, clarity and focus on quality",

      projectsEyebrow: "Portfolio",
      projectsTitle: "Featured projects",
      projectsText: "Some projects that show my skills in development, automation, data and digital solution organization.",
      filterAll: "All",
      filterWeb: "Web",
      filterAi: "AI & Automation",
      filterData: "Data",
      projectObjectiveLabel: "Goal",

      projectOneTitle: "Employee Management System",
      projectOneText: "C# CRUD with object-oriented programming, inheritance, polymorphism, salary rules and taxes by role.",
      projectOneObjective: "Organize employee records and business rules.",
      projectTwoTitle: "Churn Dashboard",
      projectTwoText: "Churn, marketing, inventory and feedback analysis to visualize indicators and support strategic decisions.",
      projectTwoObjective: "Support decisions with clear indicators and strategic reading.",
      projectThreeTitle: "Personal Portfolio",
      projectThreeText: "Responsive website with visual identity, animations, smooth navigation, performance focus and professional presentation.",
      projectThreeObjective: "Present my journey, skills and services elegantly.",
      projectFourTitle: "AI Automations",
      projectFourText: "Solutions to optimize processes, reduce manual tasks and make workflows faster and smarter.",
      projectFourObjective: "Increase productivity with practical and intelligent automations.",

      seeProject: "View project",
      seeDashboard: "View dashboard",
      details: "Details",
      backTop: "Back to top",
      contact: "Contact",
      knowMore: "Learn more",
      requestQuote: "Request a quote",

      servicesEyebrow: "What I do",
      servicesTitle: "My services",
      servicesText: "Digital solutions for those who need online presence, automation, data organization and technology applied to business.",
      serviceOneTitle: "Web Development",
      serviceOneText: "Websites, landing pages and responsive systems focused on performance, accessibility and SEO.",
      serviceTwoTitle: "Automation & AI",
      serviceTwoText: "Automations, assistants and AI solutions to improve daily efficiency.",
      serviceThreeTitle: "Data & BI",
      serviceThreeText: "Dashboards and analyses to support decisions with clarity and well-defined indicators.",
      seeAllServices: "View all services",

      servicesPageEyebrow: "Professional services",
      servicesPageTitle: "Digital solutions for your project",
      servicesPageText: "Click on a service to open WhatsApp with a ready-to-send message. This helps me understand what you need and reply more clearly about deadlines and budget.",
      servicesPagePrimary: "View services",
      servicesPageSecondary: "View projects",
      servicesListEyebrow: "How I can help",
      servicesListTitle: "Choose the ideal service",
      servicesListLead: "Each card opens a direct WhatsApp conversation with a personalized message, making the first contact easier.",

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

      systems: "Systems",
      processes: "Processes",
      security: "Security",
      access: "Access",
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
      navStory: "Historia",
      navSkills: "Tecnologías",
      navWhyHire: "Por qué contratarme",
      navProjects: "Proyectos",
      navServices: "Servicios",
      navContact: "Contacto",

      heroBadge: "Disponible para proyectos freelance",
      heroSubtitle: "Analista de Entrenamiento en IA & Full-Stack Developer",
      heroText: "Creo soluciones digitales con IA, Python, automatización, datos y desarrollo web para transformar ideas en productos funcionales, bonitos y estratégicos.",
      typingPrefix: "Especialista en",
      heroBtnProjects: "Ver proyectos",
      heroBtnWhatsapp: "Contactar por WhatsApp",
      statExperience: "años de experiencia",
      statAiPython: "automatización inteligente",
      statFullstack: "web, datos y sistemas",

      aboutCaption: "IA, Python, Desarrollo y Datos",
      aboutEyebrow: "Sobre mí",
      aboutTitle: "Desarrolladora enfocada en IA, Python y soluciones digitales inteligentes",
      aboutLead: "Mi nombre es Geovanna Silva. Soy Analista de Entrenamiento en Inteligencia Artificial y Full-Stack Developer, con experiencia en tecnología, datos, automatización y desarrollo de sistemas.",
      aboutTextOne: "Mi diferencial está en unir pensamiento técnico, visión de negocio y comunicación clara para transformar ideas en soluciones digitales útiles, organizadas y visualmente profesionales.",
      aboutTextTwo: "Actualmente, mi enfoque está en Inteligencia Artificial aplicada, Python, automatización de procesos, desarrollo web y análisis de datos.",
      aboutGoalLabel: "Mi objetivo",
      aboutGoalText: "Crear soluciones digitales modernas, inteligentes y accesibles, con foco en rendimiento, claridad e impacto real.",

      labelName: "Nombre",
      labelAge: "Edad",
      labelPhone: "Teléfono",
      labelCity: "Ciudad",
      labelCurrentFocus: "Foco actual",
      currentFocusValue: "IA, Python y Automatización",
      labelFreelance: "Freelance",
      freelanceValue: "Disponible",
      downloadCv: "Descargar currículum",
      hireMe: "Hablemos",

      storyEyebrow: "Mi trayectoria",
      storyTitle: "Una trayectoria construida con tecnología, aprendizaje y propósito",
      storyText: "Mi historia en tecnología comenzó con curiosidad y evolucionó hacia un objetivo claro: usar desarrollo, datos e inteligencia artificial para crear soluciones que resuelven problemas reales.",
      storyIntroOne: "A lo largo de mi trayectoria, entendí que la tecnología no se trata solo de herramientas o lenguajes de programación. Tecnología es entender una necesidad, organizar ideas, crear caminos y entregar algo que facilite la vida de quien lo usa.",
      storyIntroTwo: "Por eso, busco construir una carrera con una visión completa: desarrollo web, automatización, IA, Python, datos y experiencia de usuario trabajando juntos para generar soluciones más inteligentes y eficientes.",

      timelineOneLabel: "Base técnica",
      timelineOneTitle: "Primeros pasos en tecnología",
      timelineOneText: "Comencé estudiando lógica, programación, fundamentos de TI y desarrollo de sistemas. Esta etapa construyó mi base para pensar de forma estructurada, resolver problemas y transformar ideas en código.",
      timelineTwoLabel: "Evolución profesional",
      timelineTwoTitle: "Desarrollo, datos y sistemas",
      timelineTwoText: "Profundicé mis conocimientos en desarrollo full-stack, bases de datos, dashboards, Power BI, C#, SQL y organización de información para apoyar decisiones y mejorar procesos.",
      timelineThreeLabel: "Foco actual",
      timelineThreeTitle: "IA, Python y automatización",
      timelineThreeText: "Hoy mi foco está en inteligencia artificial aplicada, Python y automatizaciones. Quiero crear soluciones que reduzcan trabajo manual, aumenten productividad y conecten tecnología con resultados reales.",

      workStyleEyebrow: "Mi forma de trabajar",
      workStyleTitle: "Creo en soluciones bonitas, funcionales y bien pensadas.",
      workStyleText: "Antes de desarrollar, busco entender el problema. Después, pienso en la experiencia, la estructura, la claridad visual y la mejor forma de entregar valor.",
      workStyleButton: "Quiero hablar sobre un proyecto",

      skillsEyebrow: "Especialidades",
      skillsTitle: "Tecnología enfocada en IA, Python y soluciones que generan resultado",
      skillsText: "Mi trabajo va más allá de escribir código. Uno desarrollo web, automatización, inteligencia artificial, Python y análisis de datos para crear soluciones útiles, bonitas, organizadas y pensadas para resolver problemas reales.",
      pillAutomation: "Automatización",
      pillData: "Datos",

      focusOneTitle: "IA & Python",
      focusOneText: "Desarrollo de automatizaciones, lógica de negocio, integraciones y soluciones inteligentes con foco en productividad y eficiencia.",
      focusTwoTitle: "Desarrollo Web",
      focusTwoText: "Creación de sitios, interfaces y sistemas responsivos con experiencia visual moderna, rendimiento y organización de código.",
      focusThreeTitle: "Datos & BI",
      focusThreeText: "Dashboards, lectura de indicadores y visualización de datos para apoyar decisiones con más claridad y estrategia.",
      focusFourTitle: "Automatización de Procesos",
      focusFourText: "Soluciones para reducir tareas manuales, optimizar flujos y hacer el trabajo más ágil con tecnología e IA aplicada.",

      techGroupOneTitle: "Front-end",
      techGroupOneSubtitle: "Visual, responsivo y moderno",
      techGroupTwoTitle: "Python, IA & Automatización",
      techGroupTwoSubtitle: "Tu principal diferencial",
      techGroupThreeTitle: "Back-end & Datos",
      techGroupThreeSubtitle: "Lógica, estructura y análisis",
      techGroupFourTitle: "Herramientas",
      techGroupFourSubtitle: "Flujo profesional de trabajo",
      responsiveUi: "UI Responsiva",
      appliedAi: "IA aplicada",
      automation: "Automatización",
      integrations: "Integraciones",
      bestPractices: "Buenas prácticas",

      whyHireEyebrow: "Mi diferencial",
      whyHireTitle: "¿Por qué contratarme?",
      whyHireText: "Entrego más que páginas bonitas. Mi foco es desarrollar soluciones que realmente tengan sentido para tu objetivo, con buena estructura, organización, automatización y una experiencia clara para quien va a usarla.",
      whyHireItemOne: "Tengo una visión que une tecnología, negocio y experiencia de usuario.",
      whyHireItemTwo: "Trabajo con IA, Python, automatización, desarrollo web y datos, lo que me permite crear soluciones más completas.",
      whyHireItemThree: "Tengo facilidad para entender necesidades reales y transformarlas en algo visual, funcional y útil.",
      whyHireItemFour: "Busco siempre entregar proyectos con claridad, estética, rendimiento y resultado.",

      valueBadge: "Perfil híbrido",
      valueTitle: "Tecnología + IA + comunicación clara",
      valueText: "Mi diferencial está en unir pensamiento técnico con organización, creatividad y foco en resolver problemas. Esto me permite actuar desde la interfaz hasta la lógica de la solución, incluyendo automatización, IA aplicada y análisis de datos.",
      metricOneText: "Automatización, productividad y soluciones inteligentes",
      metricTwoTitle: "Desarrollo Web",
      metricTwoText: "Interfaces profesionales y experiencia visual moderna",
      metricThreeTitle: "Datos & BI",
      metricThreeText: "Indicadores, lectura estratégica y dashboards",
      metricFourTitle: "Compromiso",
      metricFourText: "Organización, claridad y foco en calidad",

      projectsEyebrow: "Portafolio",
      projectsTitle: "Proyectos destacados",
      projectsText: "Algunos proyectos que muestran mis habilidades en desarrollo, automatización, datos y organización de soluciones digitales.",
      filterAll: "Todos",
      filterWeb: "Web",
      filterAi: "IA & Automatización",
      filterData: "Datos",
      projectObjectiveLabel: "Objetivo",

      projectOneTitle: "Sistema de Empleados",
      projectOneText: "CRUD en C# con programación orientada a objetos, herencia, polimorfismo, reglas de salario e impuestos por cargo.",
      projectOneObjective: "Organizar el registro y las reglas de negocio de empleados.",
      projectTwoTitle: "Dashboard de Churn",
      projectTwoText: "Análisis de churn, marketing, inventario y feedbacks para visualizar indicadores y apoyar decisiones estratégicas.",
      projectTwoObjective: "Apoyar decisiones con indicadores claros y lectura estratégica.",
      projectThreeTitle: "Portafolio Personal",
      projectThreeText: "Sitio responsivo con identidad visual, animaciones, navegación fluida, foco en rendimiento y presentación profesional.",
      projectThreeObjective: "Presentar mi trayectoria, competencias y servicios de forma elegante.",
      projectFourTitle: "Automatizaciones con IA",
      projectFourText: "Soluciones para optimizar procesos, reducir tareas manuales y hacer los flujos de trabajo más rápidos e inteligentes.",
      projectFourObjective: "Ganar productividad con automatizaciones prácticas e inteligentes.",

      seeProject: "Ver proyecto",
      seeDashboard: "Ver dashboard",
      details: "Detalles",
      backTop: "Volver arriba",
      contact: "Contacto",
      knowMore: "Saber más",
      requestQuote: "Solicitar presupuesto",

      servicesEyebrow: "Lo que hago",
      servicesTitle: "Mis servicios",
      servicesText: "Soluciones digitales para quienes necesitan presencia online, automatización, organización de datos y tecnología aplicada al negocio.",
      serviceOneTitle: "Desarrollo Web",
      serviceOneText: "Sitios, landing pages y sistemas responsivos con foco en rendimiento, accesibilidad y SEO.",
      serviceTwoTitle: "Automatización & IA",
      serviceTwoText: "Automatizaciones, asistentes y soluciones con IA para ganar eficiencia en el día a día.",
      serviceThreeTitle: "Datos & BI",
      serviceThreeText: "Dashboards y análisis para apoyar decisiones con claridad e indicadores bien definidos.",
      seeAllServices: "Ver todos los servicios",

      servicesPageEyebrow: "Servicios profesionales",
      servicesPageTitle: "Soluciones digitales para tu proyecto",
      servicesPageText: "Haz clic en un servicio para abrir WhatsApp con un mensaje listo. Así entiendo lo que necesitas y puedo responder con más claridad sobre plazo y presupuesto.",
      servicesPagePrimary: "Ver servicios",
      servicesPageSecondary: "Ver proyectos",
      servicesListEyebrow: "Cómo puedo ayudar",
      servicesListTitle: "Elige el servicio ideal",
      servicesListLead: "Cada card abre una conversación directa en WhatsApp con un mensaje personalizado, facilitando el primer contacto.",

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

      systems: "Sistemas",
      processes: "Procesos",
      security: "Seguridad",
      access: "Accesos",
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
    $$("[data-placeholder-pt]").forEach((field) => {
      const key = `placeholder${language.charAt(0).toUpperCase()}${language.slice(1)}`;
      const placeholder = field.dataset[key];

      if (placeholder) {
        field.setAttribute("placeholder", placeholder);
      }
    });
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
      ".card, .tech-group, .about-card, .contact-item, .timeline-item"
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
  setupLanguageSwitcher();
  setupActiveMenu();
  setupProjectFilter();
  setupBackToTop();
  setupContactForm();
  setupMouseGlow();
  setupTiltCards();

  window.addEventListener("scroll", setHeaderState, { passive: true });
})();