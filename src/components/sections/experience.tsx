import { AWARDS, EDUCATION, EXPERIENCE, SkillNames, SKILLS } from "@/data/constants";
import { SectionHeader } from "./section-header";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import SectionWrapper from "../ui/section-wrapper";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ExperienceSection = () => {
  return (
    <>
      <SectionWrapper
        id="education"
        className="flex flex-col items-center justify-center py-20 z-10"
      >
        <div className="w-full max-w-4xl px-4 md:px-8 mx-auto">
          <SectionHeader
            id="education"
            title="Education"
            desc="Academic background."
            className="mb-12 md:mb-20 mt-0"
          />
          <div className="flex flex-col gap-8">
            {EDUCATION.map((education) => (
              <Card
                key={education.school}
                className="pointer-events-auto bg-card text-card-foreground border-border shadow-sm"
              >
                <CardHeader className="pb-3">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-1">
                      <CardTitle className="text-xl font-bold tracking-tight">
                        {education.school}
                      </CardTitle>
                      <div className="text-base font-medium text-muted-foreground">
                        {education.degree}
                      </div>
                    </div>
                    <Badge variant="secondary" className="w-fit font-mono text-xs font-normal">
                      {education.expected}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-base text-muted-foreground">
                    GPA {education.gpa}
                  </p>
                  <ul className="list-disc list-outside ml-4 space-y-2 text-base text-muted-foreground leading-relaxed">
                    {education.coursework.map((course) => (
                      <li key={course}>{course}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper
        id="experience"
        className="flex flex-col items-center justify-center min-h-[120vh] py-20 z-10"
      >
        <div className="w-full max-w-4xl px-4 md:px-8 mx-auto">
          <SectionHeader
            id="experience"
            title="Experience"
            desc="My professional journey."
            className="mb-12 md:mb-20 mt-0"
          />

          <div className="flex flex-col gap-8 md:gap-12 relative">
            {/* Connector Line - simplified to a subtle border */}
            <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-px bg-border hidden md:block -translate-x-1/2" />

            {EXPERIENCE.map((exp, index) => (
              <div key={exp.id} className="relative">
                <ExperienceCard experience={exp} index={index} />
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Awards Section — separate wrapper so it fades independently */}
      <SectionWrapper
        id="awards"
        className="flex flex-col items-center justify-center py-20 z-10"
      >
        <div className="w-full max-w-4xl px-4 md:px-8 mx-auto">
          <SectionHeader
            id="awards"
            title="Awards"
            desc="Competitions and achievements."
            className="mb-12 md:mb-20 mt-0"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <Card className="pointer-events-auto bg-card text-card-foreground border-border shadow-sm">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {AWARDS.map((award, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4"
                    >
                      <Badge variant="secondary" className="font-mono text-xs font-normal whitespace-nowrap shrink-0 mt-1">
                        {award.year}
                      </Badge>
                      <span className="text-base text-muted-foreground leading-relaxed">
                        {award.title}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </SectionWrapper>
    </>
  );
};

const ExperienceCard = ({
  experience,
  index,
}: {
  experience: (typeof EXPERIENCE)[0];
  index: number;
}) => {
  const doiText = "DOI: 10.36838/v7i4.29";
  const paperUrl =
    "https://terra-docs.s3.us-east-2.amazonaws.com/IJHSR/Articles/volume7-issue4/IJHSR_2025_74_29.pdf";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <Card
        className={cn(
          "bg-card text-card-foreground border-border",
          "pointer-events-auto",
          "hover:border-primary/20 transition-colors duration-300",
          "shadow-sm hover:shadow-md"
        )}
      >
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold tracking-tight">
                {experience.title}
              </CardTitle>
              <div className="text-base font-medium text-muted-foreground">
                {experience.company}
              </div>
            </div>
            <Badge variant="secondary" className="w-fit font-mono text-xs font-normal">
              {experience.startDate} - {experience.endDate}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <ul className="list-disc list-outside ml-4 space-y-2 text-base text-muted-foreground leading-relaxed">
            {experience.description.map((point, i) => (
              <li key={i}>
                {point.includes(doiText) ? (
                  <>
                    {point.split(doiText)[0]}
                    <a
                      href={paperUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      {doiText}
                    </a>
                    {point.split(doiText)[1]}
                  </>
                ) : (
                  point
                )}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {experience.skills.map((skillName) => {
              const skill = SKILLS[skillName as SkillNames];
              return (
                <Badge
                  key={skillName}
                  variant="outline"
                  className="gap-2 text-xs font-normal bg-secondary/30 hover:bg-secondary/50 transition-colors border-transparent"
                >
                  <img
                    src={skill.icon}
                    alt={skill.label}
                    className="w-3.5 h-3.5 object-contain opacity-80"
                  />
                  {skill.label}
                </Badge>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExperienceSection;
