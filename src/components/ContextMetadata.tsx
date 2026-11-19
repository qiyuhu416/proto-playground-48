import { Panel } from "@/components/system";
interface ContextMetadataProps {
  duration?: string;
  role?: string;
  deliverables?: string;
  collaboration?: string;
  [key: string]: string | undefined;
}

export const ContextMetadata = (props: ContextMetadataProps) => {
  const entries = Object.entries(props).filter(([_, value]) => value);

  return (
    <Panel kind="callout" className="my-6 text-sm">
      {entries.map(([key, value]) => (
        <p key={key} className="m-0">
          <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
        </p>
      ))}
    </Panel>
  );
};
