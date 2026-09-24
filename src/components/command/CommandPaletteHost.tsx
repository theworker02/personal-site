import { getCommandItems } from "@/lib/search";
import { CommandPalette } from "@/components/command/CommandPalette";

export async function CommandPaletteHost() {
  const items = await getCommandItems();
  return <CommandPalette items={items} />;
}
