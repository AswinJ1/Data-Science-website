"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import caseStudiesData from "@/data/case_study.json";

interface CaseStudy {
  id: number;
  company: string;
  client: string;
  title: string;
  subtitle: string;
  image: string;
  overview: string;
  impact: {
    description: string;
    metrics: Array<{ value: string; label: string }>;
  };
  opportunity: {
    description: string;
    points: string[];
  };
  solution: {
    description: string;
    approaches: Array<{ title: string; description: string }>;
  };
  tools: string;
  takeaway: string;
}

export default function CaseStudyPage() {
  const params = useParams();
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);

  useEffect(() => {
    const id = parseInt(params.id as string);
    const study = caseStudiesData.find((study) => study.id === id);
    setCaseStudy(study || null);
  }, [params.id]);

  if (!caseStudy) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-600">
          Case Study Not Found
        </h1>
        <p className="text-base sm:text-lg text-slate-600 mt-4">
          The requested case study does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white text-slate-900 min-h-screen">
      {/* Hero Section with Image */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Image */}
          <div className="mb-8 sm:mb-12">
            <img
              src={caseStudy.image}
              alt={caseStudy.title}
              className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-2xl"
            />
          </div>
          
          {/* Hero Text */}
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              {caseStudy.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              {caseStudy.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="max-w-5xl mx-auto py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <Card className="shadow-md border border-slate-200">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-xl sm:text-2xl">
              Client Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
              {caseStudy.overview}
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Impact Section */}
      <section className="bg-blue-50 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4 sm:mb-6">
            Impact
          </h2>
          <p className="text-slate-700 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
            {caseStudy.impact.description}
          </p>
          <Card className="border-blue-200">
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 py-4 sm:py-6">
              {caseStudy.impact.metrics.map((metric, index) => (
                <div key={index} className="text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-blue-900">
                    {metric.value}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base">
                    {metric.label}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Opportunity Section */}
      <section className="max-w-5xl mx-auto py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4 sm:mb-6">
          Opportunity
        </h2>
        <p className="text-slate-700 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
          {caseStudy.opportunity.description}
        </p>
        <Card className="border border-slate-200 shadow-sm">
          <CardContent className="py-4 sm:py-6">
            <ul className="list-disc pl-4 sm:pl-6 space-y-2 text-slate-700 text-sm sm:text-base">
              {caseStudy.opportunity.points.map((point, index) => (
                <li key={index} className="leading-relaxed">
                  {point}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Solution Section */}
      <section className="bg-blue-50 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4 sm:mb-6">
            Solution
          </h2>
          <p className="text-slate-700 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
            {caseStudy.solution.description}
          </p>
          <Card className="border-blue-200">
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 py-4 sm:py-6">
              {caseStudy.solution.approaches.map((approach, index) => (
                <div key={index} className="p-2 sm:p-0">
                  <h3 className="font-semibold text-blue-800 mb-2 text-base sm:text-lg">
                    {approach.title}
                  </h3>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    {approach.description}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tools Section */}
      <section className="max-w-5xl mx-auto py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4 sm:mb-6">
          Tools & Technologies
        </h2>
        <Card className="border border-slate-200 shadow-sm">
          <CardContent className="py-4 sm:py-6">
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              {caseStudy.tools}
            </p>
          </CardContent>
        </Card>
      </section>

      <Separator className="my-8 sm:my-12" />

      {/* Key Takeaway */}
      <section className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 md:pb-20">
        <p className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-900 leading-relaxed">
          {caseStudy.takeaway}
        </p>
      </section>
    </div>
  );
}
