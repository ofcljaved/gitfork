import { CardContent } from "@/components/ui/card";
import Image from "next/image";
import { BaseUserCard } from "@/components/user/base-card";
import { StatsCard } from "@/components/user/stats-card";
import { UserData, UserStars } from "@/lib/fetchUserDetails";
//import { ForkStatsCard } from "@/components/user/suspense-fork";

export const SmallUserCard = async ({ user, userStars }: { user: UserData, userStars: UserStars }) => {

    return (
        <BaseUserCard>
            <CardContent className="p-0 grid grid-cols-[auto_1fr] items-center gap-6">
                <Image
                    width={164}
                    height={164}
                    src={user.avatarUrl}
                    alt="Profile"
                    priority
                    loading="eager"
                    className="w-16 h-16 rounded-lg shadow-sm border border-primary"
                />
                <div className="grid items-start">
                    <h2 className="text-2xl font-bold col-span-full">{user.name}</h2>
                    <div className="flex flex-wrap gap-x-4">
                        <StatsCard label="Repositories" value={user.publicRepos} small />
                        <StatsCard label="Followers" value={user.followers} small />
                        {/*<Suspense fallback={<div>Loading forks...</div>}>
                            <ForkStatsCard query={query} />
                        </Suspense>*/}
                        <StatsCard label="Stars" value={userStars.totalStars} small />
                    </div>
                </div>
            </CardContent>
        </BaseUserCard>
    );
}

