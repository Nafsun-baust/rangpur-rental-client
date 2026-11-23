import ProfileEditor from "@/components/shared/ProfileEditor";
import { getMyProfile } from "@/lib/actions/users";
import { requireRole } from "@/lib/core/server";

export default async function CustomerProfilePage() {
  const session = await requireRole("customer");
  const profile = (await getMyProfile()) || {
    _id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    image: session.user.image || "",
    role: "customer" as const,
    phone: "",
    address: "",
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your personal details and contact information.
        </p>
      </div>
      <ProfileEditor initialProfile={profile} />
    </div>
  );
}
