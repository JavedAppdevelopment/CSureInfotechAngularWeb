import { Component} from '@angular/core';
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

  constructor(private http:HttpClient) {}

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

    this.http.post('https://jsonplaceholder.typicode.com/posts',body).subscribe((data) =>
      {
        console.log(data);
        this.postJsonValue = data;
      }
    );
  }

  
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

  isEmailSet(){
    this.ReadMore = !this.ReadMore; 
    this.visible = !this.visible
  }

  onClick(name: string , email: string, subject: string, message: string)
  {
    if(name == "" || name == null){
      this.nameErrorMsg = "Please enter your name";
    }
    else{
      this.nameErrorMsg = " ";
    }
    if(email == "null" || email == ""){
      this.emailErrorMsg = "Please enter your email";
    }else {
      this.emailErrorMsg = "";
    }
    if(subject == "" || subject == null){
      this.subjectErrorMsg = "Please enter your subject";
    }else{
      this.subjectErrorMsg = "";
    }
    if(message == "" || message == null){
      this.messageErrorMsg = "Please enter message";
    }else{
      this.messageErrorMsg = "";
    }
    

    //  API call code   //
    console.log("Call To API");
    

    if(name == "" || email == "" || subject == "" || message == "")
    {
      console.log ("Invalid " + name);

      this.ReadMore = !this.ReadMore; 
      this.visible = !this.visible;
    }
    else
    {
      console.log ("Valid Successsfully...");

      let body = { Name: name, Subject: subject, Email: email, Message: message };// passs
    
        var response = this.http.post('https://localhost:7129/Mail/SendMail',body).subscribe((data) =>
        {
          console.log("API call compeleted" + data);      

          this.postJsonValue = data;
          this.ReadMore = !this.ReadMore; 

          setTimeout(() =>
          {
            console.log("SetTimeout Function Executed...");
            this.visible = false;
          },10000);     
          //console.log("setTimeout() example...");
          
          console.log("https://localhost:7129/Mail/SendMail api call completed : " + data);
    
          //this.ReadMore = !this.ReadMore; 
          //this.visible = !this.visible;
        }        

      );   
    }

    console.log("Method Call...");
    
  }

  // Validation NameClickEvent //
  NameClickEvent(name: string)
  {
    console.log("name :" + name);
    //pc code start
    var pattern = new RegExp("^[a-zA-Z ]{1,}$");

    if(name == "")
    {
      //console.log("NotSuccessfully");
      this.nameErrorMsg = "Please enter your name";
    }
    else if(!pattern.test(name))
    {
      //console.log("Successfully Name");
      this.nameErrorMsg = "Please enter proper name";  
    }
    else{
      this.nameErrorMsg = "";
    }
  }

  // Validation EmailClickEvent //
  EmailClickEvent(email: string)
  {
    //console.log("email :"  + email);
    //hitesh code start
    var pattern = new RegExp("^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$");

    if(email == "")
    {
      //console.log("NotSuccessfully");
      this.emailErrorMsg = "Please enter your email";
     // this.emailErrorMsg.classList.remove('myClass'); 
    }
    else if(!pattern.test(email))
    {
      //console.log("Successfully Email Address");
      this.emailErrorMsg = "Please enter proper email";
    }
    else{
      this.emailErrorMsg = "";
      
    }
  }

  // Validation SubjectClickEvent //
  SubjectClickEvent(subject: string)
  {
    //console.log("subject :"  + subject);

    //hitesh code start
    var pattern = new RegExp("^[a-zA-Z ]{1,20}$");
    if(subject == "")
    {
      this.subjectErrorMsg= "Please enter your subject";
    }
    else if(!pattern.test(subject))
    {
      this.subjectErrorMsg = "Please enter your subject";
    }
    else{
      this.subjectErrorMsg = "";
    }
  }

  // Validation MessageClickEvent //
  MessageClickEvent(message: string)
  {
    console.log("message :"  + message);

    var pattern = new RegExp("^[a-zA-Z ]{1,50}$");
    if(message == "")
    {
      this.messageErrorMsg = "Please enter your message";
    }
    else if(!pattern.test(message))
    {
      this.messageErrorMsg = "Please enter your message";
    }
    else{
      this.messageErrorMsg = "";
    }
  }

}

