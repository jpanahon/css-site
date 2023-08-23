import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LinkDiscordButton from "@/components/discord/LinkDiscordButton";
import UnlinkDiscordButton from "@/components/discord/UnlinkDiscordButton";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";

export default async function DiscordPage() {
  const session = await getServerSession(authOptions);
  const discordAccount = await prisma.discordAccount.findFirst({
    where: { userId: session?.user?.id },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      {session ? (
        <>
          <span className="text-xl">Welcome, {session.user?.name}</span>
          <span className="text-xl">
            {discordAccount
              ? `Discord: ${discordAccount.username}`
              : "Discord: Not Linked"}
          </span>
          {discordAccount ? <UnlinkDiscordButton /> : <LinkDiscordButton />}
        </>
      ) : (
        <span className="text-xl">Please Sign In</span>
      )}
    </div>
  );
}
