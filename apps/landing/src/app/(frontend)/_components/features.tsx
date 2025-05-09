'use client';

import {
  BookOpenIcon,
  CodeIcon,
  LaptopIcon,
  UsersIcon,
} from '@imphnen-frontend-service/shadcn-ui/atoms';
import { FeaturesSection } from 'apps/landing/src/payload-types';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function Features(props: FeaturesSection) {
  const { heading, subheading, features } = props;

  const featuresFormatted = features?.map((f) => ({
    icon: IconMapper(String(f.icon)),
    title: f.title,
    description: f.description,
  }));

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
      id="fitur"
      className="w-full py-20 md:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-primary/5 to-blue-400/5 blur-3xl" />
      </div>

      <div className="container px-4 md:px-6" ref={ref}>
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Fitur Unggulan
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight lg:text-5xl">
              {heading}
            </h2>
            <p className="max-w-[800px] mx-auto text-muted-foreground md:text-lg">
              {subheading}
            </p>
          </motion.div>
        </div>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {featuresFormatted?.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-xl border bg-background/50 backdrop-blur-sm p-6 transition-all hover:shadow-md hover:shadow-primary/5 hover:border-primary/50"
              variants={itemVariants}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>

              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-blue-400 group-hover:w-full transition-all duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function IconMapper(name: string) {
  switch (name) {
    case 'LaptopIcon':
      return <LaptopIcon className="h-6 w-6 text-primary" />;
    case 'UsersIcon':
      return <UsersIcon className="h-6 w-6 text-primary" />;
    case 'BookOpenIcon':
      return <BookOpenIcon className="h-6 w-6 text-primary" />;
    case 'CodeIcon':
      return <CodeIcon className="h-6 w-6 text-primary" />;
    default:
      return null;
  }
}
