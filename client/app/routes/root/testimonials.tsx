import { Button } from "@/components/ui/button";
import type { Route } from "./+types/testimonials";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { testimonialsPage } from "public/data";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Crediscript | Testimonials" },
    { name: "description", content: "Welcome to Crediscript" },
  ];
}

export default function TestimonialsPage() {
  const [filter, setFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredTestimonials =
    filter === "all"
      ? testimonialsPage
      : testimonialsPage.filter((t) => t.service === filter);

  const visibleTestimonials = filteredTestimonials.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Client Testimonials
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Read what our satisfied clients have to say about their experience
            with Crediscript.
          </p>
        </div>

        {/* Filter */}
        <div className="mb-8 flex justify-center">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Filter by service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              <SelectItem value="Academic Writing">Academic Writing</SelectItem>
              <SelectItem value="Assignment Help">Assignment Help</SelectItem>
              <SelectItem value="Thesis Guidance">Thesis Guidance</SelectItem>
              <SelectItem value="Project Research">Project Research</SelectItem>
              <SelectItem value="Coursework Support">
                Coursework Support
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {visibleTestimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      {testimonial.name}
                    </CardTitle>
                    <Badge variant="secondary" className="mt-1 rounded-full">
                      {testimonial.service}
                    </Badge>
                  </div>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm">
                  {new Date(testimonial.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </CardHeader>
              <CardContent>
                <p className="italic">"{testimonial.text}"</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredTestimonials.length && (
          <div className="text-center">
            <Button onClick={loadMore} variant="outline" size="lg">
              Load More Testimonials
            </Button>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-20 bg-primary/40 rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              Trusted by Students Worldwide
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">2,500+</div>
              <div>Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">98%</div>
              <div>Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">4.9/5</div>
              <div>Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">15+</div>
              <div>Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
