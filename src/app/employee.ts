export class Employee {
    id?: String; //optional (will be null when creating)
    name: string;
    email: string;
    created_at?:Date;
    updated_at?:Date;
}