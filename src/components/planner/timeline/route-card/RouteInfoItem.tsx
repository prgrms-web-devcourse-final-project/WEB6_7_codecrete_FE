interface RouteInfoItemProps {
  label: string;
  value: string | number;
}

export default function RouteInfoItem({ label, value }: RouteInfoItemProps) {
  return (
    <div className="flex flex-col">
      <h5 className="text-muted-foreground text-xs font-medium">{label}</h5>
      <p className="text-text-main text-sm font-semibold">{value}</p>
    </div>
  );
}
