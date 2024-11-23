import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function ContactUs() {
  return (
    <div dir="rtl" className="min-h-screen p-10 md:px-20 lg:px-40">
      <h2 className="font-bold text-4xl text-primary text-center mb-10">
        צור קשר
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 items-center justify-center">
        {/* GitHub */}
        <Link
          href="https://github.com/MaorAtar"
          target="_blank"
          className="flex flex-col items-center gap-4 text-primary hover:text-primary transition duration-300"
        >
          <span className="text-2xl font-semibold">GitHub</span>
          <Image src="/github.png" alt="github" width={250} height={250} />
        </Link>

        {/* LinkedIn */}
        <Link
          href="https://www.linkedin.com/in/maoratar/"
          target="_blank"
          className="flex flex-col items-center gap-4 text-primary hover:text-primary transition duration-300"
        >
          <span className="text-2xl font-semibold">LinkedIn</span>
          <Image src="/linkedin.png" alt="linkedin" width={200} height={200} />
        </Link>

        {/* Email */}
        <Link
          href="mailto:maoratar17@gmail.com"
          className="flex flex-col items-center gap-4 text-primary hover:text-primary transition duration-300"
        >
          <span className="text-2xl font-semibold">Email</span>
          <Image src="/gmail.png" alt="gmail" width={150} height={150} />
        </Link>
      </div>
    </div>
  );
}

export default ContactUs;
