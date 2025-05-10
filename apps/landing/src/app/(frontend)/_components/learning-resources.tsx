'use client';

import { Icon } from '@iconify/react';
import { Button } from '@imphnen-frontend-service/shadcn-ui/atoms';
import { LearningResourcesSection } from 'apps/landing/src/payload-types';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function LearningResources(props: LearningResourcesSection) {
  const { resources, featured, title, description } = props;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="sumber-belajar"
      className="w-full py-20 md:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/5 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-blue-400/5 to-transparent blur-3xl" />
      </div>
      <div className="container px-4 md:px-6" ref={ref}>
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight lg:text-5xl">
              {title}
            </h2>
            <p className="max-w-[800px] mx-auto text-muted-foreground md:text-lg">
              {description}
            </p>
          </motion.div>
        </div>
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {resources.map((r, i) => (
            <motion.div
              key={i}
              className="group relative overflow-hidden rounded-xl border bg-background p-6 hover:shadow-lg"
              variants={itemVariants}
            >
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary/50 to-blue-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <Icon
                    icon={r.icon}
                    className="h-6 w-6 text-blue-600 dark:text-blue-400"
                  />
                </div>
                <h3 className="mb-2 text-xl font-bold">{r.title}</h3>
                <p className="mb-6 text-muted-foreground">{r.description}</p>
                <a href={r.buttonLink} target="_blank">
                  <Button
                    variant="link"
                    className="p-0 h-auto font-medium text-primary hover:text-primary/80"
                  >
                    {r.buttonText}
                    <Icon icon="tabler:arrow-right" className="h-6 w-6" />
                  </Button>
                </a>
              </div>
              <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-gradient-to-tl from-primary/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:-translate-y-10 group-hover:-translate-x-10" />
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="mt-20 rounded-xl overflow-hidden border bg-background/50 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4 w-fit">
                {featured.label}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                {featured.title}
              </h3>
              <p className="text-muted-foreground mb-6">
                {featured.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <a href={featured.primaryButtonLink} target="_blank">
                  <Button className="bg-gradient-to-r from-primary to-blue-400 hover:from-primary/90 hover:to-blue-400/90 font-bold text-black hover:text-white cursor-pointer">
                    {featured.primaryButtonText}
                  </Button>
                </a>
                <a href={featured.secondaryButtonLink} target="_blank">
                  <Button variant="outline">
                    {featured.secondaryButtonText}
                  </Button>
                </a>
              </div>
            </div>
            <div className="relative h-64 md:h-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-400/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-background transition-colors">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-primary border-b-8 border-b-transparent ml-1" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
