import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';

export default function Mode({ mode, setMode, setError }) {
  return (
    <div>
      <ToggleGroup type="single">
        <ToggleGroupItem value="change">Change</ToggleGroupItem>
        <ToggleGroupItem value="simulation">Simulation</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
