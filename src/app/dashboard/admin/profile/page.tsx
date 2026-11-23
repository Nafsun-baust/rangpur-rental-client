import ProfileEditor from "@/components/shared/ProfileEditor";
import { getMyProfile } from "@/lib/actions/users";
import { requireRole } from "@/lib/core/server";

export default async function AdminProfilePage() {
  const session = await requireRole("admin");
  const profile = (await getMyProfile()) || {
    _id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    image: session.user.image || "",
    role: "admin" as const,
    phone: "",
    address: "",
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Update your admin profile details.
        </p>
      </div>
      <ProfileEditor initialProfile={profile} />
    </div>
  );
}
