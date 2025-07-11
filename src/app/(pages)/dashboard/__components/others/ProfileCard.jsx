"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

export const ProfileCard = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return <div>User not signed in</div>;

  return (
    <Card className="p-4 rounded-xl shadow-sm flex items-center gap-4">
      <Image
        src={user.imageUrl}
        alt="Profile Picture"
        width={60}
        height={60}
        className="rounded-full border"
      />
      <div>
        <h2 className="text-lg font-semibold">{user.fullName}</h2>
        <p className="text-sm text-gray-600">
          {user.primaryEmailAddress.emailAddress}
        </p>
      </div>
    </Card>
  );
};
