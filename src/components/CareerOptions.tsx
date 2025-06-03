
import { useRef, useState, useEffect } from "react";
import {
  Code,
  Palette,
  Brain,
  Users,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { CustomCareer } from "@/pages/AdminCareers";
import "./CareerOptions.css";

type Career = {
  id: string;
  title: string;
  teaser: string;
  icon: JSX.Element;
  industry: string;
  color: string;
  salary?: string;
  description?: string;
};

type CategoryResource = {
  title: string;
  url: string;
};

type CareerCategory = {
  id: string;
  name: string;
  parentCategory?: string;
  opportunities: string[];
  resources: {
    "Educational Resources": CategoryResource[];
    "Online Courses": CategoryResource[];
    "Industry Blogs": CategoryResource[];
    "Professional Networks": CategoryResource[];
  };
  insights: string;
};

// Hardcoded career data
const hardcodedCareers = {
  "Technology": {
    "Software Development": {
      "Opportunities and Roles": [
        "Software Engineer",
        "Application Developer",
        "Full-Stack Developer"
      ],
      "Resources": {
        "Educational Resources": [
          {
            "title": "Coursera's Software Development Courses",
            "url": "https://www.coursera.org/browse/computer-science/software-development"
          },
          {
            "title": "edX's Software Engineering MicroMasters",
            "url": "https://www.edx.org/"
          }
        ],
        "Online Courses": [
          {
            "title": "Codecademy's Learn JavaScript",
            "url": "https://www.codecademy.com/"
          },
          {
            "title": "Udacity's Full-Stack Web Developer Nanodegree",
            "url": "https://www.udacity.com/"
          }
        ],
        "Industry Blogs": [
          {
            "title": "TechCrunch",
            "url": "https://techcrunch.com/"
          },
          {
            "title": "Hacker News",
            "url": "https://news.ycombinator.com/"
          }
        ],
        "Professional Networks": [
          {
            "title": "GitHub",
            "url": "https://github.com/"
          },
          {
            "title": "Stack Overflow",
            "url": "https://stackoverflow.com/"
          }
        ]
      },
      "Insights": "Software development continues to grow with increasing demand for innovative solutions across industries."
    },
    "Data Science": {
      "Opportunities and Roles": [
        "Data Scientist",
        "Data Analyst",
        "Machine Learning Engineer"
      ],
      "Resources": {
        "Educational Resources": [
          {
            "title": "DataCamp's Data Science Courses",
            "url": "https://www.datacamp.com/"
          },
          {
            "title": "Coursera's Data Science Specialization",
            "url": "https://www.coursera.org/specializations/jhu-data-science"
          }
        ],
        "Online Courses": [
          {
            "title": "Udemy's Data Science Bootcamp",
            "url": "https://www.udemy.com/"
          },
          {
            "title": "Kaggle's Data Science Courses",
            "url": "https://www.kaggle.com/learn"
          }
        ],
        "Industry Blogs": [
          {
            "title": "Towards Data Science",
            "url": "https://towardsdatascience.com/"
          },
          {
            "title": "Data Science Central",
            "url": "https://www.datasciencecentral.com/"
          }
        ],
        "Professional Networks": [
          {
            "title": "Kaggle",
            "url": "https://www.kaggle.com/"
          },
          {
            "title": "LinkedIn Data Science Group",
            "url": "https://www.linkedin.com/groups/2445483/"
          }
        ]
      },
      "Insights": "Data science is a rapidly expanding field with applications in finance, healthcare, and technology."
    },
    "Cybersecurity": {
      "Opportunities and Roles": [
        "Cybersecurity Analyst",
        "Information Security Manager",
        "Ethical Hacker"
      ],
      "Resources": {
        "Educational Resources": [
          {
            "title": "Cybrary's Cybersecurity Courses",
            "url": "https://www.cybrary.it/"
          },
          {
            "title": "SANS Institute's Cybersecurity Training",
            "url": "https://www.sans.org/"
          }
        ],
        "Online Courses": [
          {
            "title": "Coursera's Cybersecurity Specialization",
            "url": "https://www.coursera.org/search?query=cyber%20security"
          },
          {
            "title": "Udemy's Complete Cyber Security Course",
            "url": "https://www.udemy.com/course/complete-cyber-security-course/"
          }
        ],
        "Industry Blogs": [
          {
            "title": "Krebs on Security",
            "url": "https://krebsonsecurity.com/"
          },
          {
            "title": "The Hacker News",
            "url": "https://thehackernews.com/"
          }
        ],
        "Professional Networks": [
          {
            "title": "ISACA",
            "url": "https://www.isaca.org/"
          },
          {
            "title": "(ISC)²",
            "url": "https://www.isc2.org/"
          }
        ]
      },
      "Insights": "With increasing cyber threats, the need for cybersecurity professionals is growing."
    },
    "Artificial Intelligence": {
      "Opportunities and Roles": [
        "AI Research Scientist",
        "Machine Learning Engineer",
        "AI Specialist"
      ],
      "Resources": {
        "Educational Resources": [
          {
            "title": "MIT's Artificial Intelligence Courses",
            "url": "https://betterworld.mit.edu/artificial-intelligence/"
          },
          {
            "title": "Stanford's AI Courses",
            "url": "https://ai.stanford.edu/"
          }
        ],
        "Online Courses": [
          {
            "title": "Coursera's AI for Everyone",
            "url": "https://www.coursera.org/learn/ai-for-everyone"
          },
          {
            "title": "Udacity's AI Programming with Python",
            "url": "https://www.udacity.com/course/ai-programming-with-python-nanodegree--nd089"
          }
        ],
        "Industry Blogs": [
          {
            "title": "AI Trends",
            "url": "https://www.ibm.com/think/insights/artificial-intelligence-trends"
          },
          {
            "title": "The AI Report",
            "url": "https://www.thereport.ai/"
          }
        ],
        "Professional Networks": [
          {
            "title": "AI Hub",
            "url": "https://aihub.org/"
          },
          {
            "title": "Machine Learning Mastery",
            "url": "https://machinelearningmastery.com/"
          }
        ]
      },
      "Insights": "AI and machine learning are transforming industries with innovations in automation, data analysis, and problem-solving."
    }
  },
  "Business": {
    "Marketing": {
      "Opportunities and Roles": [
        "Marketing Manager",
        "Digital Marketing Specialist",
        "Brand Strategist"
      ],
      "Resources": {
        "Educational Resources": [
          {
            "title": "HubSpot Academy's Marketing Courses",
            "url": "https://academy.hubspot.com/"
          },
          {
            "title": "Coursera's Digital Marketing Specialization",
            "url": "https://www.coursera.org/specializations/digital-marketing"
          }
        ],
        "Online Courses": [
          {
            "title": "Google's Digital Garage",
            "url": "https://learndigital.withgoogle.com/digitalgarage"
          },
          {
            "title": "Udemy's Complete Digital Marketing Course",
            "url": "https://www.udemy.com/course/digital-marketing-course/"
          }
        ],
        "Industry Blogs": [
          {
            "title": "Neil Patel",
            "url": "https://neilpatel.com/blog/"
          },
          {
            "title": "Marketing Land",
            "url": "https://marketingland.com/"
          }
        ],
        "Professional Networks": [
          {
            "title": "LinkedIn Marketing Solutions",
            "url": "https://business.linkedin.com/marketing-solutions"
          },
          {
            "title": "MarketingProfs",
            "url": "https://www.marketingprofs.com/"
          }
        ]
      },
      "Insights": "Marketing professionals are in demand due to the growing emphasis on digital strategies and brand management."
    },
    "Finance": {
      "Opportunities and Roles": [
        "Financial Analyst",
        "Investment Banker",
        "Financial Planner"
      ],
      "Resources": {
        "Educational Resources": [
          {
            "title": "CFA Institute's Financial Analyst Courses",
            "url": "https://www.cfainstitute.org/"
          },
          {
            "title": "Coursera's Financial Markets",
            "url": "https://www.coursera.org/learn/financial-markets"
          }
        ],
        "Online Courses": [
          {
            "title": "Udemy's Financial Analyst Course",
            "url": "https://www.udemy.com/"
          },
          {
            "title": "Khan Academy's Finance and Capital Markets",
            "url": "https://www.khanacademy.org/economics-finance-domain/core-finance"
          }
        ],
        "Industry Blogs": [
          {
            "title": "Bloomberg",
            "url": "https://www.bloomberg.com/"
          },
          {
            "title": "Financial Times",
            "url": "https://www.ft.com/"
          }
        ],
        "Professional Networks": [
          {
            "title": "CFA Society",
            "url": "https://www.cfainstitute.org/"
          },
          {
            "title": "Financial Planning Association",
            "url": "https://www.onefpa.org/"
          }
        ]
      },
      "Insights": "The finance sector offers lucrative career opportunities with roles in analysis, investment, and financial planning."
    }
  },
  "Arts and Humanities": {
    "Visual Arts": {
      "Opportunities and Roles": [
        "Artist",
        "Graphic Designer",
        "Art Director"
      ],
      "Resources": {
        "Educational Resources": [
          {
            "title": "Coursera's Art & Humanities Courses",
            "url": "https://www.coursera.org/search?query=performing%20arts%20courses"
          },
          {
            "title": "Skillshare's Visual Arts Classes",
            "url": "https://www.skillshare.com/browse/visual-arts"
          }
        ],
        "Online Courses": [
          {
            "title": "Udemy's Graphic Design Masterclass",
            "url": "https://www.udemy.com/courses/search/?q=graphic+design&src=sac&kw=gra"
          },
          {
            "title": "LinkedIn Learning's Visual Arts Courses",
            "url": "https://www.linkedin.com/learning/search?keywords=visual%20arts"
          }
        ],
        "Industry Blogs": [
          {
            "title": "Design Milk",
            "url": "https://design-milk.com/"
          },
          {
            "title": "The Art Newspaper",
            "url": "https://www.theartnewspaper.com/"
          }
        ],
        "Professional Networks": [
          {
            "title": "Behance",
            "url": "https://www.behance.net/"
          },
          {
            "title": "Dribbble",
            "url": "https://dribbble.com/"
          }
        ]
      },
      "Insights": "Visual arts professionals work in various creative fields, from fine arts to digital design."
    },
    "Performing Arts": {
      "Opportunities and Roles": [
        "Actor",
        "Musician",
        "Stage Director"
      ],
      "Resources": {
        "Educational Resources": [
          {
            "title": "Coursera's Performing Arts Courses",
            "url": "https://www.coursera.org/search?query=arts%20courses"
          },
          {
            "title": "Berklee Online's Music Courses",
            "url": "https://online.berklee.edu/courses"
          }
        ],
        "Online Courses": [
          {
            "title": "Udemy's Acting Techniques Course",
            "url": "https://www.udemy.com/courses/search/?src=ukw&q=acting+techniques"
          },
          {
            "title": "LinkedIn Learning's Music Production Courses",
            "url": "https://www.linkedin.com/learning/topics/music-production"
          }
        ],
        "Industry Blogs": [
          {
            "title": "StageMilk",
            "url": "https://www.stagemilk.com/"
          },
          {
            "title": "The Music Network",
            "url": "https://themusicnetwork.com/"
          }
        ],
        "Professional Networks": [
          {
            "title": "Casting Networks",
            "url": "https://www.castingnetworks.com/"
          },
          {
            "title": "Musical Chairs",
            "url": "https://www.musicalchairs.info/"
          }
        ]
      },
      "Insights": "Performing arts careers span theatre, music, and dance, offering creative expression opportunities."
    },
    "Literature and Writing": {
      "Opportunities and Roles": [
        "Writer",
        "Editor",
        "Literary Agent"
      ],
      "Resources": {
        "Educational Resources": [
          {
            "title": "Gotham Writers Workshop",
            "url": "https://www.writingclasses.com/"
          },
          {
            "title": "Coursera's Creative Writing Specialization",
            "url": "https://www.coursera.org/specializations/creative-writing"
          }
        ],
        "Online Courses": [
          {
            "title": "Udemy's Writing Mastery Course",
            "url": "https://www.udemy.com/course/writing-mastery-how-to-write-anything-with-confidence/"
          },
          {
            "title": "LinkedIn Learning's Writing Courses",
            "url": "https://www.linkedin.com/learning/topics/writing"
          }
        ],
        "Industry Blogs": [
          {
            "title": "Writer's Digest",
            "url": "https://www.writersdigest.com/"
          },
          {
            "title": "The Creative Penn",
            "url": "https://www.thecreativepenn.com/"
          }
        ],
        "Professional Networks": [
          {
            "title": "The Editorial Freelancers Association",
            "url": "https://www.the-efa.org/"
          },
          {
            "title": "Writers' Guild",
            "url": "https://www.writersguild.org.uk/"
          }
        ]
      },
      "Insights": "Careers in literature and writing offer diverse opportunities from authorship to editing."
    },
    "Journalism": {
      "Opportunities and Roles": [
        "Journalist",
        "News Reporter",
        "Media Correspondent"
      ],
      "Resources": {
        "Educational Resources": [
          {
            "title": "Poynter Institute",
            "url": "https://www.poynter.org/"
          },
          {
            "title": "Coursera's Journalism Specialization",
            "url": "https://www.coursera.org/search?query=journalism"
          }
        ],
        "Online Courses": [
          {
            "title": "Udemy's Journalism Essentials Course",
            "url": "https://www.udemy.com/courses/search/?q=journalism&src=sac&kw=jour"
          },
          {
            "title": "LinkedIn Learning's Journalism Courses",
            "url": "https://www.linkedin.com/learning/search?keywords=journalism"
          }
        ],
        "Industry Blogs": [
          {
            "title": "Journalism.co.uk",
            "url": "https://www.journalism.co.uk/"
          },
          {
            "title": "Nieman Lab",
            "url": "https://www.niemanlab.org/"
          }
        ],
        "Professional Networks": [
          {
            "title": "Association of Journalists",
            "url": "https://www.nuj.org.uk/"
          },
          {
            "title": "LinkedIn Journalism Group",
            "url": "https://www.linkedin.com/groups/43850/"
          }
        ]
      },
      "Insights": "Journalism offers dynamic career paths in print, broadcast, and digital media."
    },
    "Film and Television": {
      "Opportunities and Roles": [
        "Film Director",
        "Screenwriter",
        "Television Producer"
      ],
      "Resources": {
        "Educational Resources": [
          {
            "title": "MasterClass Film Courses",
            "url": "https://www.masterclass.com/"
          },
          {
            "title": "Coursera's Film and Television Courses",
            "url": "https://www.coursera.org/search?query=Film%20and%20Television%20Courses"
          }
        ],
        "Online Courses": [
          {
            "title": "Udemy's Filmmaking Course",
            "url": "https://www.udemy.com/courses/search/?q=film+making&src=sac&kw=film+ma"
          },
          {
            "title": "LinkedIn Learning's Film Production Courses",
            "url": "https://www.linkedin.com/learning/search?keywords=film%20making"
          }
        ],
        "Industry Blogs": [
          {
            "title": "IndieWire",
            "url": "https://www.indiewire.com/"
          },
          {
            "title": "The Hollywood Reporter",
            "url": "https://www.hollywoodreporter.com/"
          }
        ],
        "Professional Networks": [
          {
            "title": "Film Independent",
            "url": "https://www.filmindependent.org/"
          },
          {
            "title": "LinkedIn Film & TV Group",
            "url": "https://www.linkedin.com/groups/4074625/"
          }
        ]
      },
      "Insights": "Film and television careers involve creative production and storytelling."
    },
    "History and Cultural Studies": {
      "Opportunities and Roles": [
        "Historian",
        "Museum Curator",
        "Cultural Consultant"
      ],
      "Resources": {
        "Educational Resources": [
          {
            "title": "Coursera's History Courses",
            "url": "https://www.coursera.org/browse/arts-and-humanities/history"
          },
          {
            "title": "edX's Cultural Studies Programs",
            "url": "https://www.edx.org/learn/cultural-studies"
          }
        ],
        "Online Courses": [
          {
            "title": "Udemy's Historical Research Course",
            "url": "https://www.udemy.com/courses/search/?src=ukw&q=Historical+Research"
          }
        ],
        "Industry Blogs": [
          {
            "title": "History Today",
            "url": "https://www.historytoday.com/"
          },
          {
            "title": "Museums Association",
            "url": "https://www.museumsassociation.org/"
          }
        ],
        "Professional Networks": [
          {
            "title": "American Historical Association",
            "url": "https://www.historians.org/"
          },
          {
            "title": "International Council of Museums",
            "url": "https://icom.museum/en/"
          }
        ]
      },
      "Insights": "Careers in history and cultural studies involve research, preservation, and education."
    }
  },
  "Health and Medicine": {
    "Medicine": {
      "Opportunities and Roles": ["Doctor", "Surgeon", "Medical Researcher"],
      "Resources": {
        "Educational Resources": [
          {"title": "Coursera's Medical Courses", "url": "https://www.coursera.org/search?query=medical%20courses&topic=Health&sortBy=BEST_MATCH"},
          {"title": "Harvard Medical School's Online Learning", "url": "https://onlinelearning.hms.harvard.edu/"}
        ],
        "Online Courses": [
          {"title": "Udemy's Medical Terminology Course", "url": "https://www.udemy.com/course/medical-terminology-101/"},
          {"title": "edX's Introduction to Medical Research", "url": "https://www.edx.org/course/introduction-to-clinical-research"}
        ],
        "Industry Blogs": [
          {"title": "Medical News Today", "url": "https://www.medicalnewstoday.com/"},
          {"title": "The Lancet", "url": "https://www.thelancet.com/"}
        ],
        "Professional Networks": [
          {"title": "American Medical Association", "url": "https://www.ama-assn.org/"},
          {"title": "LinkedIn Medical Professionals Group", "url": "https://www.linkedin.com/groups/74296/"}
        ]
      },
      "Insights": "Careers in medicine require extensive education and training, offering various specializations and high job stability."
    },
    "Nursing": {
      "Opportunities and Roles": ["Registered Nurse", "Nurse Practitioner", "Clinical Nurse Specialist"],
      "Resources": {
        "Educational Resources": [
          {"title": "Nursing.org's Nursing Programs", "url": "https://www.nursing.org/"},
          {"title": "Coursera's Nursing Specialization", "url": "https://www.coursera.org/search?query=nursing&topic=Health&sortBy=BEST_MATCH"}
        ],
        "Online Courses": [
          {"title": "Udemy's Nursing Essentials Course", "url": "https://www.udemy.com/course/nursing-essentials/"},
          {"title": "edX's Nursing Professional Development", "url": "https://www.edx.org/learn/nursing"}
        ],
        "Industry Blogs": [
          {"title": "Nurse.org", "url": "https://nurse.org/"},
          {"title": "American Nurse Today", "url": "https://www.myamericannurse.com/"}
        ],
        "Professional Networks": [
          {"title": "American Nurses Association", "url": "https://www.nursingworld.org/"},
          {"title": "LinkedIn Nursing Group", "url": "https://www.linkedin.com/groups/85582/"}
        ]
      },
      "Insights": "Nursing offers diverse roles in patient care, with opportunities for specialization and advancement."
    },
    "Public Health": {
      "Opportunities and Roles": ["Public Health Analyst", "Epidemiologist", "Health Educator"],
      "Resources": {
        "Educational Resources": [
          {"title": "Coursera's Public Health Specialization", "url": "https://www.coursera.org/search?query=public%20health"},
          {"title": "edX's Public Health Programs", "url": "https://www.edx.org/learn/public-health"}
        ],
        "Online Courses": [
          {"title": "Udemy's Introduction to Public Health Course", "url": "https://www.udemy.com/course/introduction-to-public-health/"},
          {"title": "LinkedIn Learning's Health & Wellness Courses", "url": "https://www.linkedin.com/learning/search?keywords=health%20and%20wellness"}
        ],
        "Industry Blogs": [
          {"title": "Public Health Insights", "url": "https://thepublichealthinsight.com/"},
          {"title": "The American Public Health Association", "url": "https://www.apha.org/"}
        ],
        "Professional Networks": [
          {"title": "American Public Health Association", "url": "https://www.apha.org/"},
          {"title": "LinkedIn Public Health Group", "url": "https://www.linkedin.com/groups/2305824/"}
        ]
      },
      "Insights": "Public health focuses on improving community health and preventing disease."
    },
    "Medical Research": {
      "Opportunities and Roles": ["Medical Researcher", "Clinical Research Coordinator", "Biomedical Scientist"],
      "Resources": {
        "Educational Resources": [
          {"title": "PubMed", "url": "https://pubmed.ncbi.nlm.nih.gov/"},
          {"title": "Coursera's Medical Research Courses", "url": "https://www.coursera.org/courses?query=medical%20research"}
        ],
        "Online Courses": [
          {"title": "Udemy's Medical Research Course", "url": "https://www.udemy.com/courses/search/?q=medical+research&src=sac&kw=medical+re"},
          {"title": "LinkedIn Learning's Medical Research Courses", "url": "https://www.linkedin.com/learning/search?keywords=medical%20research"}
        ],
        "Industry Blogs": [
          {"title": "Nature Reviews Drug Discovery", "url": "https://www.nature.com/nrd/"},
          {"title": "Science Daily Medical Research", "url": "https://www.sciencedaily.com/news/health_medicine/medical_research/"}
        ],
        "Professional Networks": [
          {"title": "American Association for the Advancement of Science", "url": "https://www.aaas.org/"},
          {"title": "LinkedIn Medical Research Group", "url": "https://www.linkedin.com/groups/124401/"}
        ]
      },
      "Insights": "Medical research involves studying diseases and developing treatments, advancing medical knowledge and improving health outcomes."
    }
  },
  "Engineering": {
    "Mechanical Engineering": {
      "Opportunities and Roles": [
        "Mechanical Engineer",
        "Design Engineer",
        "Manufacturing Engineer"
      ],
      "Resources": {
        "Educational Resources": [
          {
            "title": "MIT OpenCourseWare Mechanical Engineering",
            "url": "https://ocw.mit.edu/courses/mechanical-engineering/"
          },
          {
            "title": "Coursera's Mechanical Engineering Courses",
            "url": "https://www.coursera.org/search?query=mechanical%20engineering"
          }
        ],
        "Online Courses": [
          {
            "title": "Udemy's Mechanical Engineering Course",
            "url": "https://www.udemy.com/course/mechanical-engineering/"
          },
          {
            "title": "edX's Introduction to Mechanical Engineering",
            "url": "https://www.edx.org/course/introduction-to-mechanical-engineering"
          }
        ],
        "Industry Blogs": [
          {
            "title": "Mechanical Engineering Magazine",
            "url": "https://www.asme.org/publications/mechanical-engineering-magazine"
          },
          {
            "title": "Engineering.com",
            "url": "https://www.engineering.com/"
          }
        ],
        "Professional Networks": [
          {
            "title": "ASME",
            "url": "https://www.asme.org/"
          },
          {
            "title": "LinkedIn Mechanical Engineering Group",
            "url": "https://www.linkedin.com/groups/86755/"
          }
        ]
      },
      "Insights": "Mechanical engineering is crucial in sectors like manufacturing, automotive, and aerospace."
    },
    "Civil Engineering": {
      "Opportunities and Roles": [
        "Civil Engineer",
        "Structural Engineer",
        "Urban Planner"
      ],
      "Resources": {
        "Educational Resources": [
          {
            "title": "American Society of Civil Engineers (ASCE)",
            "url": "https://www.asce.org/"
          },
          {
            "title": "Coursera's Civil Engineering Courses",
            "url": "https://www.coursera.org/search?query=civil%20engineering"
          }
        ],
        "Online Courses": [
          {
            "title": "Udemy's Civil Engineering Course",
            "url": "https://www.udemy.com/course/civil-engineering/"
          },
          {
            "title": "edX's Introduction to Civil Engineering",
            "url": "https://www.edx.org/course/introduction-to-civil-engineering"
          }
        ],
        "Industry Blogs": [
          {
            "title": "Civil Engineering Magazine",
            "url": "https://www.asce.org/publications/civil-engineering-magazine"
          },
          {
            "title": "Civil Engineering Portal",
            "url": "https://www.engineeringcivil.com/"
          }
        ],
        "Professional Networks": [
          {
            "title": "ASCE",
            "url": "https://www.asce.org/"
          },
          {
            "title": "LinkedIn Civil Engineering Group",
            "url": "https://www.linkedin.com/groups/85881/"
          }
        ]
      },
      "Insights": "Civil engineering focuses on infrastructure development, offering stable career opportunities."
    },
    "Electrical Engineering": {
      "Opportunities and Roles": [
        "Electrical Engineer",
        "Electronics Engineer",
        "Power Systems Engineer"
      ],
      "Resources": {
        "Educational Resources": [
          {
            "title": "IEEE Educational Resources",
            "url": "https://www.ieee.org/education/index.html"
          },
          {
            "title": "Coursera's Electrical Engineering Specialization",
            "url": "https://www.coursera.org/search?query=electrical%20engineering"
          }
        ],
        "Online Courses": [
          {
            "title": "Udemy's Electrical Engineering Course",
            "url": "https://www.udemy.com/course/electrical-engineering/"
          },
          {
            "title": "edX's Introduction to Electrical Engineering",
            "url": "https://www.edx.org/course/introduction-to-electrical-engineering"
          }
        ],
        "Industry Blogs": [
          {
            "title": "EDN Network",
            "url": "https://www.edn.com/"
          },
          {
            "title": "Electrical Engineering Times",
            "url": "https://www.eetimes.com/"
          }
        ],
        "Professional Networks": [
          {
            "title": "IEEE",
            "url": "https://www.ieee.org/"
          },
          {
            "title": "LinkedIn Electrical Engineering Group",
            "url": "https://www.linkedin.com/groups/37695/"
          }
        ]
      },
      "Insights": "Electrical engineering encompasses electrical systems and electronics, with career prospects in energy, telecommunications, and automation."
    },
    "Chemical Engineering": {
      "Opportunities and Roles": [
        "Chemical Engineer",
        "Process Engineer",
        "Biochemical Engineer"
      ],
      "Resources": {
        "Educational Resources": [
          {
            "title": "AIChE's Chemical Engineering Courses",
            "url": "https://www.aiche.org/"
          },
          {
            "title": "Coursera's Chemical Engineering Specialization",
            "url": "https://www.coursera.org/search?query=chemical%20engineering"
          }
        ],
        "Online Courses": [
          {
            "title": "Udemy's Chemical Engineering Course",
            "url": "https://www.udemy.com/course/chemical-engineering/"
          },
          {
            "title": "edX's Introduction to Chemical Engineering",
            "url": "https://www.edx.org/course/introduction-to-chemical-engineering"
          }
        ],
        "Industry Blogs": [
          {
            "title": "Chemical Engineering Magazine",
            "url": "https://www.chemengonline.com/"
          },
          {
            "title": "Chemical & Engineering News",
            "url": "https://cen.acs.org/"
          }
        ],
        "Professional Networks": [
          {
            "title": "AIChE",
            "url": "https://www.aiche.org/"
          },
          {
            "title": "LinkedIn Chemical Engineering Group",
            "url": "https://www.linkedin.com/groups/84942/"
          }
        ]
      },
      "Insights": "Chemical engineering integrates chemistry with engineering principles, offering careers in pharmaceuticals, energy, and manufacturing."
    },
    "Computer Science": {
      "Opportunities and Roles": [
        "Software Developer",
        "Data Scientist",
        "Cybersecurity Analyst"
      ],
      "Resources": {
        "Educational Resources": [
          {
            "title": "Coursera's Computer Science Courses",
            "url": "https://www.coursera.org/browse/computer-science"
          },
          {
            "title": "edX's Computer Science Programs",
            "url": "https://www.edx.org/learn/computer-science"
          }
        ],
        "Online Courses": [
          {
            "title": "Udemy's Web Development Bootcamp",
            "url": "https://www.udemy.com/course/the-web-developer-bootcamp/"
          },
          {
            "title": "LinkedIn Learning's Data Science Courses",
            "url": "https://www.linkedin.com/learning/topics/data-science"
          }
        ],
        "Industry Blogs": [
          {
            "title": "TechCrunch",
            "url": "https://techcrunch.com/"
          },
          {
            "title": "Wired",
            "url": "https://www.wired.com/"
          }
        ],
        "Professional Networks": [
          {
            "title": "GitHub",
            "url": "https://github.com/"
          },
          {
            "title": "LinkedIn Computer Science Group",
            "url": "https://www.linkedin.com/groups/6547890/"
          }
        ]
      },
      "Insights": "Computer Science offers vast opportunities in software development, data science, and cybersecurity."
    }
  },
  "Education and Teaching": {
    "Teaching": {
      "Opportunities and Roles": ["Teacher", "Education Coordinator", "Curriculum Developer"],
      "Resources": {
        "Educational Resources": [
          {"title": "Khan Academy", "url": "https://www.khanacademy.org/"},
          {"title": "Coursera's Teaching Specializations", "url": "https://www.coursera.org/search?query=teaching"}
        ],
        "Online Courses": [
          {"title": "Udemy's Teaching Course", "url": "https://www.udemy.com/topic/teaching/"},
          {"title": "LinkedIn Learning's Teaching Courses", "url": "https://www.linkedin.com/learning/topics/teaching"}
        ],
        "Industry Blogs": [
          {"title": "Edutopia", "url": "https://www.edutopia.org/"},
          {"title": "Teaching Tolerance", "url": "https://www.learningforjustice.org/"}
        ],
        "Professional Networks": [
          {"title": "National Education Association", "url": "https://www.nea.org/"},
          {"title": "LinkedIn Teaching Group", "url": "https://www.linkedin.com/groups/127842/"}
        ]
      },
      "Insights": "Teaching involves educating students and developing curriculum with a focus on student development and learning."
    },
    "Educational Administration": {
      "Opportunities and Roles": ["School Administrator", "Principal", "Education Consultant"],
      "Resources": {
        "Educational Resources": [
          {"title": "Educational Leadership Resources", "url": "https://www.educationworld.com/a_admin/admin/admin244.shtml"},
          {"title": "Coursera's Educational Leadership Courses", "url": "https://www.coursera.org/search?query=educational%20leadership"}
        ],
        "Online Courses": [
          {"title": "Udemy's Educational Administration Course", "url": "https://www.udemy.com/courses/search/?q=education+administrator&src=sac&kw=education+ad"},
          {"title": "LinkedIn Learning's Administration Courses", "url": "https://www.linkedin.com/learning/search?keywords=administration"}
        ],
        "Industry Blogs": [
          {"title": "Education Week", "url": "https://www.edweek.org/"},
          {"title": "Inside Higher Ed", "url": "https://www.insidehighered.com/"}
        ],
        "Professional Networks": [
          {"title": "Association for Supervision and Curriculum Development (ASCD)", "url": "http://www.ascd.org/"},
          {"title": "LinkedIn Educational Administration Group", "url": "https://www.linkedin.com/groups/1830897/"}
        ]
      },
      "Insights": "Educational administration focuses on managing educational institutions and programs, offering leadership roles."
    },
    "Instructional Design": {
      "Opportunities and Roles": ["Instructional Designer", "Curriculum Developer", "Learning Experience Designer"],
      "Resources": {
        "Educational Resources": [
          {"title": "Association for Talent Development", "url": "https://www.td.org/"},
          {"title": "Coursera's Instructional Design Courses", "url": "https://www.coursera.org/courses?query=instructional%20design"}
        ],
        "Online Courses": [
          {"title": "Udemy's Instructional Design Course", "url": "https://www.udemy.com/course/instructional-design-course/"},
          {"title": "LinkedIn Learning's Instructional Design Courses", "url": "https://www.linkedin.com/learning/topics/instructional-design"}
        ],
        "Industry Blogs": [
          {"title": "eLearning Industry", "url": "https://elearningindustry.com/"},
          {"title": "Instructional Design Central", "url": "https://www.instructionaldesigncentral.com/"}
        ],
        "Professional Networks": [
          {"title": "Instructional Designers and eLearning Professionals", "url": "https://instructionaldesigners.org/"},
          {"title": "LinkedIn Instructional Design Group", "url": "https://www.linkedin.com/groups/138475/"}
        ]
      },
      "Insights": "Instructional design involves creating educational materials, focusing on effective teaching methods and learner engagement."
    }
  },
  "Law and Legal Studies": {
    "Legal Practice": {
      "Opportunities and Roles": ["Lawyer", "Legal Advisor", "Paralegal"],
      "Resources": {
        "Educational Resources": [
          {"title": "Harvard Law School Online Courses", "url": "https://online.law.harvard.edu/"},
          {"title": "Coursera's Legal Studies Specialization", "url": "https://www.coursera.org/search?query=legal%20studies"}
        ],
        "Online Courses": [
          {"title": "Udemy's Legal Practice Course", "url": "https://www.udemy.com/courses/search/?src=ukw&q=law+and+legal+practice"},
          {"title": "LinkedIn Learning's Legal Studies Courses", "url": "https://www.linkedin.com/learning/search?keywords=legal%20courses"}
        ],
        "Industry Blogs": [
          {"title": "Law.com", "url": "https://www.law.com/"},
          {"title": "Legal 500", "url": "https://www.legal500.com/"}
        ],
        "Professional Networks": [
          {"title": "American Bar Association", "url": "https://www.americanbar.org/"},
          {"title": "LinkedIn Legal Group", "url": "https://www.linkedin.com/groups/121728/"}
        ]
      },
      "Insights": "Legal practice involves advising clients and representing them in legal matters, offering diverse roles in various legal settings."
    },
    "Criminal Justice": {
      "Opportunities and Roles": ["Criminal Investigator", "Forensic Analyst", "Probation Officer"],
      "Resources": {
        "Educational Resources": [
          {"title": "Coursera's Criminal Justice Courses", "url": "https://www.coursera.org/search?query=criminal%20justice"},
          {"title": "edX's Criminal Justice Programs", "url": "https://www.edx.org/search?q=criminal+justice"}
        ],
        "Online Courses": [
          {"title": "Udemy's Criminal Justice Course", "url": "https://www.udemy.com/courses/search/?q=criminal+justice&src=sac&kw=criminal+j"},
          {"title": "LinkedIn Learning's Criminal Justice Courses", "url": "https://www.linkedin.com/learning/search?keywords=criminal%20justice"}
        ],
        "Industry Blogs": [
          {"title": "Crime Report", "url": "https://thecrimereport.org/"},
          {"title": "Forensic Magazine", "url": "https://www.forensicmag.com/"}
        ],
        "Professional Networks": [
          {"title": "American Society of Criminology", "url": "https://www.asc41.com/"},
          {"title": "LinkedIn Criminal Justice Group", "url": "https://www.linkedin.com/groups/3710416/"}
        ]
      },
      "Insights": "Criminal justice careers focus on law enforcement and legal processes, offering roles in investigation, forensics, and legal support."
    },
    "Corporate Law": {
      "Opportunities and Roles": ["Corporate Lawyer", "Legal Advisor", "Compliance Officer"],
      "Resources": {
        "Educational Resources": [
          {"title": "Harvard Law School", "url": "https://www.law.harvard.edu/"},
          {"title": "Coursera's Corporate Law Courses", "url": "https://www.coursera.org/search?query=corporate%20law"}
        ],
        "Online Courses": [
          {"title": "Udemy's Corporate Law Course", "url": "https://www.udemy.com/courses/search/?q=corporate+law&src=sac&kw=corpo"},
          {"title": "LinkedIn Learning's Corporate Law Courses", "url": "https://www.linkedin.com/learning/search?keywords=corporate%20law"}
        ],
        "Industry Blogs": [
          {"title": "Corporate Law Blog", "url": "https://www.thecorporatelawblog.com/"},
          {"title": "Law360", "url": "https://www.law360.com/"}
        ],
        "Professional Networks": [
          {"title": "American Bar Association", "url": "https://www.americanbar.org/"},
          {"title": "LinkedIn Corporate Law Group", "url": "https://www.linkedin.com/groups/33099/"}
        ]
      },
      "Insights": "Corporate law involves advising businesses on legal matters, ensuring compliance, with roles in contract management, mergers, and compliance."
    },
    "Criminal Law": {
      "Opportunities and Roles": ["Criminal Defense Attorney", "Prosecutor", "Forensic Analyst"],
      "Resources": {
        "Educational Resources": [
          {"title": "National Association of Criminal Defense Lawyers", "url": "https://www.nacdl.org/"},
          {"title": "Coursera's Criminal Law Courses", "url": "https://www.coursera.org/courses?query=criminal%20law"}
        ],
        "Online Courses": [
          {"title": "Udemy's Criminal Law Course", "url": "https://www.udemy.com/courses/search/?q=criminal+law&src=sac&kw=criminal"},
          {"title": "LinkedIn Learning's Criminal Law Courses", "url": "https://www.linkedin.com/learning/search?keywords=criminal%20law"}
        ],
        "Industry Blogs": [
          {"title": "Law & Order Blog", "url": "https://www.lawandorder.com/"},
          {"title": "Criminal Law Forum", "url": "https://link.springer.com/journal/10609"}
        ]
      },
      "Insights": "Criminal law involves defending and prosecuting criminal cases, with roles in legal advocacy and forensic analysis."
    }
  },
  "Finance and Accounting": {
    "Financial Analysis": {
      "Opportunities and Roles": ["Financial Analyst", "Investment Banker", "Risk Manager"],
      "Resources": {
        "Educational Resources": [
          {"title": "CFA Institute", "url": "https://www.cfainstitute.org/"},
          {"title": "Coursera's Financial Analysis Courses", "url": "https://www.coursera.org/courses?query=financial%20analysis"}
        ],
        "Online Courses": [
          {"title": "Udemy's Financial Analysis Course", "url": "https://www.udemy.com/course/financial-analysis/"},
          {"title": "LinkedIn Learning's Finance & Accounting Courses", "url": "https://www.linkedin.com/learning/search?keywords=Finance%20and%20Accounting"}
        ],
        "Industry Blogs": [
          {"title": "Financial Times", "url": "https://www.ft.com/"},
          {"title": "Investopedia", "url": "https://www.investopedia.com/"}
        ],
        "Professional Networks": [
          {"title": "CFA Institute Network", "url": "https://www.cfainstitute.org/en/membership/professional-networks"},
          {"title": "LinkedIn Finance Group", "url": "https://www.linkedin.com/groups/91070/"}
        ]
      },
      "Insights": "Financial analysis involves evaluating financial data to guide business decisions, offering roles in investment, risk management, and corporate finance."
    },
    "Accounting": {
      "Opportunities and Roles": ["Accountant", "Auditor", "Tax Advisor"],
      "Resources": {
        "Educational Resources": [
          {"title": "AICPA", "url": "https://www.aicpa.org/"},
          {"title": "Coursera's Accounting Courses", "url": "https://www.coursera.org/courses?query=accounting"}
        ],
        "Online Courses": [
          {"title": "Udemy's Accounting Course", "url": "https://www.udemy.com/course/accounting/"},
          {"title": "LinkedIn Learning's Accounting Courses", "url": "https://www.linkedin.com/learning/topics/accounting"}
        ],
        "Industry Blogs": [
          {"title": "Accounting Today", "url": "https://www.accountingtoday.com/"},
          {"title": "The Accounting Student", "url": "https://theaccountingstudent.co.uk/"}
        ],
        "Professional Networks": [
          {"title": "American Institute of CPAs", "url": "https://www.aicpa.org/"},
          {"title": "LinkedIn Accounting Group", "url": "https://www.linkedin.com/groups/2254/"}
        ]
      },
      "Insights": "Accounting involves managing financial records and ensuring compliance, with a focus on accuracy, financial reporting, and regulatory adherence."
    },
    "Investment Banking": {
      "Opportunities and Roles": ["Investment Banker", "Mergers and Acquisitions Specialist", "Portfolio Manager"],
      "Resources": {
        "Educational Resources": [
          {"title": "Coursera's Investment Banking Courses", "url": "https://www.coursera.org/courses?query=investment%20banking"},
          {"title": "Investopedia's Investment Banking", "url": "https://www.investopedia.com/articles/professionals/022416/investment-banking-career-path-education-skills.asp"}
        ],
        "Online Courses": [
          {"title": "Udemy's Investment Banking Course", "url": "https://www.udemy.com/course/investment-banking/"},
          {"title": "LinkedIn Learning's Investment Banking Courses", "url": "https://www.linkedin.com/learning/search?keywords=investment%20banking"}
        ],
        "Industry Blogs": [
          {"title": "Wall Street Journal Finance", "url": "https://www.wsj.com/news/markets"},
          {"title": "Business Insider Finance", "url": "https://www.businessinsider.com/finance"}
        ],
        "Professional Networks": [
          {"title": "Global Association of Risk Professionals", "url": "https://www.garp.org/"},
          {"title": "LinkedIn Investment Banking Group", "url": "https://www.linkedin.com/groups/105076/"}
        ]
      },
      "Insights": "Investment banking focuses on financial transactions and capital raising, offering roles in mergers, acquisitions, and financial advisory."
    }
  },
  "Human Resources": {
    "HR Management": {
      "Opportunities and Roles": ["HR Manager", "Recruitment Specialist", "Employee Relations Manager"],
      "Resources": {
        "Educational Resources": [
          {"title": "SHRM", "url": "https://www.shrm.org/"},
          {"title": "Coursera's HR Management Courses", "url": "https://www.coursera.org/courses?query=hr%20management"}
        ],
        "Online Courses": [
          {"title": "Udemy's HR Management Course", "url": "https://www.udemy.com/course/hr-management/"},
          {"title": "LinkedIn Learning's HR Courses", "url": "https://www.linkedin.com/learning/search?keywords=hr%20courses"}
        ],
        "Industry Blogs": [
          {"title": "HR Daily Advisor", "url": "https://hrdailyadvisor.blr.com/"},
          {"title": "Human Resources Today", "url": "https://www.humanresourcestoday.com/"}
        ],
        "Professional Networks": [
          {"title": "Society for Human Resource Management", "url": "https://www.shrm.org/"},
          {"title": "LinkedIn HR Group", "url": "https://www.linkedin.com/groups/3766457/"}
        ]
      },
      "Insights": "HR management focuses on recruiting, managing, and developing employees, offering roles across various HR functions."
    },
    "Talent Acquisition": {
      "Opportunities and Roles": ["Talent Acquisition Specialist", "Recruitment Consultant", "Head of Talent Acquisition"],
      "Resources": {
        "Educational Resources": [
          {"title": "LinkedIn Talent Solutions", "url": "https://business.linkedin.com/talent-solutions"},
          {"title": "Coursera's Recruitment Courses", "url": "https://www.coursera.org/courses?query=recruitment"}
        ],
        "Online Courses": [
          {"title": "Udemy's Recruitment and Talent Acquisition Course", "url": "https://www.udemy.com/courses/search/?q=talent+acquisition&src=sac&kw=talent"},
          {"title": "LinkedIn Learning's Talent Acquisition Courses", "url": "https://www.linkedin.com/learning/search?keywords=talent%20acquisition"}
        ],
        "Industry Blogs": [
          {"title": "Recruiting Daily", "url": "https://recruitingdaily.com/"},
          {"title": "HR Technologist", "url": "https://www.hrtechnologist.com/"}
        ],
        "Professional Networks": [
          {"title": "Recruitment & Talent Acquisition Group", "url": "https://www.linkedin.com/groups/74732/"},
          {"title": "LinkedIn Talent Acquisition Group", "url": "https://www.linkedin.com/groups/8562132/"}
        ]
      },
      "Insights": "Talent acquisition focuses on attracting and hiring top talent, requiring skills in sourcing, interviewing, and onboarding."
    }
  },
  "Sales and Marketing": {
    "Digital Marketing": {
      "Opportunities and Roles": ["Digital Marketing Specialist", "SEO Expert", "Content Marketer"],
      "Resources": {
        "Educational Resources": [
          {"title": "HubSpot Academy", "url": "https://academy.hubspot.com/"},
          {"title": "Coursera's Digital Marketing Specialization", "url": "https://www.coursera.org/specializations/digital-marketing"}
        ],
        "Online Courses": [
          {"title": "Udemy's Digital Marketing Course", "url": "https://www.udemy.com/course/digital-marketing-course/"},
          {"title": "LinkedIn Learning's Digital Marketing Courses", "url": "https://www.linkedin.com/learning/topics/digital-marketing"}
        ],
        "Industry Blogs": [
          {"title": "Moz Blog", "url": "https://moz.com/blog"},
          {"title": "Neil Patel Blog", "url": "https://neilpatel.com/blog/"}
        ],
        "Professional Networks": [
          {"title": "Digital Marketing Community", "url": "https://www.digitalmarketingcommunity.com/"},
          {"title": "LinkedIn Digital Marketing Group", "url": "https://www.linkedin.com/groups/4211637/"}
        ]
      },
      "Insights": "Digital marketing involves promoting products and services online, leveraging digital platforms and data analytics."
    },
    "Sales Management": {
      "Opportunities and Roles": ["Sales Manager", "Account Executive", "Business Development Manager"],
      "Resources": {
        "Educational Resources": [
          {"title": "Salesforce Training", "url": "https://www.salesforce.com/training/"},
          {"title": "Coursera's Sales Management Courses", "url": "https://www.coursera.org/courses?query=sales%20management"}
        ],
        "Online Courses": [
          {"title": "Udemy's Sales Management Course", "url": "https://www.udemy.com/course/sales-management/"},
          {"title": "LinkedIn Learning's Sales Management Courses", "url": "https://www.linkedin.com/learning/topics/sales-management"}
        ],
        "Industry Blogs": [
          {"title": "Sales Hacker", "url": "https://www.saleshacker.com/"},
          {"title": "Salesforce Blog", "url": "https://www.salesforce.com/blog/"}
        ],
        "Professional Networks": [
          {"title": "Sales Management Association", "url": "https://salesmanagement.org/"},
          {"title": "LinkedIn Sales Management Group", "url": "https://www.linkedin.com/groups/12345/"}
        ]
      },
      "Insights": "Sales management focuses on overseeing and optimizing sales processes and teams, with a focus on growth and customer relationships."
    }
  },
  "Data Science and Analytics": {
    "Data Analysis": {
      "Opportunities and Roles": ["Data Analyst", "Business Intelligence Analyst", "Data Scientist"],
      "Resources": {
        "Educational Resources": [
          {"title": "DataCamp", "url": "https://www.datacamp.com/"},
          {"title": "Coursera's Data Science Courses", "url": "https://www.coursera.org/courses?query=data%20science"}
        ],
        "Online Courses": [
          {"title": "Udemy's Data Science Course", "url": "https://www.udemy.com/course/data-science/"},
          {"title": "LinkedIn Learning's Data Science Courses", "url": "https://www.linkedin.com/learning/topics/data-science"}
        ],
        "Industry Blogs": [
          {"title": "Towards Data Science", "url": "https://towardsdatascience.com/"},
          {"title": "KDnuggets", "url": "https://www.kdnuggets.com/"}
        ],
        "Professional Networks": [
          {"title": "Data Science Central", "url": "https://www.datasciencecentral.com/"},
          {"title": "LinkedIn Data Science Group", "url": "https://www.linkedin.com/groups/6524852/"}
        ]
      },
      "Insights": "Data analysis involves interpreting complex data to support business decisions, with roles in various industries focusing on predictive modeling."
    },
    "Machine Learning": {
      "Opportunities and Roles": ["Machine Learning Engineer", "Data Scientist", "AI Specialist"],
      "Resources": {
        "Educational Resources": [
          {"title": "DeepLearning.AI", "url": "https://www.deeplearning.ai/"},
          {"title": "Coursera's Machine Learning Specialization", "url": "https://www.coursera.org/specializations/machine-learning"}
        ],
        "Online Courses": [
          {"title": "Udemy's Machine Learning Course", "url": "https://www.udemy.com/course/machine-learning/"},
          {"title": "LinkedIn Learning's Machine Learning Courses", "url": "https://www.linkedin.com/learning/topics/machine-learning"}
        ],
        "Industry Blogs": [
          {"title": "Machine Learning Mastery", "url": "https://machinelearningmastery.com/"},
          {"title": "The AI Report", "url": "https://www.rackspace.com/solve/ai-ml-business-challenges"}
        ],
        "Professional Networks": [
          {"title": "Machine Learning Group", "url": "https://www.linkedin.com/groups/45201/"},
          {"title": "LinkedIn AI Group", "url": "https://www.linkedin.com/groups/4500025/"}
        ]
      },
      "Insights": "Machine learning focuses on developing algorithms that allow computers to learn from data, requiring skills in programming, statistics, and data analysis."
    }
  },
  "Entrepreneurship and Startups": {
    "Startup Management": {
      "Opportunities and Roles": ["Startup Founder", "Business Development Manager", "Growth Hacker"],
      "Resources": {
        "Educational Resources": [
          {"title": "Y Combinator's Startup School", "url": "https://www.startupschool.org/"},
          {"title": "Coursera's Entrepreneurship Courses", "url": "https://www.coursera.org/courses?query=entrepreneurship"}
        ],
        "Online Courses": [
          {"title": "Udemy's Startup Management Course", "url": "https://www.udemy.com/courses/search/?q=startup+management&src=sac&kw=startup+man"},
          {"title": "LinkedIn Learning's Entrepreneurship Courses", "url": "https://www.linkedin.com/learning/topics/entrepreneurship"}
        ],
        "Industry Blogs": [
          {"title": "TechCrunch", "url": "https://techcrunch.com/"},
          {"title": "Entrepreneur", "url": "https://www.entrepreneur.com/"}
        ],
        "Professional Networks": [
          {"title": "Startup Grind", "url": "https://www.startupgrind.com/"},
          {"title": "LinkedIn Startups Group", "url": "https://www.linkedin.com/groups/1128817/"}
        ]
      },
      "Insights": "Startup management involves launching and scaling new ventures, requiring an entrepreneurial mindset and adaptability."
    },
    "Business Development": {
      "Opportunities and Roles": ["Business Development Manager", "Sales Strategist", "Market Research Analyst"],
      "Resources": {
        "Educational Resources": [
          {"title": "Harvard Business School Online", "url": "https://online.hbs.edu/"},
          {"title": "Coursera's Business Development Courses", "url": "https://www.coursera.org/courses?query=business%20development"}
        ],
        "Online Courses": [
          {"title": "Udemy's Business Development Course", "url": "https://www.udemy.com/course/business-development/"},
          {"title": "LinkedIn Learning's Business Development Courses", "url": "https://www.linkedin.com/learning/search?keywords=business%20development"}
        ],
        "Industry Blogs": [
          {"title": "Forbes Business Development", "url": "https://www.forbes.com/business-development/"},
          {"title": "Business Insider", "url": "https://www.businessinsider.com/"}
        ],
        "Professional Networks": [
          {"title": "Business Development Group", "url": "https://www.linkedin.com/groups/128812/"},
          {"title": "LinkedIn Business Development Group", "url": "https://www.linkedin.com/groups/4245274/"}
        ]
      },
      "Insights": "Business development focuses on creating growth opportunities, requiring skills in strategic planning and market analysis."
    }
  },
  "Creative Arts": {
    "Graphic Design": {
      "Opportunities and Roles": ["Graphic Designer", "Visual Artist", "Brand Designer"],
      "Resources": {
        "Educational Resources": [
          {"title": "Adobe Creative Cloud Tutorials", "url": "https://helpx.adobe.com/creative-cloud/tutorials-explore.html"},
          {"title": "Coursera's Graphic Design Specialization", "url": "https://www.coursera.org/specializations/graphic-design"}
        ],
        "Online Courses": [
          {"title": "Udemy's Graphic Design Course", "url": "https://www.udemy.com/course/graphic-design/"},
          {"title": "LinkedIn Learning's Graphic Design Courses", "url": "https://www.linkedin.com/learning/topics/graphic-design"}
        ],
        "Industry Blogs": [
          {"title": "Smashing Magazine", "url": "https://www.smashingmagazine.com/"},
          {"title": "Design Shack", "url": "https://designshack.net/"}
        ],
        "Professional Networks": [
          {"title": "AIGA", "url": "https://www.aiga.org/"},
          {"title": "LinkedIn Graphic Design Group", "url": "https://www.linkedin.com/groups/1846695/"}
        ]
      },
      "Insights": "Graphic design involves creating visual content, with roles in branding, advertising, and multimedia design."
    },
    "Fine Arts": {
      "Opportunities and Roles": ["Fine Artist", "Art Curator", "Art Instructor"],
      "Resources": {
        "Educational Resources": [
          {"title": "MoMA's Art Courses", "url": "https://www.moma.org/research-and-learning/courses"},
          {"title": "Coursera's Fine Arts Courses", "url": "https://www.coursera.org/courses?query=fine%20arts"}
        ],
        "Online Courses": [
          {"title": "Udemy's Fine Arts Course", "url": "https://www.udemy.com/courses/search/?q=fine+arts&src=sac&kw=fine"},
          {"title": "LinkedIn Learning's Fine Arts Courses", "url": "https://www.linkedin.com/learning/search?keywords=fine%20arts%20"}
        ],
        "Industry Blogs": [
          {"title": "ArtNet News", "url": "https://news.artnet.com/"},
          {"title": "The Art Newspaper", "url": "https://www.theartnewspaper.com/"}
        ],
        "Professional Networks": [
          {"title": "College Art Association", "url": "https://www.collegeart.org/"},
          {"title": "LinkedIn Fine Arts Group", "url": "https://www.linkedin.com/groups/1865922/"}
        ]
      },
      "Insights": "Fine arts focus on creating and appreciating art forms, offering opportunities in personal expression and cultural impact."
    }
  },
  "Government and Public Administration": {
    "Policy Making": {
      "Opportunities and Roles": ["Policy Analyst", "Legislative Assistant", "Researcher"],
      "Resources": {
        "Educational Resources": [
          {"title": "Harvard Kennedy School's Public Policy Courses", "url": "https://www.hks.harvard.edu/" },
          {"title": "JNU's School of Public Policy", "url": "https://www.jnu.ac.in/schoolofpublicpolicy"}
        ],
        "Online Courses": [
          {"title": "Coursera's Policy Design and Implementation", "url": "https://www.coursera.org/courses?query=policy%20design"},
          {"title": "edX's Public Policy Essentials", "url": "https://www.edx.org/course/public-policy"}
        ],
        "Industry Blogs": [
          {"title": "The Brookings Institution", "url": "https://www.brookings.edu/"},
          {"title": "The Policy Times", "url": "https://policytimeschamber.com/"}
        ],
        "Professional Networks": [
          {"title": "LinkedIn Groups: Public Policy Professionals", "url": "https://www.linkedin.com/groups/4650532/"},
          {"title": "American Society for Public Administration", "url": "https://www.aspanet.org/"}
        ]
      },
      "Insights": "Policy making shapes government decisions and strategies, offering roles that influence public welfare and societal progress."
    },
    "Public Administration": {
      "Opportunities and Roles": ["Public Administrator", "City Manager", "Municipal Clerk"],
      "Resources": {
        "Educational Resources": [
          {"title": "Indian Institute of Public Administration (IIPA)", "url": "https://www.iipa.org.in/"},
          {"title": "MPA Programs by University of London", "url": "https://www.lse.ac.uk/study-at-lse/Graduate/degree-programmes-2024/Master-of-Public-Administration"}
        ],
        "Online Courses": [
          {"title": "Coursera's Public Administration for Public Sector Managers", "url": "https://www.coursera.org/courses?query=public%20administration"},
          {"title": "edX's Governance for Nonprofits", "url": "https://www.edx.org/course/nonprofit-governance"}
        ],
        "Industry Blogs": [
          {"title": "GovLoop", "url": "https://www.govloop.com/"},
          {"title": "Public Administration Review", "url": "https://onlinelibrary.wiley.com/journal/15406210"}
        ],
        "Professional Networks": [
          {"title": "International City/County Management Association (ICMA)", "url": "https://icma.org/"},
          {"title": "National Academy of Public Administration", "url": "https://napawash.org/"}
        ]
      },
      "Insights": "Public administration offers stable career paths in governance and community service, with growth opportunities in leadership positions."
    },
    "Civil Services": {
      "Opportunities and Roles": ["IAS Officer", "IPS Officer", "IRS Officer"],
      "Resources": {
        "Educational Resources": [
          {"title": "UPSC Official Resources", "url": "https://www.upsc.gov.in/"},
          {"title": "Chanakya IAS Academy", "url": "https://www.chanakyaiasacademy.com/"}
        ],
        "Online Courses": [
          {"title": "BYJU's IAS Prep Courses", "url": "https://byjus.com/upsc/"},
          {"title": "Unacademy Civil Services Preparation", "url": "https://unacademy.com/goal/upsc-civil-services-examination-ias-preparation/KSCGY"}
        ],
        "Industry Blogs": [
          {"title": "Insights on India", "url": "https://www.insightsonindia.com/"},
          {"title": "ClearIAS", "url": "https://www.clearias.com/"}
        ],
        "Professional Networks": [
          {"title": "LinkedIn Groups: IAS Preparation", "url": "https://www.linkedin.com/groups/8947632/"},
          {"title": "IAS Network", "url": "https://www.linkedin.com/groups/691852/"}
        ]
      },
      "Insights": "Civil services offer an esteemed career path with significant influence on national policy and public welfare, requiring competitive examinations."
    },
    "Urban Planning": {
      "Opportunities and Roles": ["Urban Planner", "City Planner", "Zoning Inspector"],
      "Resources": {
        "Educational Resources": [
          {"title": "School of Planning and Architecture, Delhi", "url": "http://spa.ac.in/"},
          {"title": "MIT Urban Studies and Planning", "url": "https://dusp.mit.edu/"}
        ],
        "Online Courses": [
          {"title": "Coursera's Introduction to Urban Planning", "url": "https://www.coursera.org/courses?query=urban%20planning"},
          {"title": "edX's Future Cities", "url": "https://www.edx.org/course/future-cities"}
        ],
        "Industry Blogs": [
          {"title": "Planetizen", "url": "https://www.planetizen.com/"},
          {"title": "The Urbanist", "url": "https://www.theurbanist.org/"}
        ],
        "Professional Networks": [
          {"title": "American Planning Association (APA)", "url": "https://www.planning.org/"},
          {"title": "Indian Society of Landscape Architects (ISOLA)", "url": "https://www.isola.org.in/"}
        ]
      },
      "Insights": "Urban planning focuses on developing sustainable cities and communities, offering roles to improve quality of life through strategic planning."
    },
    "International Relations": {
      "Opportunities and Roles": ["Diplomat", "International Relations Specialist", "Foreign Service Officer"],
      "Resources": {
        "Educational Resources": [
          {"title": "JNU School of International Studies", "url": "https://www.jnu.ac.in/sis"},
          {"title": "The Fletcher School at Tufts University", "url": "https://fletcher.tufts.edu/"}
        ],
        "Online Courses": [
          {"title": "Coursera's International Relations Theory", "url": "https://www.coursera.org/courses?query=international%20relations"},
          {"title": "edX's International Law", "url": "https://www.edx.org/course/international-law"}
        ],
        "Industry Blogs": [
          {"title": "Council on Foreign Relations", "url": "https://www.cfr.org/"},
          {"title": "Foreign Policy", "url": "https://foreignpolicy.com/"}
        ],
        "Professional Networks": [
          {"title": "United Nations Association of India (UNAI)", "url": "https://unaindia.org/"},
          {"title": "International Studies Association (ISA)", "url": "https://www.isanet.org/"}
        ]
      },
      "Insights": "International relations professionals play a critical role in shaping global policies and fostering diplomatic relationships."
    }
  }
};

export const CareerOptions = () => {
  const [activeFilter, setActiveFilter] = useState<string>("");
  const [customCareers, setCustomCareers] = useState<CustomCareer[]>([]);
  const [categories, setCategories] = useState<CareerCategory[]>([]);
  const carouselRef = useRef(null);

  // Default careers
  const defaultCareers: Career[] = [
    {
      id: "software-developer",
      title: "Software Developer",
      teaser: "Design digital experiences",
      icon: <Code size={30} />,
      industry: "Technology",
      color: "#D3E4FD",
      salary: "₹5-25 LPA"
    },
    {
      id: "fashion-designer",
      title: "Fashion Designer",
      teaser: "Create trends that inspire",
      icon: <Palette size={30} />,
      industry: "Design",
      color: "#FFDEE2",
      salary: "₹3-15 LPA"
    },
    {
      id: "psychologist",
      title: "Psychologist",
      teaser: "Shape minds and futures",
      icon: <Brain size={30} />,
      industry: "Health and Medicine",
      color: "#E5DEFF",
      salary: "₹4-12 LPA"
    },
    {
      id: "hr-manager",
      title: "HR Manager",
      teaser: "Build strong organizations",
      icon: <Users size={30} />,
      industry: "Human Resources",
      color: "#FDE1D3",
      salary: "₹6-18 LPA"
    },
    {
      id: "teacher",
      title: "Teacher",
      teaser: "Inspire the next generation",
      icon: <GraduationCap size={30} />,
      industry: "Education and Teaching",
      color: "#F2FCE2",
      salary: "₹3-12 LPA"
    },
    {
      id: "financial-analyst",
      title: "Financial Analyst",
      teaser: "Shape economic futures",
      icon: <Briefcase size={30} />,
      industry: "Finance and Accounting",
      color: "#FEF7CD",
      salary: "₹7-20 LPA"
    }
  ];

  // Convert hardcoded careers to career format
  const hardcodedCareersList: Career[] = [];
  Object.entries(hardcodedCareers).forEach(([parentCategory, subcategories]) => {
    Object.entries(subcategories).forEach(([subCategoryName, data]) => {
      const industryMapping: { [key: string]: string } = {
        "Technology": "Technology",
        "Business": "Business", 
        "Arts and Humanities": "Arts and Humanities",
        "Health and Medicine": "Health and Medicine",
        "Engineering": "Engineering",
        "Education and Teaching": "Education and Teaching",
        "Law and Legal Studies": "Law and Legal Studies",
        "Finance and Accounting": "Finance and Accounting",
        "Human Resources": "Human Resources",
        "Sales and Marketing": "Sales and Marketing",
        "Data Science and Analytics": "Data Science and Analytics",
        "Entrepreneurship and Startups": "Entrepreneurship and Startups",
        "Creative Arts": "Creative Arts",
        "Government and Public Administration": "Government and Public Administration"
      };
      
      const colorMapping: { [key: string]: string } = {
        "Technology": "#D3E4FD",
        "Business": "#FDE1D3",
        "Arts and Humanities": "#E5DEFF",
        "Health and Medicine": "#F2FCE2",
        "Engineering": "#E8F5E8",
        "Education and Teaching": "#FEF7CD",
        "Law and Legal Studies": "#FFE4E1",
        "Finance and Accounting": "#E0F2FE",
        "Human Resources": "#F0F4FF",
        "Sales and Marketing": "#FFF2E8",
        "Data Science and Analytics": "#F0FDF4",
        "Entrepreneurship and Startups": "#FEFCE8",
        "Creative Arts": "#FAF5FF",
        "Government and Public Administration": "#F8FAFC"
      };
      
      hardcodedCareersList.push({
        id: `hardcoded-${parentCategory.toLowerCase().replace(/\s+/g, '-')}-${subCategoryName.toLowerCase().replace(/\s+/g, '-')}`,
        title: subCategoryName,
        teaser: data["Opportunities and Roles"][0] || "Explore opportunities",
        icon: <Briefcase size={30} />,
        industry: industryMapping[parentCategory] || "Other",
        color: colorMapping[parentCategory] || "#D3E4FD",
        salary: "Competitive",
        description: data.Insights
      });
    });
  });

  // Load custom careers and categories from localStorage with real-time updates
  useEffect(() => {
    const loadData = () => {
      const storedCareers = localStorage.getItem("customCareers");
      if (storedCareers) {
        setCustomCareers(JSON.parse(storedCareers));
      }

      const storedCategories = localStorage.getItem("careerCategories");
      if (storedCategories) {
        setCategories(JSON.parse(storedCategories));
      }
    };

    loadData();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "careerCategories" || e.key === "customCareers") {
        loadData();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    
    const handleCustomUpdate = () => {
      loadData();
    };
    
    window.addEventListener("categoriesUpdated", handleCustomUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("categoriesUpdated", handleCustomUpdate);
    };
  }, []);

  const excludedCategories = ["xyz", "adf", "Arts and Humanities"];
  const categoriesWithoutParent = categories.filter(cat => 
    (!cat.parentCategory || cat.parentCategory.trim() === "") &&
    !excludedCategories.includes(cat.name)
  );

  const categoryToCareers = (categoryList: CareerCategory[]) => categoryList.map(category => ({
    id: category.id,
    title: category.name,
    teaser: (category.opportunities && category.opportunities.length > 0) 
      ? category.opportunities[0] 
      : "Explore opportunities",
    icon: <Briefcase size={30} />,
    industry: "Technology",
    color: "#D3E4FD",
    salary: "Competitive",
    categoryData: category
  }));

  const allCareers = [
    ...defaultCareers,
    ...customCareers.map(career => ({
      ...career,
      icon: <Briefcase size={30} />
    })),
    ...categoryToCareers(categoriesWithoutParent),
    ...hardcodedCareersList
  ];

  const industries = Array.from(new Set(allCareers.map(career => career.industry)));
  
  const filteredCareers = allCareers.filter(career => {
    return !activeFilter || career.industry === activeFilter;
  });

  // Determine if a career is custom or category
  const isCustomCareer = (careerId: string) => {
    return careerId.startsWith('custom-');
  };

  const isCategoryCareer = (careerId: string) => {
    return careerId.startsWith('category-');
  };

  const isHardcodedCareer = (careerId: string) => {
    return careerId.startsWith('hardcoded-');
  };

  const getCareerLink = (career: any) => {
    if (isCustomCareer(career.id)) {
      return `/careers/custom/${career.id}`;
    } else if (isCategoryCareer(career.id)) {
      return `/careers/category/${career.id}`;
    } else if (isHardcodedCareer(career.id)) {
      return `/careers/hardcoded/${career.id}`;
    } else {
      return `/careers/${career.id}`;
    }
  };

  return (
    <section className="career-options-section section-spacing">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-3xl md:text-4xl font-bold text-center mb-6">
          Explore Career Options in India
        </h2>
        
        <p className="text-center text-lg mb-10 max-w-2xl mx-auto">
          Discover diverse career paths tailored for the Indian job market and find guidance to achieve your professional goals.
        </p>

        <div className="original-careers-section">
          <div className="filter-chips-container">
            <button 
              className={`filter-chip ${activeFilter === "" ? "active" : ""}`}
              onClick={() => setActiveFilter("")}
            >
              All
            </button>
            {industries.map(industry => (
              <button 
                key={industry}
                className={`filter-chip ${activeFilter === industry ? "active" : ""}`}
                onClick={() => setActiveFilter(industry)}
              >
                {industry}
              </button>
            ))}
          </div>
          
          <div className="carousel-container">
            <Carousel
              ref={carouselRef}
              className="w-full"
              opts={{
                align: "center",
                loop: true,
              }}
            >
              <CarouselContent>
                <AnimatePresence>
                  {filteredCareers.map((career) => (
                    <CarouselItem key={career.id} className="md:basis-1/2 lg:basis-1/3">
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="career-card-container"
                      >
                        <div 
                          className="career-card" 
                          style={{ backgroundColor: career.color }}
                        >
                          <div className="career-icon-container">
                            {career.icon}
                          </div>
                          <h3 className="career-title">{career.title}</h3>
                          <p className="career-teaser">{career.teaser}</p>
                          <div className="career-overlay">
                            <div className="career-salary">{career.salary}</div>
                            <Link to={getCareerLink(career)}>
                              <Button variant="outline" className="view-details-btn">
                                View Details
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    </CarouselItem>
                  ))}
                </AnimatePresence>
              </CarouselContent>
              <CarouselPrevious className="career-nav-button prev" />
              <CarouselNext className="career-nav-button next" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export { hardcodedCareers };
