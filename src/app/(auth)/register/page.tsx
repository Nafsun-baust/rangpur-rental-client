"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { uploadImageToImgbb } from "@/lib/imgbb";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [role, setRole] = useState<"customer" | "owner">("customer");
  const [password, setPassword] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const url = await uploadImageToImgbb(file);
      setPhotoUrl(url);
      toast.success("Photo uploaded");
    } catch {
      toast.error("Photo upload failed. You can also paste an image link.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: photoUrl || undefined,
      role,
      callbackURL: "/",
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Registration failed");
      return;
    }

    await authClient.signOut();
    toast.success("Account created! Please login to continue.");
    router.refresh();
    router.push("/login");
  };

  const handleGoogleRegister = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm sm:p-8">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Join Equipment Rental Rangpur to rent or list equipment
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-sm font-medium">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Register as</label>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setRole("customer")}
              className={`rounded-lg border px-3 py-2.5 text-left text-sm transition-colors ${
                role === "customer"
                  ? "border-primary bg-accent text-primary font-semibold"
                  : "border-input bg-background text-muted-foreground hover:bg-muted"
              }`}
            >
              <p className="font-medium">Customer</p>
              <p className="text-xs opacity-80">Rent equipment</p>
            </button>
            <button
              type="button"
              onClick={() => setRole("owner")}
              className={`rounded-lg border px-3 py-2.5 text-left text-sm transition-colors ${
                role === "owner"
                  ? "border-primary bg-accent text-primary font-semibold"
                  : "border-input bg-background text-muted-foreground hover:bg-muted"
              }`}
            >
              <p className="font-medium">Owner</p>
              <p className="text-xs opacity-80">List equipment</p>
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="photo" className="text-sm font-medium">
            Photo (Direct URL or Upload)
          </label>
          <div className="flex gap-2">
            <input
              id="photo"
              type="url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="https://..."
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <label className="inline-flex h-10 shrink-0 cursor-pointer items-center gap-1.5 rounded-md border border-input bg-secondary px-3 text-xs font-medium hover:bg-secondary/80">
              <Upload className="size-3.5" />
              {uploading ? "..." : "Upload"}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
          {photoUrl && (
            <Image
              src={photoUrl}
              alt="Profile preview"
              width={48}
              height={48}
              unoptimized
              className="mt-2 size-12 rounded-full border object-cover"
            />
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min 6 chars, upper & lowercase"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading || uploading}>
          {loading ? "Creating account..." : "Register"}
        </Button>
      </form>

      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or</span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleGoogleRegister}
      >
        Continue with Google
      </Button>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
