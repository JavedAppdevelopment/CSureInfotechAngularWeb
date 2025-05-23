import { Component, ElementRef, ViewChild} from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { APIServiceService } from './apiservice.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
}) 


export class AppComponent {
  title = 'Csureinfotech3';
  public getJsonValue:any;
  public postJsonValue:any;
  public ReviewList:any; // API Reviws Data Varible
  public PortfolioList:any; // API Portfolio Data Varible

  @ViewChild('name') nameInput!: ElementRef;
  @ViewChild('email') emailInput!: ElementRef;
  @ViewChild('subject') subjectInput!: ElementRef;
  @ViewChild('message') messageInput!: ElementRef;

  public show:boolean = false;
  submitted = false;
  name = "";
  color = "";
  email = "";
  subject = "";
  message = "";
  nameErrorMsg = "";
  emailErrorMsg = "";
  subjectErrorMsg = "";
  messageErrorMsg = "";
  body: any;
  snippet: any;
  ReadMore:boolean = true;
  visible:boolean = false;
  visiblee:boolean = false;
  
  //v1:boolean = true;
  //v2:boolean = false;

  toggle() {
    this.show = !this.show;
  }

  constructor(private http:HttpClient) 
  {
    console.log ("Reviws API Call...");

    var response = this.http.get('http://api.csureinfotech.com/api/Data/Reviews').subscribe((data) =>   // Link ne update karvani
    {
      //debugger
      console.log("Reviws API call compeleted" + data);   
     
      this.ReviewList = data; // API Reviws Data Send -> Website
      console.log(this.ReviewList ); // API Reviws Data Send -> Website
      this.show = !this.show;

      this.visible = !this.visible;

      
      console.log("https://localhost:7129/api/Data/Reviews Reviws api call completed : " + data);

    });       

    console.log("PortfolioModel API Call...");

    var var_name =this.http.get('http://api.csureinfotech.com/api/DataPortfolio/Portfolio').subscribe((data)=> // Link ne update karvani
    {

      console.log("Reviws API call compeleted" + data);  

      this.PortfolioList = data; // API Portfolio Data Send -> Website
      console.log(this.PortfolioList ); // API Portfolio Data Send -> Website

      console.log("https://localhost:7129/api/DataPortfolio/Portfolio Portfolio api call completed : " + data);

    });
    
  }

  APIFUN(){
    this.postmethod();
  }

  public postmethod()
  {
    let body = {
      title: 'foo',
      body: 'bar',
      userId: 1
    };

    this.http.post('https://jsonplaceholder.typicode.com/posts',body).subscribe((data) =>{
        console.log(data);
        this.postJsonValue = data;
      }
    );
  }

  isEmailSet(){
    this.ReadMore = !this.ReadMore; 
    this.visible = !this.visible
  }

