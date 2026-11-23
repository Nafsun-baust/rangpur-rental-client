import { getAllAdminEquipment } from "@/lib/actions/equipment";
import AdminEquipmentTable from "./_components/AdminEquipmentTable";

export default async function AdminEquipmentPage() {
  const items = await getAllAdminEquipment();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">All Equipment</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Approve, reject, edit, or delete equipment submitted by owners.
        </p>
      </div>

      <AdminEquipmentTable initialItems={items} />
    </div>
  );
}
