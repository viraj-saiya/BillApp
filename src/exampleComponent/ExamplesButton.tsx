import { Button } from "../commoncomponents/buttons/button";

export const ButtonExamples: React.FC = () => {
  const handleClick = () => console.log('Button clicked!');
  
  const DownloadIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );

  return (
    <div className="p-6 space-y-4">
      <h3 className="text-lg font-semibold">Button Examples</h3>
      
      {/* Basic buttons */}
      <div className="flex flex-wrap gap-2">
        <Button onClick={handleClick}>Primary</Button>
        <Button variant="secondary" onClick={handleClick}>Secondary</Button>
        <Button variant="outline" onClick={handleClick}>Outline</Button>
        <Button variant="ghost" onClick={handleClick}>Ghost</Button>
        <Button variant="danger" onClick={handleClick}>Danger</Button>
      </div>

      {/* Sizes */}
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" onClick={handleClick}>Small</Button>
        <Button size="md" onClick={handleClick}>Medium</Button>
        <Button size="lg" onClick={handleClick}>Large</Button>
      </div>

      {/* With icons */}
      <div className="flex flex-wrap gap-2">
        <Button leftIcon={<DownloadIcon />} onClick={handleClick}>
          Download
        </Button>
        <Button rightIcon={<DownloadIcon />} onClick={handleClick}>
          Download
        </Button>
        <Button 
          leftIcon={<DownloadIcon />} 
          rightIcon={<DownloadIcon />} 
          onClick={handleClick}
        >
          Both Icons
        </Button>
      </div>

      {/* States */}
      <div className="flex flex-wrap gap-2">
        <Button disabled onClick={handleClick}>Disabled</Button>
        <Button loading onClick={handleClick}>Loading</Button>
        <Button fullWidth onClick={handleClick}>Full Width</Button>
      </div>
    </div>
  );
};