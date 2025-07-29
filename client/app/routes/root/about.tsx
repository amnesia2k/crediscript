import { credentials, stats } from "public/data";
import type { Route } from "./+types/about";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Crediscript | About" },
    { name: "description", content: "Welcome to Crediscript" },
  ];
}

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Crediscript
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Dedicated to helping students and researchers achieve academic
            excellence through professional writing services and expert
            guidance.
          </p>
        </div>

        {/* Professional Bio Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="rounded-lg aspect-square mb-6 flex items-center justify-center">
              <img
                src="/placeholder.svg?height=400&width=400"
                alt="Joshua Onojie E. - Academic Writing Expert"
                width={400}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-4">Joshua Onojie E.</h2>
              <p className="text-xl text-primary mb-4">
                Founder & Academic Consultant
              </p>

              <div className="space-y-4">
                <p>
                  With over 15 years of experience in academic writing and
                  research, Dr. Sarah Mitchell has dedicated her career to
                  helping students and researchers achieve their academic goals.
                  Her expertise spans across multiple disciplines, with a
                  particular focus on research methodology, academic writing
                  standards, and thesis development.
                </p>

                <p>
                  Dr. Mitchell holds a PhD in English Literature from Harvard
                  University and has published extensively in peer-reviewed
                  journals. Her passion for education and commitment to academic
                  excellence has helped thousands of students successfully
                  complete their academic projects.
                </p>

                <p>
                  She founded AcademicExcel with the mission to provide
                  personalized, high-quality academic support that empowers
                  students to reach their full potential while maintaining the
                  highest standards of academic integrity.
                </p>
              </div>
            </div>

            {/* Credentials */}
            <div>
              <h3 className="text-xl font-semibold mb-3">
                Academic Credentials
              </h3>
              <div className="flex flex-wrap gap-2">
                {credentials.map((credential, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-sm rounded-full"
                  >
                    {credential}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <stat.icon className="h-8 w-8 text-primary mx-auto" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-8">
            <CardHeader>
              <CardTitle className="text-2xl text-center mb-4">
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center">
                To provide exceptional academic writing services that empower
                students and researchers to achieve their educational goals
                while maintaining the highest standards of quality, originality,
                and academic integrity.
              </p>
            </CardContent>
          </Card>

          <Card className="p-8">
            <CardHeader>
              <CardTitle className="text-2xl text-center mb-4">
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center">
                To be the leading academic support service that transforms the
                educational journey of students nationwide, fostering a culture
                of excellence, learning, and academic success.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
