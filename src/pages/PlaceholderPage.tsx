import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui';

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export const PlaceholderPage = ({ title, description }: PlaceholderPageProps) => {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">{title}</span>
          </h1>
          <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
            {description}
          </p>
          <Link to="/">
            <Button variant="secondary" icon={<ArrowLeft size={18} />}>
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
