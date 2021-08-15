import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Ng2SmartTableComponent } from 'ng2-smart-table';
import { CreditcardService } from 'src/app/services/creditcard.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-creditcards',
  templateUrl: './creditcards.component.html',
  styleUrls: ['./creditcards.component.scss']
})
export class CreditcardsComponent implements OnInit,AfterViewInit{

  constructor(private creditcardservice:CreditcardService,private router:Router) { }
  @ViewChild('table')
  smartTable: Ng2SmartTableComponent;
  public settings = { 
    mode: 'external',
    add:{
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {  
      Number: {  
        title: 'Número',  
        filter: true,  
      },  
      CardValidationValue: {  
        title: 'cvv',  
        filter: true,  
      },  
      IDClient: {  
        title: 'Titular',  
        filter: true,
        filterFunction(cell?: any, search?: string,): boolean {  
          console.log(cell)        
          if(cell.Name.includes(search))
          {
           return true;
         } else {
           console.log(search);
           return false;
         } 
       },
        valuePrepareFunction: (data) => {
          return data.Name;
        },  
      }  
    }, 
  };  
  
  datacreditcard:any = [];  
  ngOnInit(): void {
    this.getCardCredits();
  }
  getCardCredits(){
    this.creditcardservice.getCreditCards().subscribe(res=>{
      this.datacreditcard=res;
      this.accommodate(this.datacreditcard);
      console.log(this.datacreditcard)
    })
  }
  accommodate(array:any=[]){
    array.forEach(element => {
      var object={
        id:element.IDClient.IDUser,
        Name:element.IDClient.FirstName+" "+element.IDClient.LastName
      }
        element.IDClient=object;
    });
  }
  ngAfterViewInit(){
    this.smartTable.create.subscribe( (dataObject: any) => {
      this.router.navigate(['form']);
    });
    this.smartTable.edit.subscribe( (dataObject: any) => {
      this.router.navigate(['form/'+dataObject.data.IDCreditCard]);
    });
    this.smartTable.delete.subscribe( (dataObject: any) => {
      if (window.confirm('Esta seguro que desea eliminar el registro?')) {
        this.creditcardservice.deleteCreditCard(dataObject.data.IDCreditCard)
        .subscribe(
          res=>{
            console.log(res);
            this.creditcardservice.deleteUser(dataObject.data.IDClient.id).subscribe(res=>{
              console.log(res);
            this.getCardCredits();
            })
          },
          err=>console.error(err)
        )
      }
     
    });
  }
  logout(){
    this.router.navigate(['login']);
  }

}
