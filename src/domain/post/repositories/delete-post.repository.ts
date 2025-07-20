export interface DeletePostsRepository {
    execute(ids: number[]): Promise<void | null>
}