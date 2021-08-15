import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreditCard } from 'src/app/models/CreditCard';
import { login } from 'src/app/models/login';
import { objectCreditCard } from 'src/app/models/objectCreditCard';
import { User } from 'src/app/models/User';
import { CreditcardService } from 'src/app/services/creditcard.service';
import { LoginService } from 'src/app/services/login.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authentication:boolean=true;
  objectLogin:login;
  constructor(private router:Router,private fb:FormBuilder,private loginservice:LoginService,private toastrService:NbToastrService) { }
  formLogin: FormGroup = this.fb.group({
    User: ['',[Validators.required]],
    Password: ['',[Validators.required]]
  })

  ngOnInit(): void {
    this.logout();
  }
  logout(){
    this.loginservice.logout().subscribe((res)=>{
      localStorage.setItem('usuario',res['Token']);
      this.router.navigate(['login']);
        console.log(res);
      },
        err=>console.error(err))
  }
  guardar(){
    if(this.formLogin.invalid){
      console.log(this.formLogin.value.CardValidationValue)
      this.formLogin.markAllAsTouched();
      alert("Faltan campos por llenar");
      return;
    }
    this.objectLogin=new login();
    this.objectLogin.Nickname=this.formLogin.value.User;
    this.objectLogin.Password=this.formLogin.value.Password;
    this.loginservice.authentication(this.objectLogin).subscribe(res=>{
      console.log(res);
      this.authentication=res['auth'];
      if(this.authentication)
      {
        localStorage.setItem('usuario',res['Token']);
          this.router.navigate(['creditcard'])
        
        
      }
      else{
        this.toastrService.show('El Usuario o la Contraseña son Incorrectos',`Acceso Denegado`,{ status:'warning' });
      }
    })
  }
  campoEsValido(campo:string){
    return this.formLogin.controls[campo].errors && this.formLogin.controls[campo].touched;
  }

}
