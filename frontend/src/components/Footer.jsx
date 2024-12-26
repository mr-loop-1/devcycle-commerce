import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="mx-4 md:mx-auto md:w-[80%] lg:w-[70%] mt-20 h-40 bg-blue-700 text-white">
      <div className="text-center font-semibold text-xl">
        <Link
          to="https://dev.to/iabdsam/devcycle-commerce-live-sale-2epg"
          target="_blank"
        >
          read the post on dev.to here
          <ArrowUpRight className="inline w-6 h-6" />
        </Link>
      </div>
      <div className="mt-2"></div>
    </div>
  );
}
