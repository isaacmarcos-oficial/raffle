'use client'

import { motion } from 'framer-motion'

type LoadingSpinnerProps = {
  size?: number
  color?: string
}

const LoadingSpinner = ({ size = 24, color = 'currentColor' }: LoadingSpinnerProps) => {
  return (
    <div role="status" aria-label="Loading" className="flex items-center justify-center">
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <motion.circle
          cx="12"
          cy="12"
          r="10"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0.2, opacity: 0.2 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </motion.svg>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export { LoadingSpinner }