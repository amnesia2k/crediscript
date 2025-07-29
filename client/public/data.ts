import {
  Award,
  BookOpen,
  Clock,
  FileText,
  GraduationCap,
  Search,
  Shield,
  Star,
  Users,
} from "lucide-react";

export const navLinks = [
  {
    id: 1,
    name: "Home",
    path: "/",
  },
  {
    id: 2,
    name: "About",
    path: "/about",
  },
  {
    id: 3,
    name: "Contact",
    path: "/contact",
  },
  {
    id: 4,
    name: "Testimonials",
    path: "/testimonials",
  },
];

export const services = [
  {
    icon: BookOpen,
    title: "Academic Writing",
    description:
      "Professional essays, research papers, and academic content crafted to meet the highest standards.",
    features: ["Original Content", "Proper Citations", "Academic Standards"],
  },
  {
    icon: FileText,
    title: "Assignment Help",
    description:
      "Comprehensive assistance with assignments across all subjects and academic levels.",
    features: ["All Subjects", "Timely Delivery", "Quality Assurance"],
  },
  {
    icon: GraduationCap,
    title: "Thesis Guidance",
    description:
      "Expert guidance for thesis writing, from proposal to final submission.",
    features: ["Research Support", "Structure Guidance", "Review Process"],
  },
  {
    icon: Search,
    title: "Project Research",
    description:
      "In-depth research services for academic and professional projects.",
    features: ["Data Collection", "Analysis", "Documentation"],
  },
];

export const valueProps = [
  {
    icon: Users,
    title: "Expert Writers",
    description:
      "PhD-qualified writers with extensive academic experience across all disciplines.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description:
      "Guaranteed delivery within agreed timelines, ensuring you never miss a deadline.",
  },
  {
    icon: Shield,
    title: "Original Content",
    description:
      "100% plagiarism-free content with comprehensive quality checks and reports.",
  },
  {
    icon: Star,
    title: "24/7 Support",
    description:
      "Round-the-clock customer support to address your queries and concerns.",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    service: "Thesis Guidance",
    rating: 5,
    text: "Exceptional guidance throughout my PhD thesis. The expert feedback helped me achieve distinction.",
    date: "2024-01-15",
  },

  {
    id: 2,
    name: "Michael Chen",
    service: "Academic Writing",
    rating: 5,
    text: "Outstanding quality and attention to detail. My research paper exceeded all expectations.",
    date: "2024-01-10",
  },

  {
    id: 3,
    name: "Emily Davis",
    service: "Assignment Help",
    rating: 5,
    text: "Reliable, professional, and always on time. Helped me maintain my GPA throughout the semester.",
    date: "2024-01-05",
  },
];

export const testimonialsPage = [
  {
    id: 1,
    name: "Sarah Johnson",
    service: "Thesis Guidance",
    rating: 5,
    text: "Exceptional guidance throughout my PhD thesis. The expert feedback helped me achieve distinction. Dr. Mitchell's insights were invaluable in structuring my research and presenting my findings clearly.",
    date: "2024-01-15",
  },

  {
    id: 2,
    name: "Michael Chen",
    service: "Academic Writing",
    rating: 5,
    text: "Outstanding quality and attention to detail. My research paper exceeded all expectations and received top marks from my professor. The writing was clear, well-researched, and perfectly formatted.",
    date: "2024-01-10",
  },

  {
    id: 3,
    name: "Emily Davis",
    service: "Assignment Help",
    rating: 5,
    text: "Reliable, professional, and always on time. Helped me maintain my GPA throughout the semester. The explanations provided helped me understand complex concepts better.",
    date: "2024-01-05",
  },

  {
    id: 4,
    name: "David Rodriguez",
    service: "Project Research",
    rating: 5,
    text: "Comprehensive research support that saved me countless hours. The data collection and analysis were thorough and professionally presented. Highly recommend for any research project.",
    date: "2023-12-28",
  },

  {
    id: 5,
    name: "Lisa Thompson",
    service: "Coursework Support",
    rating: 5,
    text: "Amazing support throughout my master's program. The team understood my requirements perfectly and delivered high-quality work consistently. Made my academic journey much smoother.",
    date: "2023-12-20",
  },

  {
    id: 6,
    name: "James Wilson",
    service: "Academic Writing",
    rating: 5,
    text: "Professional service with excellent communication. My dissertation proposal was accepted on the first submission thanks to their expert guidance and meticulous attention to detail.",
    date: "2023-12-15",
  },

  {
    id: 7,
    name: "Maria Garcia",
    service: "Assignment Help",
    rating: 5,
    text: "Helped me through a challenging semester with multiple assignments. Each piece was unique, well-researched, and delivered on time. The quality was consistently excellent.",
    date: "2023-12-10",
  },

  {
    id: 8,
    name: "Robert Kim",
    service: "Thesis Guidance",
    rating: 5,
    text: "The thesis guidance was comprehensive and supportive. From initial concept to final submission, every step was carefully planned and executed. Couldn't have done it without their help.",
    date: "2023-12-05",
  },

  {
    id: 9,
    name: "Amanda Foster",
    service: "Project Research",
    rating: 5,
    text: "Exceptional research skills and methodology. The project was completed with thorough analysis and clear presentation. The team went above and beyond my expectations.",
    date: "2023-11-30",
  },
];

