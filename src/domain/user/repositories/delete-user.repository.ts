export interface DeleteUserRepository {
    execute(id: number): Promise<void | null>
}