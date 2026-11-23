import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMyEquipment } from "@/lib/actions/equipment";
import OwnerEquipmentTable from "./_components/OwnerEquipmentTable";

export default async function OwnerMyEquipmentPage() {
  const items = await getMyEquipment();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Equipment</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your listed tools, stock counts, and approval statuses.
          </p>
        </div>
        <Link href="/dashboard/owner/add-equipment">
          <Button className="gap-1.5">
            <PlusCircle className="size-4" />
            Add Equipment
          </Button>
        </Link>
      </div>

      <OwnerEquipmentTable initialItems={items} />
    </div>
  );
}