export const credentials = [
  "PhD in English Literature",
  "Master's in Academic Writing",
  "Certified Academic Editor",
  "Published Researcher",
];

export const stats = [
  {
    icon: Users,
    label: "Happy Clients",
    value: "2,500+",
  },

  {
    icon: GraduationCap,
    label: "Years Experience",
    value: "15+",
  },

  {
    icon: Award,
    label: "Success Rate",
    value: "98%",
  },

  {
    icon: Clock,
    label: "Projects Completed",
    value: "5,000+",
  },
];

export const faqs = [
  {
    question: "How quickly can you complete my project?",
    answer:
      "Turnaround time depends on the complexity and length of your project. We offer urgent delivery options from 24 hours to standard 7-14 day completion.",
  },

  {
    question: "Do you guarantee original content?",
    answer:
      "Yes, we guarantee 100% original, plagiarism-free content. All work is checked through multiple plagiarism detection tools before delivery.",
  },

  {
    question: "What subjects do you cover?",
    answer:
      "We cover all academic subjects including but not limited to Literature, Sciences, Business, Psychology, History, and Engineering.",
  },

  {
    question: "Can I communicate with my writer?",
    answer:
      "Yes, we provide direct communication channels with your assigned writer to ensure your requirements are met perfectly.",
  },
];

export const mockMessages = [
  {
    id: 1,
    name: "John Smith",
    email: "john@email.com",
    phone: "+1234567890",
    serviceType: "Academic Writing",
    subject: "Research Paper Help",
    message:
      "I need help with my research paper on climate change. The deadline is next week.",
    urgency: "1-week",
    date: "2024-01-15",
    status: "unread",
  },

  {
    id: 2,
    name: "Emma Wilson",
    email: "emma@email.com",
    phone: "+1234567891",
    serviceType: "Thesis Guidance",
    subject: "PhD Thesis Review",
    message:
      "Looking for comprehensive review of my PhD thesis draft. Need expert feedback.",
    urgency: "2-weeks",
    date: "2024-01-14",
    status: "read",
  },

  {
    id: 3,
    name: "Alex Johnson",
    email: "alex@email.com",
    phone: "+1234567892",
    serviceType: "Assignment Help",
    subject: "Statistics Assignment",
    message:
      "Need urgent help with statistics assignment. Complex data analysis required.",
    urgency: "24-hours",
    date: "2024-01-13",
    status: "replied",
  },
];

export const mockTestimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    service: "Thesis Guidance",
    rating: 5,
    text: "Exceptional guidance throughout my PhD thesis. The expert feedback helped me achieve distinction.",
    date: "2024-01-15",
    visible: true,
    approved: true,
  },

  {
    id: 2,
    name: "Michael Chen",
    service: "Academic Writing",
    rating: 5,
    text: "Outstanding quality and attention to detail. My research paper exceeded all expectations.",
    date: "2024-01-10",
    visible: true,
    approved: true,
  },

  {
    id: 3,
    name: "Emily Davis",
    service: "Assignment Help",
    rating: 5,
    text: "Reliable, professional, and always on time. Helped me maintain my GPA throughout the semester.",
    date: "2024-01-05",
    visible: false,
    approved: false,
  },
];
