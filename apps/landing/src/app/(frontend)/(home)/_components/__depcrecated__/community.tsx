'use client';

import { CommunitiesSection } from '@/payload-types';
import { Button } from '@components/atoms';
import { Icon } from '@iconify/react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function Community(props: CommunitiesSection) {
  const { items, stats } = props;
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
      id="community"
      className="w-full py-20 md:py-32 bg-muted relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.01)_1px,transparent_1px)] bg-[size:14px_14px]" />
      </div>
      <div className="container px-4 md:px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight lg:text-5xl text-center mb-4">
            Komunitas{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
              Kami
            </span>
          </h2>
          <p className="max-w-[800px] mx-auto text-muted-foreground text-center md:text-lg">
            Bergabunglah dengan ribuan programmer Indonesia yang saling membantu
            dan berbagi pengalaman.
          </p>
        </motion.div>
        <motion.div
          className="grid gap-8 md:grid-cols-3 mt-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {items?.map((c, i) => (
            <motion.div
              key={i}
              className="group relative overflow-hidden rounded-xl border bg-background p-6 transition-all hover:shadow-xl"
              variants={itemVariants}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <Icon
                    icon={c.iconName}
                    className="h-6 w-6 text-blue-600 dark:text-blue-400"
                  />
                </div>
                <h3 className="mb-2 text-xl font-bold">{c.title}</h3>
                <p className="mb-6 text-muted-foreground">{c.description}</p>
                <Button
                  variant="outline"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                  onClick={() => window.open(c.buttonLink, '_blank')}
                >
                  {c.buttonText}
                </Button>
              </div>
              <div className="absolute -bottom-1 -right-1 w-20 h-20 bg-gradient-to-tl from-primary/20 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {stats?.map((s, i) => (
            <div key={i} className="space-y-2">
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
                {s.value}
              </div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
