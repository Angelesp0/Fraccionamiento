export class Order {
    id_orders?: number;
    users_id_users?: number;
    address: string;
    phone: number;
    contact: string;
    hour: string;
    date: Date;
    services: string;
    description: string;
    cargo: number;
    $_material?: number;
    $_service?: number;
    $_total?: number;
    payment_method: string;
    finish_date?: Date;
    Finish_hour?: string;
    id_employee: number;
}
