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
valenciaM:[],
valenciaNM:[],
valenciaH:undefined,
diatomico:false,
nomenclatura:''}

@Input() itsOK:boolean=false

metales:Elemento[]=[]
noMetales:Elemento[]=[]
noMetalesHid:Elemento[]=[]
salMetal!:Elemento
salNoMetal!:Elemento

valM!:number
valNM!:number
valH!:number
reaccionForm!:string
acidoEsp!:number

miFormulario:FormGroup=this.fb.group({
reaccion:['',Validators.required],
valencia:[,Validators.required],
acidoEsp:null,
salElem:{},
salValencia:[0]
})


  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.listaTipo()
    this.validar()     
  }

  validar(){
    this.miFormulario.get('reaccion')!.valueChanges.subscribe(R => {
    if (R==='sal' || R==='sal de hidracido') {
      this.miFormulario.controls['salValencia'].setValidators([Validators.required, Validators.min(1)]);
    } else {
      this.miFormulario.controls['salValencia'].clearValidators();
    }
    this.miFormulario.controls['salValencia'].updateValueAndValidity();

    if ((R==='acido' || R==='sal') && (this.esElem('As')||this.esElem('P')||this.esElemSal('As')||this.esElemSal('P'))) {
      this.miFormulario.controls['acidoEsp'].setValidators([Validators.required, Validators.min(1)]);
    } else {
      this.miFormulario.controls['acidoEsp'].clearValidators();
    }
    this.miFormulario.controls['acidoEsp'].updateValueAndValidity();
  });
  }

  listaTipo(){
    for (const elem of this.elementos) {
      if (elem.valenciaM){this.metales.push(elem)}
      if (elem.valenciaNM){this.noMetales.push(elem)}
      if (elem.valenciaH){this.noMetalesHid.push(elem)}
    }
  }


 



guardar(){
  this.itsOK=true
  this.reaccionForm=this.miFormulario.value.reaccion  
  if (this.reaccion('oxido basico') || this.reaccion('hidroxido'))
  {this.valM=this.miFormulario.value.valencia}
  if (this.reaccion('anhidrido') || this.reaccion('acido'))
  {this.valNM=this.miFormulario.value.valencia;
  this.acidoEsp=this.miFormulario.value.acidoEsp}
  if (this.reaccion('hidracido'))
  {this.valH=this.miFormulario.value.valencia}
  if (this.reaccion('sal') || this.reaccion('sal de hidracido')){this.sal()}
  this.reset()

  console.log(this.acidoEsp)
}

reset(){
  this.miFormulario.reset({
    valencia:null,
    reaccion:'',
    acidoEsp:null,
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
    this.valM=this.miFormulario.value.valencia
    this.salNoMetal=this.miFormulario.value.salElem
    this.valNM=this.miFormulario.value.salValencia
  }
  if (this.elemento.tipo!=='M'){
    this.salNoMetal=this.elemento
    this.valNM=this.miFormulario.value.valencia
    this.salMetal=this.miFormulario.value.salElem
    this.valM=this.miFormulario.value.salValencia
  }
  this.acidoEsp=this.miFormulario.value.acidoEsp
}

diatom():boolean{
return this.elemento.diatomico==true
}

par(tipo:string):boolean{
  if (tipo=='m') return (this.valM%2)==0
  if (tipo=='nm')return (this.valNM%2)==0
  else return false
}

siEs(tipo:string, n:number):boolean{
  if (tipo=='m') return (this.valM==n)
  if (tipo=='nm')return (this.valNM==n)
  else return false
}

esElem(el:string):boolean{
  return (this.elemento.simbolo==el)
}

esElemSal(el:string):boolean{
  return (this.miFormulario.value.salElem.simbolo==el)
}

esEsp(n:number):boolean{
  return (this.acidoEsp==n)
}


valLength(tipo:string, n:number):boolean{
  if (tipo=='em') return this.elemento.valenciaM?.length==n
  if (tipo=='enm') return this.elemento.valenciaNM?.length==n
  if (tipo=='sm') return this.salMetal.valenciaM?.length==n
  if (tipo=='snm') return this.salNoMetal.valenciaNM?.length==n
  else return false
}

esVal(tipo:string, pos:number):boolean{
  if (tipo=='em') return (this.valM==this.elemento.valenciaM![pos])
  if (tipo=='enm') return (this.valNM==this.elemento.valenciaNM![pos])
  if (tipo=='sm') return (this.valM==this.salMetal.valenciaM![pos])
  if (tipo=='snm') return (this.valNM==this.salNoMetal.valenciaNM![pos])
  else return false
} 


}
