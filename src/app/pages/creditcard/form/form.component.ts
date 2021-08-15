import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreditCard } from 'src/app/models/CreditCard';
import { objectCreditCard } from 'src/app/models/objectCreditCard';
import { User } from 'src/app/models/User';
import { CreditcardService } from 'src/app/services/creditcard.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  infoedit:any;
  flagEdit:boolean=false;
  infoCreditCard:objectCreditCard;
  objectUser:User;
  objectCreditCard:CreditCard;
  constructor(private router:Router,private fb:FormBuilder,private creditcardservice:CreditcardService) { }
  formCreditCard: FormGroup = this.fb.group({
    FirstName: ['',[Validators.required]],
    LastName: ['',[Validators.required]],
    Identification:['',[Validators.required]],
    Nickname:['',[Validators.required]],
    Password:['',[Validators.required]],
    Number:['',[Validators.required]],
    CardValidationValue:['',[Validators.required]]
  })

  ngOnInit(): void {
    var route = this.router.url.split('/');
    if(route[2]!=undefined)
    { this.flagEdit=true;
      var idCard=route[2];
      this.creditcardservice.getCreditCard(idCard).subscribe(res=>{
        this.infoedit=res;
        console.log(this.infoedit)
        this.formCreditCard.patchValue({'FirstName':this.infoedit.IDClient.FirstName});
        this.formCreditCard.patchValue({'LastName':this.infoedit.IDClient.LastName});
        this.formCreditCard.patchValue({'Identification':this.infoedit.IDClient.Identification});
        this.formCreditCard.patchValue({'Nickname':this.infoedit.IDClient.Nickname});
        this.formCreditCard.patchValue({'Password':this.infoedit.IDClient.Password});
        this.formCreditCard.patchValue({'Number':this.infoedit.Number});
        this.formCreditCard.patchValue({'CardValidationValue':this.infoedit.CardValidationValue});
      })
    }
  }
  guardar(){
    if(this.formCreditCard.invalid){
      console.log(this.formCreditCard.value.CardValidationValue)
      this.formCreditCard.markAllAsTouched();
      alert("Faltan campos por llenar");
      return;
    }
    if(!this.flagEdit){
    this.infoCreditCard = new objectCreditCard();
    this.objectUser = new User();
    this.objectCreditCard = new CreditCard();
    this.objectUser.FirstName=this.formCreditCard.value.FirstName;
    this.objectUser.LastName=this.formCreditCard.value.LastName;
    this.objectUser.Identification=this.formCreditCard.value.Identification;
    this.objectUser.Nickname=this.formCreditCard.value.Nickname;
    this.objectUser.Password=this.formCreditCard.value.Password;
    this.objectUser.IDUserType=2;
    this.objectCreditCard.CardValidationValue=this.formCreditCard.value.CardValidationValue;
    this.objectCreditCard.Number=this.formCreditCard.value.Number;
    this.infoCreditCard.CreditCard=this.objectCreditCard;
    this.infoCreditCard.User=this.objectUser;
    console.log("Salida",this.infoCreditCard);
    this.creditcardservice.saveCreditCards(this.infoCreditCard).subscribe(res=>{
      console.log(res);
      this.router.navigate(['creditcard']);
    })
    }
    else{
      var route = this.router.url.split('/');
      var idCard=route[2];
      this.infoCreditCard = new objectCreditCard();
      this.objectUser = new User();
      this.objectCreditCard = new CreditCard();
      this.objectUser.FirstName=this.formCreditCard.value.FirstName;
      this.objectUser.LastName=this.formCreditCard.value.LastName;
      this.objectUser.Identification=this.formCreditCard.value.Identification;
      this.objectUser.Nickname=this.formCreditCard.value.Nickname;
      this.objectUser.Password=this.formCreditCard.value.Password;
      this.objectUser.IDUserType=2;
      this.objectCreditCard.CardValidationValue=this.formCreditCard.value.CardValidationValue;
      this.objectCreditCard.Number=this.formCreditCard.value.Number;
      this.infoCreditCard.CreditCard=this.objectCreditCard;
      this.infoCreditCard.User=this.objectUser;
    console.log("Salida",this.infoCreditCard);
    this.creditcardservice.updateCreditCard(idCard,this.objectCreditCard).subscribe(res=>{
      console.log(res);
      this.creditcardservice.updateUser(this.infoedit.IDClient.IDUser,this.objectUser).subscribe(res=>{
        console.log(res);
        this.router.navigate(['creditcard']);
      })
    })
    }
  }
  campoEsValido(campo:string){
    return this.formCreditCard.controls[campo].errors && this.formCreditCard.controls[campo].touched;
  }
}
