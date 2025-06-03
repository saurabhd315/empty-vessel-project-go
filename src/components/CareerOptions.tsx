import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      "Opportunities and Roles": ["Software Engineer", "Frontend Developer", "Backend Developer", "Full Stack Developer"],
      "Resources": {
        "Educational Resources": [
          {"title": "freeCodeCamp", "url": "https://www.freecodecamp.org/"},
          {"title": "Codecademy", "url": "https://www.codecademy.com/"}
        ],
        "Online Courses": [
          {"title": "Udemy Programming Courses", "url": "https://www.udemy.com/courses/development/"},
          {"title": "Coursera Computer Science", "url": "https://www.coursera.org/browse/computer-science"}
        ],
        "Industry Blogs": [
          {"title": "Stack Overflow Blog", "url": "https://stackoverflow.blog/"},
          {"title": "GitHub Blog", "url": "https://github.blog/"}
        ],
        "Professional Networks": [
          {"title": "Stack Overflow", "url": "https://stackoverflow.com/"},
          {"title": "GitHub", "url": "https://github.com/"}
        ]
      },
      "Insights": "Software development is a rapidly growing field with high demand for skilled professionals in India's booming tech industry."
    }
  },
  "Healthcare": {
    "Medical Practice": {
      "Opportunities and Roles": ["Doctor", "Surgeon", "General Practitioner"],
      "Resources": {
        "Educational Resources": [
          {"title": "Medical Council of India", "url": "https://www.nmc.org.in/"},
          {"title": "AIIMS", "url": "https://www.aiims.edu/"}
        ],
        "Online Courses": [
          {"title": "Coursera Health Courses", "url": "https://www.coursera.org/browse/health"},
          {"title": "edX Medical Courses", "url": "https://www.edx.org/course/subject/medicine"}
        ],
        "Industry Blogs": [
          {"title": "The Lancet", "url": "https://www.thelancet.com/"},
          {"title": "BMJ", "url": "https://www.bmj.com/"}
        ],
        "Professional Networks": [
          {"title": "Indian Medical Association", "url": "https://www.ima-india.org/"},
          {"title": "Medical Twitter", "url": "https://twitter.com/"}
        ]
      },
      "Insights": "Medical practice offers the opportunity to directly impact lives and contribute to society's health and well-being."
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
          {"title": "American Bar Association", "url": "https://www.americanbar.org/"},
          {"title": "LinkedIn Criminal Defense Group", "url": "https://www.linkedin.com/groups/128731/"}
        ]
      },
      "Insights": "Criminal law involves defending and prosecuting criminal cases, with roles in legal advocacy and forensic analysis."
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

const industryMapping = {
  "Technology": "🔧",
  "Healthcare": "⚕️",
  "Education and Teaching": "📚",
  "Law and Legal Studies": "⚖️",
  "Environmental and Agricultural Sciences": "🌱",
  "Communications and Media": "📺",
  "Sports and Recreation": "🏆",
  "Finance": "💰",
  "Business": "💼",
  "Arts": "🎨",
};

