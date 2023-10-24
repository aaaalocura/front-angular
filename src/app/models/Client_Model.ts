export interface Padre {
  Nombre: string;
  Apellido: string;
  Apellido_2: string;
  Telefono: string;
  Direccion: string;
  Hijos: Alumno[];
}
export interface Alumno {
  Nombre: string;
  Apellido: string;
  Apellido_2: string;
  Grado: string;
  Escuela: string;
  Grupo: string;
}
