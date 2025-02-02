import { RepoList } from "@/components/repo-list";
import { fetchUserDetails, Repo } from "@/lib/fetchUserDetails";
import { UserCard } from "@/components/user-card";
import { ITEMS_PER_PAGE, REPO_TYPE } from "@/constant";
import { RepoPagination } from "./repo-pagination";
import { parseParams, parseSearchParams } from "@/lib/url-state";
import { redirect } from "next/navigation";

export default async function Page(
    props: {
        params: Promise<Record<string, string | undefined>>
        searchParams: Promise<Record<string, string | undefined>>
    }) {
    const params = await props.params;
    const parsedParams = parseParams(params);
    const searchParams = await props.searchParams;
    const parsedSearchParams = parseSearchParams(searchParams);

    if (!parsedParams.isValid) {
        return (
            <h1>Something went wrong, path: {parsedParams.type}</h1>
        );
    }

    const { name: q, page } = parsedSearchParams;

    const user = q ? await fetchUserDetails(q) : null;
    if (!user) return <h1>User not found</h1>;

    type RepoListType = {
        repos: Repo[];
        title: string;
        forked: boolean;
    }

    let repoList: RepoListType = {
        repos: [],
        title: '',
        forked: false,
    };

    if (params.type === REPO_TYPE.original) {
        repoList = {
            repos: user.notForkedRepos,
            title: 'Original Repositories',
            forked: false,
        }
    } else if (params.type === REPO_TYPE.forked) {
        repoList = {
            repos: user.forkedRepos,
            title: 'Forked Repositories',
            forked: true,
        }
    }

    const totalPages = Math.ceil(repoList.repos.length / ITEMS_PER_PAGE);
    if (page && !Number(page) || Number(page) > totalPages || Number(page) < 1) {
        redirect(`/repos/${params.type}?name=${q}`);
    }

    const currentPage = Math.max(1, Number(page) || 1);
    const pageStart = (Math.min(currentPage, totalPages) - 1) * ITEMS_PER_PAGE;
    const pageEnd = pageStart + ITEMS_PER_PAGE;

    repoList.repos = repoList.repos.slice(pageStart, pageEnd);
    return (
        <>
            <UserCard user={user} small />
            <RepoList
                title={repoList.title}
                repos={repoList.repos}
                forked={repoList.forked}
            />
            <RepoPagination
                currentPage={currentPage}
                totalPages={totalPages}
                params={parsedParams}
                searchParams={parsedSearchParams}
            />
        </>
    );
}
