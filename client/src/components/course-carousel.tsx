import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { sendCourseEnrollment } from "@/lib/whatsapp";
import type { Course } from "@shared/schema";

export function CourseCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const { data: courses = [], isLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
    queryFn: async () => {
      const response = await fetch("/api/courses");
      if (!response.ok) throw new Error("Failed to fetch courses");
      return response.json();
    },
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const slidesToShow = isMobile ? 1 : 3;
  const maxSlides = Math.max(0, courses.length - slidesToShow + 1);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % maxSlides);
  };

  const previousSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides);
  };

  const handleEnroll = (courseName: string) => {
    sendCourseEnrollment(courseName);
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-neutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p>Carregando cursos...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="cursos" className="py-16 bg-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold text-educavales-primary mb-4">
            Nossos Cursos
          </h2>
          <p className="text-gray-600 text-lg">
            Escolha o curso que mais se adapta aos seus objetivos profissionais
          </p>
        </div>

        {/* Course Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)`,
              }}
            >
              {courses.map((course, index) => (
                <div
                  key={course.id}
                  className={`${
                    isMobile ? "min-w-full" : "min-w-0 w-1/3"
                  } px-4 flex-shrink-0`}
                >
                  <Card className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow animate-fade-in h-full flex flex-col">
                    <img
                      src={course.image}
                      alt={course.name}
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-semibold text-educavales-primary mb-2">
                        {course.name}
                      </h3>
                      <p className="text-gray-600 mb-4 flex-1 line-clamp-3">{course.description}</p>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-2xl font-bold text-educavales-secondary">
                          R$ {course.price}
                        </span>
                        <span className="text-gray-500 text-lg">
                          {course.duration}
                        </span>
                      </div>
                      <Button
                        onClick={() => handleEnroll(course.name)}
                        className="w-full bg-educavales-secondary hover:bg-educavales-secondary/90 text-white py-3 font-semibold mt-auto"
                      >
                        Inscreva-se
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Navigation */}
          <Button
            onClick={previousSlide}
            variant="outline"
            size="icon"
            className="hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full hover:bg-gray-50"
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            onClick={nextSlide}
            variant="outline"
            size="icon"
            className="hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full hover:bg-gray-50"
            disabled={currentSlide >= maxSlides - 1}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Mobile Navigation Dots */}
        {isMobile && (
          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              {courses.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide
                      ? "bg-educavales-secondary"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
