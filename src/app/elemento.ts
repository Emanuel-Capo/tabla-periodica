export interface Elemento {
    simbolo:string,
    nombre   :string,
    nAtom    :number,
    tipo     :string,
    diatomico?:boolean,
    valencia?:number[],
    valenciaNM?:number[],
    nomenclatura?:string    
}
