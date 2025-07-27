import { Button } from "@imphnen-frontend-service/ui/atoms";
import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <section className="relative w-full z-0 py-20 md:py-28 lg:py-32">
      {/* Background gradients and shapes */}
      <div className="absolute inset-0 -z-10 overflow-x-clip hidden md:block">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="absolute top-10 -left-64 size-[448px] bg-primary-200 rounded-full justify-center items-center hidden lg:flex"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true }}
            className="size-[296px] bg-primary-50 rounded-full"
          />
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="absolute top-3/5 -right-56 size-96 bg-primary-500 rounded-full flex justify-center items-center lg:top-1/2 lg:-right-64 lg:size-[600px]"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true }}
            className="size-64 bg-primary-50 rounded-full lg:size-[400px]"
          />
        </motion.div>

        <div className="absolute -top-28 -left-20 size-[248px] bg-radial from-primary-300 rounded-full blur-3xl" />
        <div className="absolute top-0 -right-72 size-[480px] bg-radial from-primary-400 rounded-full blur-[80px]" />
      </div>

      <div className="flex flex-col items-center gap-y-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-y-6"
        >
          <h1 className="text-2xl font-semibold text-primary-500 md:text-4xl md:font-bold lg:text-5xl">DIMENTORIN</h1>
          <p className="max-w-52 text-center font-semibold text-xl leading-tight text-primary-500 md:max-w-72 lg:text-4xl lg:max-w-lg">
            Learn IT smarter with AI & expert mentors!
          </p>
          <p className="max-w-3xs text-xs text-neutral-500 text-center font-medium md:max-w-lg md:text-base lg:text-lg lg:max-w-[646px]">
            Apakah kamu siap untuk grind skill TI-mu ke level Ultimate? Dengan AI sebagai navigator dan mentor profesional sebagai sensei-mu, perjalanan belajarmu akan lebih cepat, efektif, dan penuh EXP!
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}>
          <Button
            type="button"
            size="sm"
            className="text-[10px] h-auto px-2.5 py-2 md:text-sm"
          >
            Belajar Dengan AI Sekarang
          </Button>
        </motion.div>
      </div>
    </section>
  )
}