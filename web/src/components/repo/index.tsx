import { fetchUserRepos } from "@/lib/fetchUserDetails";
import { NO_OF_REPOS } from "@/constant";
import { RepoList } from "@/components/repo/repo-list";

export const Repo = async ({ query }: { query: string }) => {
    const repos = await fetchUserRepos(query);
    if (!repos) return;

    return (
        <div className="grid md:grid-cols-2 gap-6">
            <RepoList title="Original Repositories" username={query} repos={repos.notForkedRepos} noOfRepos={NO_OF_REPOS} />
            <RepoList title="Forked Repositories" username={query} repos={repos.forkedRepos} noOfRepos={NO_OF_REPOS} forked />
        </div>
    );
}
