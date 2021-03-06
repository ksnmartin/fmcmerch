import { Component, OnInit ,Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient} from '@angular/common/http';
import {LocalStorageService} from 'ngx-webstorage';
import { Subscription } from 'rxjs';
import { DomSanitizer , SafeHtml} from '@angular/platform-browser';



interface details {
	phone:number;
	address1:string;
	address2:string;
	state:string;
	district:string;
	city:string;
	pincode:number;
  rollno:number;
  year:number;
}
interface sizes{
  s:number;
  m:number;
  l:number;
  xl:number;
  xxl:number;
  xxxl:number;
}

interface orders{
  dark:sizes;
  white:sizes;
}

interface pay{
  order:orders;
  detail:details;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private subs: Subscription;
  htmls:SafeHtml;
  form:boolean= true;

	 detail:details = {	phone:null,
	address1:"",
	address2:"",
	state:"",
	district:"",
	city:"",
	pincode:null,
  rollno:null,
  year:null,
};

  user:any = this.storage.retrieve('user');
  constructor(@Inject(DOCUMENT) private document: Document,private _snackBar: MatSnackBar,private http:HttpClient,private storage:LocalStorageService
    ,private sanitizer:DomSanitizer) { }

  ngOnInit(): void {

  }

  validate(): void {
    console.log(this.detail)
  	if(this.detail.phone.toString().length != 10){
  		this.openSnackBar("enter valid number","Dance")
  	}
  	if(this.detail.pincode.toString().length != 6){
  		this.openSnackBar("enter valid pincode","Dance")
  	}
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  buy():void{
    this.http.post("https://fmcw.vercel.app/details",this.detail,{responseType: 'text',withCredentials:true}).subscribe((res:any)=>{
      this.document.write(res);
      this.form = false;
    })
  }

  notifyMerchantHandler = (eventType, data): void => {
    console.log('MERCHANT NOTIFY LOG', eventType, data);
  }
  

}
