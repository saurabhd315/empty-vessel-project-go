import { useState, useEffect } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import "./CareerOptions.css";

export const hardcodedCareers = {
  "Technology": {
    "Software Development": {
      "Opportunities and Roles": ["Software Engineer", "Web Developer", "Mobile App Developer"],
      "Resources": {
        "Educational Resources": [
          {"title": "freeCodeCamp", "url": "https://www.freecodecamp.org/"},
          {"title": "Codecademy", "url": "https://www.codecademy.com/"}
        ],
        "Online Courses": [
          {"title": "Coursera's Programming Courses", "url": "https://www.coursera.org/courses?query=programming"},
          {"title": "Udemy's Web Development Course", "url": "https://www.udemy.com/course/the-web-developer-bootcamp/"}
        ],
        "Industry Blogs": [
          {"title": "Stack Overflow Blog", "url": "https://stackoverflow.blog/"},
          {"title": "Dev.to", "url": "https://dev.to/"}
        ],
        "Professional Networks": [
          {"title": "GitHub Community", "url": "https://github.com/community"},
          {"title": "LinkedIn Developer Groups", "url": "https://www.linkedin.com/groups/"}
        ]
      },
      "Insights": "Software development is one of the fastest-growing fields with excellent career prospects and remote work opportunities."
    },
    "Data Science": {
      "Opportunities and Roles": ["Data Scientist", "Data Analyst", "Machine Learning Engineer"],
      "Resources": {
        "Educational Resources": [
          {"title": "Kaggle Learn", "url": "https://www.kaggle.com/learn"},
          {"title": "DataCamp", "url": "https://www.datacamp.com/"}
        ],
        "Online Courses": [
          {"title": "Coursera's Data Science Specialization", "url": "https://www.coursera.org/specializations/jhu-data-science"},
          {"title": "edX MIT Introduction to Computer Science", "url": "https://www.edx.org/course/introduction-computer-science-mitx-6-00-1x-10"}
        ],
        "Industry Blogs": [
          {"title": "Towards Data Science", "url": "https://towardsdatascience.com/"},
          {"title": "KDnuggets", "url": "https://www.kdnuggets.com/"}
        ],
        "Professional Networks": [
          {"title": "Data Science Central", "url": "https://www.datasciencecentral.com/"},
          {"title": "LinkedIn Data Science Groups", "url": "https://www.linkedin.com/groups/"}
        ]
      },
      "Insights": "Data science combines statistics, programming, and domain expertise to extract insights from data."
    },
    "Artificial Intelligence": {
      "Opportunities and Roles": ["AI Engineer", "Machine Learning Specialist", "AI Researcher"],
      "Resources": {
        "Educational Resources": [
          {"title": "MIT OpenCourseWare AI", "url": "https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/"},
          {"title": "Stanford AI Course", "url": "https://ai.stanford.edu/courses/"}
        ],
        "Online Courses": [
          {"title": "Coursera's AI for Everyone", "url": "https://www.coursera.org/learn/ai-for-everyone"},
          {"title": "Fast.ai Practical Deep Learning", "url": "https://www.fast.ai/"}
        ],
        "Industry Blogs": [
          {"title": "OpenAI Blog", "url": "https://openai.com/blog/"},
          {"title": "Google AI Blog", "url": "https://ai.googleblog.com/"}
        ],
        "Professional Networks": [
          {"title": "AI/ML LinkedIn Groups", "url": "https://www.linkedin.com/groups/"},
          {"title": "Association for the Advancement of Artificial Intelligence", "url": "https://www.aaai.org/"}
        ]
      },
      "Insights": "AI is revolutionizing industries and creating new career opportunities in automation and intelligent systems."
    }
  },
  "Healthcare": {
    "Medicine": {
      "Opportunities and Roles": ["Doctor", "Surgeon", "Medical Researcher"],
      "Resources": {
        "Educational Resources": [
          {"title": "All India Institute of Medical Sciences (AIIMS)", "url": "https://www.aiims.edu/"},
          {"title": "National Medical Commission", "url": "https://www.nmc.org.in/"}
        ],
        "Online Courses": [
          {"title": "Coursera's Medical Courses", "url": "https://www.coursera.org/browse/health"},
          {"title": "edX Harvard Medical School Courses", "url": "https://www.edx.org/school/harvardx"}
        ],
        "Industry Blogs": [
          {"title": "The Lancet", "url": "https://www.thelancet.com/"},
          {"title": "New England Journal of Medicine", "url": "https://www.nejm.org/"}
        ],
        "Professional Networks": [
          {"title": "Indian Medical Association", "url": "https://www.ima-india.org/"},
          {"title": "World Medical Association", "url": "https://www.wma.net/"}
        ]
      },
      "Insights": "Medicine offers the opportunity to directly impact lives and contribute to healthcare advancement."
    },
    "Nursing": {
      "Opportunities and Roles": ["Registered Nurse", "Nurse Practitioner", "Clinical Specialist"],
      "Resources": {
        "Educational Resources": [
          {"title": "Indian Nursing Council", "url": "https://indiannursingcouncil.org/"},
          {"title": "All India Institute of Medical Sciences Nursing", "url": "https://www.aiims.edu/"}
        ],
        "Online Courses": [
          {"title": "Coursera's Nursing Courses", "url": "https://www.coursera.org/browse/health/nursing"},
          {"title": "edX Nursing Essentials", "url": "https://www.edx.org/course/nursing"}
        ],
        "Industry Blogs": [
          {"title": "American Journal of Nursing", "url": "https://journals.lww.com/ajnonline/"},
          {"title": "Nursing Times", "url": "https://www.nursingtimes.net/"}
        ],
        "Professional Networks": [
          {"title": "Trained Nurses Association of India", "url": "https://www.tnai.org/"},
          {"title": "International Council of Nurses", "url": "https://www.icn.ch/"}
        ]
      },
      "Insights": "Nursing is a vital healthcare profession focused on patient care and health promotion."
    }
  },
  "Business": {
    "Management": {
      "Opportunities and Roles": ["Manager", "Team Lead", "Project Manager"],
      "Resources": {
        "Educational Resources": [
          {"title": "Indian Institutes of Management (IIM)", "url": "https://www.iimcat.ac.in/"},
          {"title": "Harvard Business School Online", "url": "https://online.hbs.edu/"}
        ],
        "Online Courses": [
          {"title": "Coursera's Management Courses", "url": "https://www.coursera.org/browse/business/management-and-leadership"},
          {"title": "edX MIT Management", "url": "https://www.edx.org/school/mitx"}
        ],
        "Industry Blogs": [
          {"title": "Harvard Business Review", "url": "https://hbr.org/"},
          {"title": "McKinsey Insights", "url": "https://www.mckinsey.com/insights"}
        ],
        "Professional Networks": [
          {"title": "Project Management Institute", "url": "https://www.pmi.org/"},
          {"title": "LinkedIn Management Groups", "url": "https://www.linkedin.com/groups/"}
        ]
      },
      "Insights": "Management roles involve leading teams and driving organizational success across various industries."
    },
    "Consulting": {
      "Opportunities and Roles": ["Business Consultant", "Strategy Consultant", "Management Consultant"],
      "Resources": {
        "Educational Resources": [
          {"title": "Case Interview Preparation", "url": "https://www.preplounge.com/"},
          {"title": "McKinsey Insights", "url": "https://www.mckinsey.com/insights"}
        ],
        "Online Courses": [
          {"title": "Coursera's Consulting Courses", "url": "https://www.coursera.org/browse/business/business-strategy"},
          {"title": "edX Strategy Courses", "url": "https://www.edx.org/course/strategy"}
        ],
        "Industry Blogs": [
          {"title": "BCG Insights", "url": "https://www.bcg.com/insights"},
          {"title": "Bain Insights", "url": "https://www.bain.com/insights/"}
        ],
        "Professional Networks": [
          {"title": "Management Consultancies Association", "url": "https://www.mca.org.uk/"},
          {"title": "LinkedIn Consulting Groups", "url": "https://www.linkedin.com/groups/"}
        ]
      },
      "Insights": "Consulting offers diverse problem-solving opportunities across industries with high growth potential."
    }
  },
  "Engineering": {
    "Civil Engineering": {
      "Opportunities and Roles": ["Civil Engineer", "Structural Engineer", "Project Manager"],
      "Resources": {
        "Educational Resources": [
          {"title": "Indian Institute of Technology (IIT)", "url": "https://www.iit.ac.in/"},
          {"title": "American Society of Civil Engineers", "url": "https://www.asce.org/"}
        ],
        "Online Courses": [
          {"title": "Coursera's Civil Engineering Courses", "url": "https://www.coursera.org/browse/physical-science-and-engineering/civil-engineering"},
          {"title": "edX Structural Engineering", "url": "https://www.edx.org/course/structural-engineering"}
        ],
        "Industry Blogs": [
          {"title": "Civil Engineering Portal", "url": "https://www.engineeringcivil.com/"},
          {"title": "ASCE News", "url": "https://www.asce.org/news/"}
        ],
        "Professional Networks": [
          {"title": "Institution of Civil Engineers India", "url": "https://www.ice.org.uk/"},
          {"title": "Indian Society for Technical Education", "url": "https://www.iste.ac.in/"}
        ]
      },
      "Insights": "Civil engineering involves designing and constructing infrastructure that shapes our society."
    },
    "Mechanical Engineering": {
      "Opportunities and Roles": ["Mechanical Engineer", "Design Engineer", "Manufacturing Engineer"],
      "Resources": {
        "Educational Resources": [
          {"title": "American Society of Mechanical Engineers", "url": "https://www.asme.org/"},
          {"title": "Institution of Mechanical Engineers", "url": "https://www.imeche.org/"}
        ],
        "Online Courses": [
          {"title": "Coursera's Mechanical Engineering", "url": "https://www.coursera.org/browse/physical-science-and-engineering/mechanical-engineering"},
          {"title": "edX Manufacturing Courses", "url": "https://www.edx.org/course/manufacturing"}
        ],
        "Industry Blogs": [
          {"title": "Machine Design", "url": "https://www.machinedesign.com/"},
          {"title": "Mechanical Engineering Magazine", "url": "https://www.asme.org/topics-resources/content/mechanical-engineering-magazine"}
        ],
        "Professional Networks": [
          {"title": "ASME Professional Networks", "url": "https://www.asme.org/"},
          {"title": "LinkedIn Mechanical Engineering Groups", "url": "https://www.linkedin.com/groups/"}
        ]
      },
      "Insights": "Mechanical engineering covers a broad range of applications from automotive to aerospace industries."
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
        ],
        "Professional Networks": [
          {"title": "National Association of Criminal Defense Lawyers", "url": "https://www.nacdl.org/"},
          {"title": "LinkedIn Criminal Law Group", "url": "https://www.linkedin.com/groups/121728/"}
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
  },
  "Environmental and Agricultural Sciences": {
    "Sustainable Agriculture": {
      "Opportunities and Roles": ["Agronomist", "Sustainable Farm Manager", "Agricultural Consultant"],
      "Resources": {
        "Educational Resources": [
          {"title": "Indian Council of Agricultural Research (ICAR)", "url": "https://icar.org.in/"},
          {"title": "Wageningen University's Agriculture Programs", "url": "https://www.wur.nl/en/Research-Results.htm"}
        ],
        "Online Courses": [
          {"title": "edX's Sustainable Agricultural Land Management", "url": "https://www.edx.org/course/sustainable-agricultural-land-management"},
          {"title": "Coursera's Sustainable Food Production", "url": "https://www.coursera.org/courses?query=sustainable%20food%20production"}
        ],
        "Industry Blogs": [
          {"title": "The Agroecologist", "url": "https://www.cstsavings.ca/blog/agroecologist/"},
          {"title": "The Green Revolution Blog", "url": "https://www.localfutures.org/the-green-revolution-no-way-to-feed-a-hungry-planet/"}
        ],
        "Professional Networks": [
          {"title": "National Academy of Agricultural Sciences (NAAS)", "url": "http://naasindia.org/"},
          {"title": "International Federation of Organic Agriculture Movements (IFOAM)", "url": "https://www.ifoam.bio/"}
        ]
      },
      "Insights": "Sustainable agriculture is increasingly critical as global food demands rise, focusing on innovative farming techniques to ensure food security."
    },
    "Environmental Conservation": {
      "Opportunities and Roles": ["Conservation Scientist", "Environmental Consultant", "Wildlife Manager"],
      "Resources": {
        "Educational Resources": [
          {"title": "Wildlife Institute of India (WII)", "url": "https://wii.gov.in/"},
          {"title": "Yale School of the Environment", "url": "https://environment.yale.edu/"}
        ],
        "Online Courses": [
          {"title": "Coursera's Introduction to Environmental Law and Policy", "url": "https://www.coursera.org/courses?query=environmental%20law"},
          {"title": "edX's Conservation and Ecosystem Management", "url": "https://www.edx.org/course/conservation-and-ecosystem-management"}
        ],
        "Industry Blogs": [
          {"title": "Conservation International Blog", "url": "https://www.conservation.org/blog"},
          {"title": "Mongabay India", "url": "https://india.mongabay.com/"}
        ],
        "Professional Networks": [
          {"title": "The Nature Conservancy", "url": "https://www.nature.org/en-us/"},
          {"title": "Society for Conservation Biology", "url": "https://conbio.org/"}
        ]
      },
      "Insights": "Environmental conservation professionals work to protect natural habitats and biodiversity, helping to combat climate change."
    },
    "Forestry": {
      "Opportunities and Roles": ["Forester", "Forest Ranger", "Forestry Consultant"],
      "Resources": {
        "Educational Resources": [
          {"title": "Forest Research Institute, Dehradun", "url": "https://www.icfre.org/"},
          {"title": "Oregon State University's Forestry Programs", "url": "https://www.forestry.oregonstate.edu/"}
        ],
        "Online Courses": [
          {"title": "edX's Sustainable Forest Management", "url": "https://www.edx.org/course/sustainable-forest-management"},
          {"title": "Coursera's Forest Ecosystem Management", "url": "https://www.coursera.org/courses?query=forest%20ecosystem"}
        ],
        "Industry Blogs": [
          {"title": "Forest News", "url": "https://forestsnews.cifor.org/"},
          {"title": "World Forestry Blog", "url": "https://www.globalforestwatch.org/blog/"}
        ],
        "Professional Networks": [
          {"title": "Society of American Foresters (SAF)", "url": "https://www.eforester.org/"},
          {"title": "Indian Institute of Forest Management (IIFM)", "url": "http://iifm.ac.in/"}
        ]
      },
      "Insights": "Forestry careers focus on managing forest ecosystems, combining fieldwork and research opportunities."
    },
    "Agricultural Engineering": {
      "Opportunities and Roles": ["Agricultural Engineer", "Irrigation Engineer", "Farm Equipment Designer"],
      "Resources": {
        "Educational Resources": [
          {"title": "Indian Agricultural Research Institute (IARI)", "url": "https://www.iari.res.in/"},
          {"title": "Purdue University's Agricultural Engineering Programs", "url": "https://engineering.purdue.edu/ABE"}
        ],
        "Online Courses": [
          {"title": "Coursera's Agricultural Engineering Fundamentals", "url": "https://www.coursera.org/courses?query=agricultural%20engineering"},
          {"title": "edX's Precision Agriculture", "url": "https://www.edx.org/course/precision-agriculture"}
        ],
        "Industry Blogs": [
          {"title": "Agri Engineering Today", "url": "https://isae.in/agricultural-engineering-today/"},
          {"title": "Farmers Weekly", "url": "https://www.fwi.co.uk/"}
        ],
        "Professional Networks": [
          {"title": "American Society of Agricultural and Biological Engineers (ASABE)", "url": "https://www.asabe.org/"},
          {"title": "Indian Society of Agricultural Engineers (ISAE)", "url": "https://isae.in/"}
        ]
      },
      "Insights": "Agricultural engineering advances farming practices through technology and innovation, focusing on improving efficiency and sustainability."
    },
    "Horticulture": {
      "Opportunities and Roles": ["Horticulturist", "Landscape Designer", "Nursery Manager"],
      "Resources": {
        "Educational Resources": [
          {"title": "Dr. YSR Horticultural University", "url": "https://drysrhu.ap.gov.in/"},
          {"title": "University of Florida Horticulture Programs", "url": "https://hort.ifas.ufl.edu/"}
        ],
        "Online Courses": [
          {"title": "edX's Horticulture Essentials", "url": "https://www.edx.org/course/horticulture-essentials"},
          {"title": "Coursera's Plant Biology and Horticulture", "url": "https://www.coursera.org/courses?query=horticulture"}
        ],
        "Industry Blogs": [
          {"title": "Gardening Know How", "url": "https://www.gardeningknowhow.com/"},
          {"title": "Horticulture Week", "url": "https://www.hortweek.com/"}
        ],
        "Professional Networks": [
          {"title": "American Society for Horticultural Science (ASHS)", "url": "https://ashs.org/"},
          {"title": "Horticultural Society of India (HSI)", "url": "https://iahs.org.in/headquarters/"}
        ]
      },
      "Insights": "Horticulture focuses on plant cultivation, offering careers in food production, landscaping, and ecological restoration."
    }
  },
  "Communications and Media": {
    "Broadcasting": {
      "Opportunities and Roles": ["Broadcast Journalist", "Radio Producer", "News Anchor"],
      "Resources": {
        "Educational Resources": [
          {"title": "Asian College of Journalism", "url": "https://www.asianmedia.org.in/"},
          {"title": "Columbia Journalism School", "url": "https://journalism.columbia.edu/"}
        ],
        "Online Courses": [
          {"title": "Coursera's Journalism Basics", "url": "https://www.coursera.org/courses?query=journalism"},
          {"title": "edX's Broadcast Media Technology", "url": "https://www.edx.org/course/broadcast-media-technology"}
        ],
        "Industry Blogs": [
          {"title": "Poynter Institute", "url": "https://www.poynter.org/"},
          {"title": "Broadcast Engineering", "url": "https://www.broadcastengineering.com/"}
        ],
        "Professional Networks": [
          {"title": "National Association of Broadcasters (NAB)", "url": "https://www.nab.org/"},
          {"title": "Broadcast Journalists of India", "url": "https://en.wikipedia.org/wiki/List_of_Indian_journalists"}
        ]
      },
      "Insights": "Broadcasting offers dynamic roles in radio, television, and online media, requiring creativity, technical skills, and the ability to work under pressure."
    },
    "Public Relations": {
      "Opportunities and Roles": ["Public Relations Specialist", "Media Relations Manager", "Corporate Communications Director"],
      "Resources": {
        "Educational Resources": [
          {"title": "Indian Institute of Mass Communication (IIMC)", "url": "https://www.iimc.gov.in/"},
          {"title": "USC Annenberg School for Communication and Journalism", "url": "https://annenberg.usc.edu/"}
        ],
        "Online Courses": [
          {"title": "Coursera's Public Relations for the 21st Century", "url": "https://www.coursera.org/courses?query=public%20relations"},
          {"title": "edX's Corporate Communication", "url": "https://www.edx.org/course/corporate-communication"}
        ],
        "Industry Blogs": [
          {"title": "PR Week", "url": "https://www.prweek.com/"},
          {"title": "PR News", "url": "https://www.prnewsonline.com/"}
        ],
        "Professional Networks": [
          {"title": "Public Relations Society of India (PRSI)", "url": "https://prsi.in/"},
          {"title": "Public Relations Society of America (PRSA)", "url": "https://www.prsa.org/"}
        ]
      },
      "Insights": "Public relations is crucial for managing a company's reputation and media presence, with opportunities in communication strategy, media relations, and crisis management."
    },
    "Social Media Management": {
      "Opportunities and Roles": ["Social Media Manager", "Content Strategist", "Digital Marketing Specialist"],
      "Resources": {
        "Educational Resources": [
          {"title": "Simplilearn's Digital Marketing Specialist Program", "url": "https://www.simplilearn.com/"},
          {"title": "HubSpot Academy", "url": "https://academy.hubspot.com/"}
        ],
        "Online Courses": [
          {"title": "Coursera's Social Media Marketing", "url": "https://www.coursera.org/courses?query=social%20media%20marketing"},
          {"title": "edX's Digital Marketing", "url": "https://www.edx.org/course/digital-marketing"}
        ],
        "Industry Blogs": [
          {"title": "Social Media Examiner", "url": "https://www.socialmediaexaminer.com/"},
          {"title": "Buffer Blog", "url": "https://buffer.com/resources"}
        ],
        "Professional Networks": [
          {"title": "Social Media Club", "url": "https://www.socialmediaclub.org/"},
          {"title": "LinkedIn Groups: Social Media Marketing", "url": "https://www.linkedin.com/groups/2099285/"}
        ]
      },
      "Insights": "Social media management is a rapidly growing field with roles in content creation, strategy, and analytics, offering opportunities for creativity and technical expertise."
    },
    "Film and Television": {
      "Opportunities and Roles": ["Film Director", "Screenwriter", "Television Producer"],
      "Resources": {
        "Educational Resources": [
          {"title": "Film and Television Institute of India (FTII)", "url": "https://www.ftii.ac.in/"},
          {"title": "New York Film Academy", "url": "https://www.nyfa.edu/"}
        ],
        "Online Courses": [
          {"title": "Coursera's Script Writing", "url": "https://www.coursera.org/courses?query=script%20writing"},
          {"title": "edX's Filmmaking Essentials", "url": "https://www.edx.org/course/filmmaking-essentials"}
        ],
        "Industry Blogs": [
          {"title": "IndieWire", "url": "https://www.indiewire.com/"},
          {"title": "The Script Lab", "url": "https://thescriptlab.com/"}
        ],
        "Professional Networks": [
          {"title": "Film Directors Guild of India", "url": "https://www.directorsiftda.com/"},
          {"title": "Screenwriters Association (SWA)", "url": "https://www.swaindia.org/"}
        ]
      },
      "Insights": "Film and television offer creative careers with opportunities in storytelling, production, and direction. The industry is competitive but provides the chance to influence culture and entertain audiences."
    },
    "Advertising": {
      "Opportunities and Roles": ["Advertising Executive", "Copywriter", "Art Director"],
      "Resources": {
        "Educational Resources": [
          {"title": "MICA Ahmedabad", "url": "https://www.mica.ac.in/"},
          {"title": "The Creative Circus", "url": "https://creativecircus.edu/"}
        ],
        "Online Courses": [
          {"title": "Coursera's Advertising Strategy", "url": "https://www.coursera.org/courses?query=advertising%20strategy"},
          {"title": "edX's Creative Advertising", "url": "https://www.edx.org/course/creative-advertising"}
        ],
        "Industry Blogs": [
          {"title": "Adweek", "url": "https://www.adweek.com/"},
          {"title": "The Drum", "url": "https://www.thedrum.com/"}
        ],
        "Professional Networks": [
          {"title": "Advertising Club of India", "url": "https://theadvertisingclub.net/"},
          {"title": "American Advertising Federation (AAF)", "url": "https://www.aaf.org/"}
        ]
      },
      "Insights": "Advertising blends creativity with strategy to influence consumer behavior. The field offers diverse roles in agencies, media, and corporate settings."
    }
  },
  "Sports and Recreation": {
    "Sports Management": {
      "Opportunities and Roles": ["Sports Manager", "Event Coordinator", "Team Administrator"],
      "Resources": {
        "Educational Resources": [
          {"title": "Tata Institute of Social Sciences (TISS) Sports Management Program", "url": "https://tiss.edu/"},
          {"title": "University of Michigan's Sport Management Program", "url": "https://www.kines.umich.edu/"}
        ],
        "Online Courses": [
          {"title": "Coursera's Sports Management", "url": "https://www.coursera.org/courses?query=sports%20management"},
          {"title": "edX's Sports Analytics", "url": "https://www.edx.org/course/sports-analytics"}
        ],
        "Industry Blogs": [
          {"title": "Sports Management Review", "url": "https://www.journals.elsevier.com/sport-management-review"},
          {"title": "Sport Business", "url": "https://www.sportbusiness.com/"}
        ],
        "Professional Networks": [
          {"title": "Sports Management Association of India (SMAI)", "url": "https://www.smai.org/"},
          {"title": "North American Society for Sport Management (NASSM)", "url": "https://www.nassm.org/"}
        ]
      },
      "Insights": "Sports management involves overseeing the business aspects of sports organizations and events, offering roles in team management, event coordination, and sports marketing."
    },
    "Coaching": {
      "Opportunities and Roles": ["Sports Coach", "Fitness Trainer", "Performance Analyst"],
      "Resources": {
        "Educational Resources": [
          {"title": "National Institute of Sports (NIS) Patiala", "url": "https://nsnis.org/"},
          {"title": "The FA Level 1 Coaching Course", "url": "https://www.thefa.com/coaches/"}
        ],
        "Online Courses": [
          {"title": "Coursera's Coaching in Sports", "url": "https://www.coursera.org/courses?query=coaching"},
          {"title": "edX's Athletic Coaching", "url": "https://www.edx.org/course/athletic-coaching"}
        ],
        "Industry Blogs": [
          {"title": "The Coaching Academy Blog", "url": "https://www.coachingacademy.com/blog/"},
          {"title": "Coaching Edge", "url": "https://www.coachingedge.com/blog"}
        ],
        "Professional Networks": [
          {"title": "International Council for Coaching Excellence (ICCE)", "url": "https://www.icce.ws/"},
          {"title": "All India Football Federation (AIFF) Coaching", "url": "https://www.the-aiff.com/"}
        ]
      },
      "Insights": "Coaching careers offer opportunities to mentor and develop athletes across various sports, ideal for those passionate about sports."
    },
    "Fitness Training": {
      "Opportunities and Roles": ["Personal Trainer", "Group Fitness Instructor", "Strength and Conditioning Coach"],
      "Resources": {
        "Educational Resources": [
          {"title": "National Academy of Sports Medicine (NASM)", "url": "https://www.nasm.org/"},
          {"title": "American Council on Exercise (ACE)", "url": "https://www.acefitness.org/"}
        ],
        "Online Courses": [
          {"title": "Coursera's Science of Exercise", "url": "https://www.coursera.org/courses?query=science%20of%20exercise"},
          {"title": "edX's Nutrition and Physical Activity", "url": "https://www.edx.org/course/nutrition-and-physical-activity"}
        ],
        "Industry Blogs": [
          {"title": "ACE Blog", "url": "https://www.acefitness.org/blog"},
          {"title": "Fitness Blender Blog", "url": "https://www.fitnessblender.com/blog"}
        ],
        "Professional Networks": [
          {"title": "Indian Fitness & Wellness Federation", "url": "http://www.ibbff.com/about"},
          {"title": "International Sports Sciences Association (ISSA)", "url": "https://www.issaonline.com/"}
        ]
      },
      "Insights": "Fitness training focuses on improving health and wellness, offering flexible work environments and opportunities for personal growth."
    },
    "Sports Medicine": {
      "Opportunities and Roles": ["Sports Medicine Physician", "Physiotherapist", "Athletic Trainer"],
      "Resources": {
        "Educational Resources": [
          {"title": "National Institute of Sports Medicine, India", "url": "http://nisindia.in/"},
          {"title": "American College of Sports Medicine (ACSM)", "url": "https://www.acsm.org/"}
        ],
        "Online Courses": [
          {"title": "Coursera's Sports Medicine Essentials", "url": "https://www.coursera.org/courses?query=sports%20medicine"},
          {"title": "edX's Introduction to Sports Medicine", "url": "https://www.edx.org/course/introduction-to-sports-medicine"}
        ],
        "Industry Blogs": [
          {"title": "BMJ Open Sport & Exercise Medicine", "url": "https://bmjopensem.bmj.com/"},
          {"title": "Journal of Sports Medicine and Physical Fitness", "url": "https://www.minervamedica.it/en/journals/sports-med-physical-fitness/"}
        ],
        "Professional Networks": [
          {"title": "Indian Association of Sports Medicine (IASM)", "url": "https://www.iasm.co.in/"},
          {"title": "International Federation of Sports Medicine (FIMS)", "url": "https://www.fims.org/"}
        ]
      },
      "Insights": "Sports medicine is an essential field for maintaining athlete health and performance, offering roles in clinical practice, research, and rehabilitation."
    },
    "Event Coordination": {
      "Opportunities and Roles": ["Event Planner", "Sports Event Coordinator", "Venue Manager"],
      "Resources": {
        "Educational Resources": [
          {"title": "Event Management Development Institute (EMDI)", "url": "https://www.emdiworld.com/"},
          {"title": "George Washington University Event Management Program", "url": "https://www.gwu.edu/"}
        ],
        "Online Courses": [
          {"title": "Coursera's Event Management", "url": "https://www.coursera.org/courses?query=event%20management"},
          {"title": "edX's Managing Major Events", "url": "https://www.edx.org/course/managing-major-events"}
        ],
        "Industry Blogs": [
          {"title": "Event Manager Blog", "url": "https://www.eventmanagerblog.com/"},
          {"title": "BizBash", "url": "https://www.bizbash.com/"}
        ],
        "Professional Networks": [
          {"title": "Event and Entertainment Management Association (EEMA)", "url": "https://www.eemaindia.com/"},
          {"title": "Meeting Professionals International (MPI)", "url": "https://www.mpi.org/"}
        ]
      },
      "Insights": "Event coordination involves planning and executing sports and recreational events, offering roles in project management, client relations, and logistical planning."
    }
  }
};

export const CareerOptions = () => {
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    if (selectedCareer === category) {
      setSelectedCareer(null);
    } else {
      setSelectedCareer(category);
      setSelectedCategory(null);
    }
  };

  const handleSubcategoryClick = (subcategory: string) => {
    setSelectedCategory(subcategory);
  };

  const categoryColors = {
    "Technology": "#D3E4FD",
    "Healthcare": "#D5ECC2",
    "Business": "#FFD8B1",
    "Engineering": "#FFAAA7",
    "Education and Teaching": "#B5EAD7",
    "Law and Legal Studies": "#C7CEEA",
    "Finance and Accounting": "#FEE1E8",
    "Human Resources": "#F8E9A1",
    "Sales and Marketing": "#FFC4D6",
    "Data Science and Analytics": "#BFEFFF",
    "Entrepreneurship and Startups": "#D6B0FF",
    "Creative Arts": "#FFB7CE",
    "Government and Public Administration": "#C2E9FB",
    "Environmental and Agricultural Sciences": "#A0DAA9",
    "Communications and Media": "#FFDFD3",
    "Sports and Recreation": "#E2F0CB"
  };

  const formattedCareerPath = (career: string, subcategory: string) => {
    // Replace spaces with hyphens and make lowercase for URL
    const formattedCareer = career.toLowerCase().replace(/\s+/g, '-');
    const formattedSubcategory = subcategory.toLowerCase().replace(/\s+/g, '-');
    return `hardcoded-${formattedCareer}-${formattedSubcategory}`;
  };

  return (
    <section className="career-options-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Explore Career Options in India</h2>
          <p className="section-subtitle">
            Discover diverse career paths across various industries that match your interests and strengths
          </p>
        </div>

        {/* Career Categories Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full my-8"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {Object.keys(hardcodedCareers).map((career) => (
              <CarouselItem key={career} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <Button
                  className="career-category-button w-full h-full py-6"
                  style={{ backgroundColor: categoryColors[career as keyof typeof categoryColors] || "#f0f0f0" }}
                  variant="outline"
                  onClick={() => handleCategoryClick(career)}
                >
                  <span className="career-category-name">{career}</span>
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-4">
            <CarouselPrevious className="static translate-y-0 mx-2" />
            <CarouselNext className="static translate-y-0 mx-2" />
          </div>
        </Carousel>

        {selectedCareer && (
          <div className="subcategories-container">
            <h3 className="subcategory-title">{selectedCareer} Specializations</h3>
            <div className="subcategories-grid">
              {Object.keys(hardcodedCareers[selectedCareer as keyof typeof hardcodedCareers]).map((subcategory) => (
                <Card 
                  key={subcategory} 
                  className="subcategory-card"
                  style={{ 
                    borderTop: `5px solid ${categoryColors[selectedCareer as keyof typeof categoryColors] || "#f0f0f0"}` 
                  }}
                >
                  <CardHeader>
                    <CardTitle>{subcategory}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="subcategory-description">
                      {hardcodedCareers[selectedCareer as keyof typeof hardcodedCareers][subcategory].Insights || 
                       "Explore this specialized career path."}
                    </p>
                    <Link 
                      to={`/careers/${formattedCareerPath(selectedCareer, subcategory)}`} 
                      className="subcategory-link"
                    >
                      <Button className="mt-4">
                        Explore Career Path
                        <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="explore-more-container">
          <h3>Not sure which path to take?</h3>
          <Link to="/journey">
            <Button className="explore-button">
              Take Career Assessment
              <ChevronRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CareerOptions;
