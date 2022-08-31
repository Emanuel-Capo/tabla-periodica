export interface Elemento {
    simbolo:string,
    nombre   :string,
    nAtom    :number,
    tipo     :string,
    diatomico?:boolean,
    valenciaM?:number[],
    valenciaNM?:number[],
    valenciaH?:number,
    nomenclatura?:string,
    acEspecial3?:string[],
    acEspecial5?:string[]
}