export const CareerOptions = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>(["All"]);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [customCareers, setCustomCareers] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const updateCareers = () => {
      const storedCareers = localStorage.getItem("customCareers");
      if (storedCareers) {
        setCustomCareers(JSON.parse(storedCareers));
      }
      
      const storedCategories = localStorage.getItem("careerCategories");
      if (storedCategories) {
        setCategories(JSON.parse(storedCategories));
      }
    };

    updateCareers();
    window.addEventListener("careersUpdated", updateCareers);
    window.addEventListener("categoriesUpdated", updateCareers);

    return () => {
      window.removeEventListener("careersUpdated", updateCareers);
      window.removeEventListener("categoriesUpdated", updateCareers);
    };
  }, []);

  const handleCategoryToggle = (categoryName: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName);
      } else {
        newSet.add(categoryName);
      }
      return newSet;
    });
  };

  const handleViewDetails = (parentCategory: string, subCategory: string) => {
    const careerId = `hardcoded-${parentCategory.toLowerCase().replace(/\s+/g, '-')}-${subCategory.toLowerCase().replace(/\s+/g, '-')}`;
    navigate(`/careers/${careerId}`);
  };

  const parentCategories = Object.keys(hardcodedCareers);

  return (
    <section className="career-options-section">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
          Explore Career Options in India
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Discover diverse career paths tailored for the Indian market. From traditional roles to emerging opportunities, find the perfect career match for your aspirations.
        </p>

        {/* Parent Categories Section with Carousel */}
        <div className="parent-categories-section">
          <h3 className="parent-categories-title">Career Categories</h3>
          <div className="parent-categories-container">
            <Carousel className="carousel-container">
              <CarouselContent>
                {parentCategories.map((categoryName) => (
                  <CarouselItem key={categoryName} className="md:basis-1/2 lg:basis-1/3">
                    <div className="parent-category-item">
                      <button
                        className={`parent-category-button ${expandedCategories.has(categoryName) ? 'expanded' : ''}`}
                        onClick={() => handleCategoryToggle(categoryName)}
                      >
                        <span className="flex items-center gap-3">
                          <span className="text-2xl">{industryMapping[categoryName as keyof typeof industryMapping] || "📋"}</span>
                          {categoryName}
                        </span>
                        {expandedCategories.has(categoryName) ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </button>
                      
                      {expandedCategories.has(categoryName) && (
                        <div className="subcategories-container">
                          <div className="grid gap-4 md:grid-cols-2">
                            {Object.entries(hardcodedCareers[categoryName as keyof typeof hardcodedCareers]).map(([subCategory, data]) => (
                              <div key={subCategory} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                                <h4 className="font-semibold text-gray-800 mb-2">{subCategory}</h4>
                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{data.Insights}</p>
                                <div className="flex flex-wrap gap-1 mb-3">
                                  {data["Opportunities and Roles"].slice(0, 3).map((role: string, index: number) => (
                                    <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                      {role}
                                    </span>
                                  ))}
                                </div>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="view-details-btn"
                                  onClick={() => handleViewDetails(categoryName, subCategory)}
                                >
                                  View Details
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="career-nav-button prev" />
              <CarouselNext className="career-nav-button next" />
            </Carousel>
          </div>
        </div>

        <div className="original-careers-section">
          <div className="filter-chips-container">
            <button
              className={`filter-chip ${activeFilters.includes("All") ? "active" : ""}`}
              onClick={() => setActiveFilters(["All"])}
            >
              All Careers
            </button>
            <button
              className={`filter-chip ${activeFilters.includes("Technology") ? "active" : ""}`}
              onClick={() => setActiveFilters(["Technology"])}
            >
              Technology
            </button>
            <button
              className={`filter-chip ${activeFilters.includes("Healthcare") ? "active" : ""}`}
              onClick={() => setActiveFilters(["Healthcare"])}
            >
              Healthcare
            </button>
            <button
              className={`filter-chip ${activeFilters.includes("Education") ? "active" : ""}`}
              onClick={() => setActiveFilters(["Education"])}
            >
              Education
            </button>
            <button
              className={`filter-chip ${activeFilters.includes("Business") ? "active" : ""}`}
              onClick={() => setActiveFilters(["Business"])}
            >
              Business
            </button>
            <button
              className={`filter-chip ${activeFilters.includes("Creative") ? "active" : ""}`}
              onClick={() => setActiveFilters(["Creative"])}
            >
              Creative
            </button>
          </div>

          <div className="carousel-container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="career-card-container">
                <div className="career-card" style={{ background: "linear-gradient(135deg, #D3E4FD 0%, #A7C6F3 100%)" }}>
                  <div className="career-icon-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                    </svg>
                  </div>
                  <h3 className="career-title">Software Developer</h3>
                  <p className="career-teaser">Design and build applications that run on computers and mobile devices.</p>
                  <div className="career-overlay">
                    <div className="career-salary">₹5-25 LPA</div>
                    <Button variant="outline" className="view-details-btn" onClick={() => navigate("/careers/software-developer")}>
                      View Details
                    </Button>
                  </div>
                </div>
              </div>

              <div className="career-card-container">
                <div className="career-card" style={{ background: "linear-gradient(135deg, #FFE8D6 0%, #FFDAB9 100%)" }}>
                  <div className="career-icon-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                    </svg>
                  </div>
                  <h3 className="career-title">Doctor</h3>
                  <p className="career-teaser">Diagnose and treat injuries and illnesses in patients.</p>
                  <div className="career-overlay">
                    <div className="career-salary">₹8-40 LPA</div>
                    <Button variant="outline" className="view-details-btn" onClick={() => navigate("/careers/doctor")}>
                      View Details
                    </Button>
                  </div>
                </div>
              </div>

              <div className="career-card-container">
                <div className="career-card" style={{ background: "linear-gradient(135deg, #E2F0CB 0%, #C5E1A5 100%)" }}>
                  <div className="career-icon-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                      <line x1="6" y1="1" x2="6" y2="4"></line>
                      <line x1="10" y1="1" x2="10" y2="4"></line>
                      <line x1="14" y1="1" x2="14" y2="4"></line>
                    </svg>
                  </div>
                  <h3 className="career-title">Teacher</h3>
                  <p className="career-teaser">Educate students in various subjects and help them develop skills.</p>
                  <div className="career-overlay">
                    <div className="career-salary">₹3-12 LPA</div>
                    <Button variant="outline" className="view-details-btn" onClick={() => navigate("/careers/teacher")}>
                      View Details
                    </Button>
                  </div>
                </div>
              </div>

              <div className="career-card-container">
                <div className="career-card" style={{ background: "linear-gradient(135deg, #D4F1F9 0%, #B2EBF2 100%)" }}>
                  <div className="career-icon-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                  </div>
                  <h3 className="career-title">Financial Analyst</h3>
                  <p className="career-teaser">Analyze financial data and provide investment guidance.</p>
                  <div className="career-overlay">
                    <div className="career-salary">₹7-20 LPA</div>
                    <Button variant="outline" className="view-details-btn" onClick={() => navigate("/careers/financial-analyst")}>
                      View Details
                    </Button>
                  </div>
                </div>
              </div>

              <div className="career-card-container">
                <div className="career-card" style={{ background: "linear-gradient(135deg, #F8BBD0 0%, #F48FB1 100%)" }}>
                  <div className="career-icon-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                      <line x1="12" y1="22.08" x2="12" y2="12"></line>
                    </svg>
                  </div>
                  <h3 className="career-title">Fashion Designer</h3>
                  <p className="career-teaser">Create clothing designs and accessories for various markets.</p>
                  <div className="career-overlay">
                    <div className="career-salary">₹3-15 LPA</div>
                    <Button variant="outline" className="view-details-btn" onClick={() => navigate("/careers/fashion-designer")}>
                      View Details
                    </Button>
                  </div>
                </div>
              </div>

              <div className="career-card-container">
                <div className="career-card" style={{ background: "linear-gradient(135deg, #DCEDC8 0%, #AED581 100%)" }}>
                  <div className="career-icon-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                  </div>
                  <h3 className="career-title">HR Manager</h3>
                  <p className="career-teaser">Oversee recruitment, employee relations, and organizational development.</p>
                  <div className="career-overlay">
                    <div className="career-salary">₹6-18 LPA</div>
                    <Button variant="outline" className="view-details-btn" onClick={() => navigate("/careers/hr-manager")}>
                      View Details
                    </Button>
                  </div>
                </div>
              </div>

              {customCareers.map((career) => (
                <div key={career.id} className="career-card-container">
                  <div className="career-card" style={{ background: career.color || "linear-gradient(135deg, #E0F7FA 0%, #80DEEA 100%)" }}>
                    <div className="career-icon-container">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                      </svg>
                    </div>
                    <h3 className="career-title">{career.title}</h3>
                    <p className="career-teaser">{career.description?.substring(0, 100)}...</p>
                    <div className="career-overlay">
                      <div className="career-salary">{career.salary || "Varies"}</div>
                      <Button variant="outline" className="view-details-btn" onClick={() => navigate(`/careers/custom/${career.id}`)}>
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {categories.map((category) => (
                <div key={category.id} className="career-card-container">
                  <div className="career-card" style={{ background: "linear-gradient(135deg, #FFF9C4 0%, #FFF176 100%)" }}>
                    <div className="career-icon-container">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                        <polyline points="2 17 12 22 22 17"></polyline>
                        <polyline points="2 12 12 17 22 12"></polyline>
                      </svg>
                    </div>
                    <h3 className="career-title">{category.name}</h3>
                    <p className="career-teaser">{category.insights?.substring(0, 100)}...</p>
                    <div className="career-overlay">
                      <div className="career-salary">Multiple Roles</div>
                      <Button variant="outline" className="view-details-btn" onClick={() => navigate(`/careers/category/${category.id}`)}>
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
