import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  title:string="";
  questoes:any;
  questaoSelecionada:any;
  respostas:string[]=[];
  respostaSelecionada:string="";
  questaoIndice:number=0;
  questaoMaxIndice:number=0;
  finalizado:boolean=false;

  constructor() { }

  ngOnInit(): void {
    if(quizz_questions){
      this.finalizado=false;
      this.title = quizz_questions.title;
      this.questoes=quizz_questions.questions;
      this.questaoSelecionada=this.questoes[this.questaoIndice];
      this.questaoIndice=0;
      this.questaoMaxIndice= this.questoes.length;
    }
  }

  opcaoClicada(valor:string){
    this.respostas.push(valor);
    this.proxPasso();
  }

  async proxPasso(){
    this.questaoIndice+=1;
    if(this.questaoMaxIndice>this.questaoIndice){
      this.questaoSelecionada=this.questoes[this.questaoIndice];
    }else{
      const respostaFinal:string = await this.checkarResult(this.respostas);
      this.finalizado=true;
      this.respostaSelecionada=quizz_questions.results[respostaFinal as keyof typeof quizz_questions.results];
    }
  }

  async checkarResult(respostas:string[]){

    const result = respostas.reduce((previous, current, i, arr)=>{
      if( arr.filter(item=>item===previous).length > arr.filter(item=>item===current).length ) {
        return previous;
      }else{
        return current;
      }
    })

    return result;
  }

}
