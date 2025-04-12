export interface Plan {
    id?: number;
    titulo: string;
    descripcion: string;
    usuarios: number;
    clientes: number;   
    pagoMensual: number;
    pagoAnual: number;
}