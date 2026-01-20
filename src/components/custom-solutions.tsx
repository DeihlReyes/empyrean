import Link from "next/link";

export default function CustomSolutions() {
  return (
    <div className="bg-[#494949] text-white py-12 px-8 w-full md:px-16 rounded-lg text-start flex flex-col items-start justify-start">
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-4">NEED A CUSTOM SOLUTION?</h2>

        <p className="text-[14px] md:text-base text-justify mb-8">
          Let&rsquo;s talk! Our company is built on fostering quality
          relationships to observe the <strong>Empyrean Mark</strong>.
          We&rsquo;d love to get to know you better so we can assess and
          evaluate how can we work together and tailor up arrangements
          personalised for you!
        </p>

        <Link
          href="/contact-us"
          className="inline-block bg-white text-[#494949] px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors"
        >
          CONTACT US
        </Link>
      </div>
    </div>
  );
}
