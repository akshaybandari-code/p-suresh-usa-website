import { motion } from 'motion/react';

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-10 h-10 border-4 border-amber-500/20 border-t-amber-500 rounded-full"
      />
      <span className="mt-4 text-xs font-mono text-gray-500 dark:text-zinc-400 tracking-wider">
        COMPILING RESULTS...
      </span>
    </div>
  );
}
