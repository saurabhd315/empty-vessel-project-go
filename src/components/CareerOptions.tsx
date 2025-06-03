
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
      industry: "Business",
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
      industry: "Finance",
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
        "Arts and Humanities": "Arts",
        "Health and Medicine": "Health and Medicine",
        "Engineering": "Engineering",
        "Education and Teaching": "Education and Teaching"
      };
      
      const colorMapping: { [key: string]: string } = {
        "Technology": "#D3E4FD",
        "Business": "#FDE1D3",
        "Arts and Humanities": "#E5DEFF",
        "Health and Medicine": "#F2FCE2",
        "Engineering": "#E8F5E8",
        "Education and Teaching": "#FEF7CD"
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
