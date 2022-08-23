import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Elemento } from '../elemento';

@Component({
  selector: 'app-reacciones',
  templateUrl: './reacciones.component.html',
  styleUrls: ['./reacciones.component.css']
})
export class ReaccionesComponent implements OnInit {

@Input() elementos!:Elemento[]

@Input() elemento:Elemento={
  nombre:'',
simbolo:'',
nAtom:0,
tipo:'',
valencia:[],
diatomico:false,
nomenclatura:''}

@Input() itsOK:boolean=false

valElem!:number
reaccionForm!:string

metales:Elemento[]=[]
noMetales:Elemento[]=[]
noMetalesHid:Elemento[]=[]
salMetal!:Elemento
salNoMetal!:Elemento
valSalMetal!:number
valSalNoMetal!:number

miFormulario:FormGroup=this.fb.group({
valencia:[,Validators.required],
reaccion:['',Validators.required],
salElem:{},
salValencia:0
})


  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.listaTipo()
  }

  listaTipo(){
    for (const elem of this.elementos) {
      if (elem.tipo=='M' && elem.valencia){this.metales.push(elem)}
      if (elem.tipo=='NM' && elem.valencia){this.noMetales.push(elem)}
      if (elem.simbolo=='S' || elem.simbolo=='F' || elem.simbolo=='Cl' || elem.simbolo=='Br' || elem.simbolo=='I'){this.noMetalesHid.push(elem)}
    }
  }

guardar(){
  this.itsOK=true
  this.valElem=this.miFormulario.value.valencia
  this.reaccionForm=this.miFormulario.value.reaccion
  if (this.reaccionF('acido ')){this.elemento.valencia=this.elemento.valenciaNM}
  if (this.reaccion('sal') || this.reaccion('sal de hidracido')){this.sal()}
  this.reset()
}

reset(){
  this.miFormulario.reset({
    valencia:null,
    reaccion:'',
    salElem:{},
    salValencia:0
    })
}

reaccion(tipo:string):boolean{
  return this.reaccionForm==tipo
}

reaccionF(tipo:string):boolean{
  return this.miFormulario.value.reaccion==tipo
}


sal(){
  if (this.elemento.tipo=='M'){
    this.salMetal=this.elemento
    this.valSalMetal=this.miFormulario.value.valencia
    this.salNoMetal=this.miFormulario.value.salElem
    this.valSalNoMetal=this.miFormulario.value.salValencia
  }
  if (this.elemento.tipo!=='M'){
    this.salNoMetal=this.elemento
    this.valSalNoMetal=this.miFormulario.value.valencia
    this.salMetal=this.miFormulario.value.salElem
    this.valSalMetal=this.miFormulario.value.salValencia
  }
}

diatom():boolean{
return this.elemento.diatomico==true
}

par(tipo:string):boolean{
  if (tipo=='e') return (this.valElem%2)==0
  if (tipo=='m') return (this.valSalMetal%2)==0
  if (tipo=='nm')return (this.valSalNoMetal%2)==0
  else return false
}

siEs(tipo:string, n:number):boolean{
  if (tipo=='e') return (this.valElem==n)
  if (tipo=='m') return (this.valSalMetal==n)
  if (tipo=='nm')return (this.valSalNoMetal==n)
  else return false
}

esElem(el:string):boolean{
  return (this.elemento.simbolo==el)
}

metal():boolean{
  return (this.elemento.tipo=='M') 
}

formaHidracido():boolean{
 return (this.esElem('S') || this.esElem('F') || this.esElem('Cl') || this.esElem('Br') || this.esElem('I'))
}


valLength(tipo:string, n:number):boolean{
  if (tipo=='e') return this.elemento.valencia?.length==n
  if (tipo=='m') return this.salMetal.valencia?.length==n
  if (tipo=='nm') return this.salNoMetal.valencia?.length==n
  else return false
}

esVal(tipo:string, pos:number):boolean{
  if (tipo=='e') return (this.valElem==this.elemento.valencia![pos])
  if (tipo=='m') return (this.valSalMetal==this.salMetal.valencia![pos])
  if (tipo=='nm') return (this.valSalNoMetal==this.salNoMetal.valencia![pos])
  else return false
}


}
