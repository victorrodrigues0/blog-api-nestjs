export interface DeletePostRepository {
    execute(id: number): Promise<void | null>
}