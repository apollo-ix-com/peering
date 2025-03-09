"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { fadeInOut } from "@/packages/lib/motion/fade-in-out";

interface ThanksProps {
  isSubmitted: boolean;
  applicationNumber?: string;
}

export const Thanks: React.FC<ThanksProps> = ({
  isSubmitted,
  applicationNumber,
}) => {
  return (
    <div className="card-inner">
      <motion.div
        animate="to"
        exit="from"
        initial="from"
        variants={fadeInOut(1.5)}
      >
        <div className="text-center">
          <h5 className="title mb-2">
            <p>
              {isSubmitted ? "You Are Done!" : "Thank You for Your Submission!"}
            </p>
          </h5>

          <h4>
            <p className={isSubmitted ? "text-success" : "text-danger"}>
              {isSubmitted
                ? "Congrats! Your application has been successfully submitted!"
                : "We have already received your submission. Thank you!"}
            </p>
          </h4>

          {applicationNumber && (
            <h5 className="text-warning">
              <p> Aplication Number: {applicationNumber}</p>
            </h5>
          )}

          <div className="gfx w-50 mx-auto mt-5">
            <Image
              alt="Thank you illustration"
              src="/images/application/thanks.svg"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