  onClick(name: string , email: string, subject: string, message: string)
  {
    /*if(name == "" || name == null)
    {
      this.nameErrorMsg = "Please enter your name";
    }
    else
    {
      this.nameErrorMsg = " ";
    }*/
    if(email == "null" || email == "" || email == "[a-z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")
    {
      this.emailErrorMsg = "Please enter your email";
    }
    else 
    {
      this.emailErrorMsg =" "; 
      //this.emailErrorMsg = "Please enter your email";
    }
    if(subject == "" || subject == null || subject == "[A-Za-z0-9]+\!\?\:\;+$")
    {
      this.subjectErrorMsg = "Please enter your subject";
    }
    else
    {
      this.subjectErrorMsg = "";
    }

    if(message == "" || message == null)
    {
      this.messageErrorMsg = "Please enter your message";
    }
    else
    {
      this.messageErrorMsg = "";
    }

    //  API call code   //
    console.log("Call To API");
    
    if(name == "" || email == "" || subject == "" || message == "")
    {
      //console.log ("Invalid " + name);

      this.ReadMore = !this.ReadMore; 
      this.visible = !this.visible;

      //Name Validation;
      var pattern = new RegExp("^[a-zA-Z ]{1,}$");

      if(name == "")
      {
        //console.log("NotSuccessfully");
        this.nameErrorMsg = "Please enter your name";
      }
      else if(!pattern.test(name))
      {
        //console.log("Successfully Name");
        this.nameErrorMsg = "";  // Please enter proper name
      }
      else
      {
        this.nameErrorMsg = "";
      }
      
       /*//Email Validation;
      var pattern = new RegExp("([a-zA-Z0-9_.-]+)@([a-zA-Z]+)([\.])([a-zA-Z]+)");

      console.log("Value : "+ pattern);

      if(email == "")
        {
          //debugger
          // console.log("NotSuccessfully");
          this.emailErrorMsg = "Please enter your email";
          // this.emailErrorMsg.classList.remove('myClass'); 
        }
        else if(!pattern.test(email))
        {
          this.emailErrorMsg = "Please enter proper email"; 
          // console.log("Successfully Email Address");
          // this.emailErrorMsg = "Please enter proper email";
        }
        else
        {
          this.emailErrorMsg = "";
        }*/

    }
    else
    {
      console.log ("Valid Successsfully...");

      let body = { Name: name, Subject: subject, Email: email, Message: message }; // passs
    
        var response = this.http.post('http://api.csureinfotech.com/Mail/SendMail',body).subscribe((data) =>
        {
          console.log("API call compeleted" + data);      
          this.visiblee = true;
          this.postJsonValue = data;
          this.ReadMore = !this.ReadMore; 

          setTimeout(() =>
          {
            //console.log("SetTimeout Function Executed...");
            this.visiblee = false;
          },10000);     
          //console.log("setTimeout() example...");
             // ✅ Clear the form inputs manually
            this.nameInput.nativeElement.value = '';
            this.emailInput.nativeElement.value = '';
            this.subjectInput.nativeElement.value = '';
            this.messageInput.nativeElement.value = '';
          console.log("https://localhost:7129/Mail/SendMail api call completed : " + data);
    
          //this.ReadMore = !this.ReadMore; 
          //this.visible = !this.visible;
        }        
      );   
    }
  }

  // Validation NameClickEvent //
  NameClickEvent(name: string)
  {
    //console.log("name :" + name);
    //pc code start
    var pattern = new RegExp("^[a-zA-Z ]{1,}$");
    //var x = document.getElementById("name");    
    
    if(name == "")
    {
      //console.log("NotSuccessfully");
      this.nameErrorMsg = "Please enter your name";
      //x.style.borderColor = "red";
    }
    else if(!pattern.test(name))
    {
      //console.log("Successfully Name");
      this.nameErrorMsg = "Please enter proper name";  
    }
    else
    {
      this.nameErrorMsg = "";
    }
  }

  // Validation EmailClickEvent //
  EmailClickEvent(email: string)
  {
    var pattern = new RegExp("([a-zA-Z0-9_.-]+)@([a-zA-Z]+)([\.])([a-zA-Z]+){2,}");
    if(email == "")
      {
        // console.log("NotSuccessfully");
        this.emailErrorMsg = "Please enter your email";
        // this.emailErrorMsg.classList.remove('myClass'); 
      }
      else if(!pattern.test(email))
      {
        this.emailErrorMsg = "Please enter proper email"; 
        // console.log("Successfully Email Address");
        // this.emailErrorMsg = "Please enter proper email";
      }
      else
      {
        this.emailErrorMsg = "";
      }
  }

  // Validation SubjectClickEvent //
  SubjectClickEvent(subject: string)
  {
    //console.log("subject :"  + subject);

    var pattern = new RegExp("^[A-Za-z0-9\"'!?:;_\\s]+$");
    if(subject == "")
    {
      this.subjectErrorMsg= "Please enter your subject";
    }
    else if(!pattern.test(subject))
    {
      this.subjectErrorMsg = "Please enter proper subject";
    }
    else{
      this.subjectErrorMsg = "";
    }
  }

  // Validation MessageClickEvent //
  MessageClickEvent(message: string)
  {
    console.log("message :"  + message);

    //var pattern = new RegExp("^[a-zA-Z ]{1,50}$");
    var pattern = new RegExp("^[A-Za-z0-9]+\!\?\:\;+$");
    if(message == "")
    {
      this.messageErrorMsg = "Please enter your message";
    }
    else if(!pattern.test(message))
    {
      this.messageErrorMsg = ""; // Please enter your message
    }
    else{
      this.messageErrorMsg = "";
    }
  }

}
