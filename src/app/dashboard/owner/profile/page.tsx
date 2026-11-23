import ProfileEditor from "@/components/shared/ProfileEditor";
import { getMyProfile } from "@/lib/actions/users";
import { requireRole } from "@/lib/core/server";

export default async function OwnerProfilePage() {
  const session = await requireRole("owner");
  const profile = (await getMyProfile()) || {
    _id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    image: session.user.image || "",
    role: "owner" as const,
    phone: "",
    address: "",
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Keep your owner contact details up to date for renters.
        </p>
      </div>
      <ProfileEditor initialProfile={profile} />
    </div>
  );
}
