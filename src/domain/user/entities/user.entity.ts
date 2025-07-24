export class User {
    private id: number;
    private name: string;
    private email: string;
    private password: string;
    private image: string;

    constructor(id: number, name: string, email: string, password: string, image: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.image = image;
    }
}